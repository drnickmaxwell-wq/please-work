const faqs = [
  {
    question: 'How durable is composite bonding?',
    answer:
      'With mindful home care and regular hygiene visits, our composite refinements maintain their finish for five to seven years before a gentle refresh.',
  },
  {
    question: 'Will the enhancement look natural?',
    answer:
      'Every layer is shade matched under studio lighting and polished to mirror your enamel so the transition is indistinguishable in photographs.',
  },
  {
    question: 'What does the appointment include?',
    answer:
      'Expect digital shade capture, minimal prep, sculpting, and glass-smooth finishing—all completed in a calm single visit.',
  },
];

export default function CompositeBondingFaqList(): JSX.Element {
  return (
    <div className="cpv-faq">
      {faqs.map((item) => (
        <article key={item.question} className="cpv-faq__item">
          <h3 className="cpv-faq__question">{item.question}</h3>
          <p className="cpv-faq__answer">{item.answer}</p>
        </article>
      ))}
    </div>
  );
}
