import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
export const runtime = 'nodejs';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
export async function POST(req: NextRequest){const sig=req.headers.get('stripe-signature');const secret=process.env.STRIPE_WEBHOOK_SECRET;if(!sig||!secret)return NextResponse.json({error:'Missing signature or secret'},{status:400});try{const raw=await req.text();const event=stripe.webhooks.constructEvent(raw,sig,secret);console.log('Stripe event',event.type);return NextResponse.json({received:true});}catch(err){console.error('Webhook error',err);return NextResponse.json({error:'Invalid webhook'},{status:400});}}
