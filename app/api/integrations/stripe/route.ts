import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Payment intent schema
const paymentIntentSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  currency: z.string().default('gbp'),
  treatmentType: z.string().min(1, 'Treatment type is required'),
  patientName: z.string().min(1, 'Patient name is required'),
  patientEmail: z.string().email('Valid email is required'),
  description: z.string().optional(),
});

// Treatment pricing (in pence for GBP)
const treatmentPricing: Record<string, number> = {
  'General Consultation': 8500, // £85
  '3D Digital Dentistry': 35000, // £350
  'Porcelain Veneers': 85000, // £850 per veneer
  'Dental Implants': 250000, // £2,500 per implant
  'Teeth Whitening': 45000, // £450
  'Orthodontics': 400000, // £4,000 (full treatment)
  'Root Canal Therapy': 65000, // £650
  'Crowns & Bridges': 95000, // £950 per crown
  'Preventive Care': 12000, // £120
  'Emergency Treatment': 15000, // £150
  'Anxiety Dentistry': 20000, // £200 (additional fee)
  'Hygienist Appointment': 8500, // £85
};

// POST - Create payment intent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = paymentIntentSchema.parse(body);

    // Get treatment price or use custom amount
    const amount = treatmentPricing[validatedData.treatmentType] || validatedData.amount;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: validatedData.currency,
      metadata: {
        treatmentType: validatedData.treatmentType,
        patientName: validatedData.patientName,
        patientEmail: validatedData.patientEmail,
        practice: 'St Marys House Dental Care',
      },
      description: validatedData.description || `${validatedData.treatmentType} - ${validatedData.patientName}`,
      receipt_email: validatedData.patientEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

  } catch (error) {
    console.error('Stripe payment intent error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

// GET - Get treatment pricing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const treatmentType = searchParams.get('treatmentType');

  if (treatmentType) {
    const price = treatmentPricing[treatmentType];
    if (!price) {
      return NextResponse.json(
        { error: 'Treatment type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      treatmentType,
      price,
      currency: 'gbp',
      formattedPrice: `£${(price / 100).toFixed(2)}`,
    });
  }

  // Return all pricing
  const formattedPricing = Object.entries(treatmentPricing).map(([treatment, price]) => ({
    treatmentType: treatment,
    price,
    currency: 'gbp',
    formattedPrice: `£${(price / 100).toFixed(2)}`,
  }));

  return NextResponse.json({
    pricing: formattedPricing,
    currency: 'gbp',
  });
}

// PUT - Update payment intent
export async function PUT(request: NextRequest) {
  try {
    const { paymentIntentId, ...updateData } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, updateData);

    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

  } catch (error) {
    console.error('Stripe payment intent update error:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update payment intent' },
      { status: 500 }
    );
  }
}

// Webhook handler for Stripe events (separate endpoint would be better)
async function handleStripeWebhook(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  try {
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handleSuccessfulPayment(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handleFailedPayment(failedPayment);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

// Handle successful payment
async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    patientName: paymentIntent.metadata.patientName,
    treatmentType: paymentIntent.metadata.treatmentType,
  });

  // In a real application, you would:
  // 1. Update appointment status in database
  // 2. Send confirmation email to patient
  // 3. Notify practice management system
  // 4. Generate receipt
  // 5. Update patient records
}

// Handle failed payment
async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    patientName: paymentIntent.metadata.patientName,
    treatmentType: paymentIntent.metadata.treatmentType,
  });

  // In a real application, you would:
  // 1. Notify patient of payment failure
  // 2. Provide alternative payment options
  // 3. Update appointment status
  // 4. Send follow-up communication
}

