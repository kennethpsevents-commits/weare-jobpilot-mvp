export default function PricingPage() {
  const stripe = process.env.NEXT_PUBLIC_STRIPE_LINK || "#";
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Prijzen</h1>
      <p className="mt-2 text-gray-600">Start gratis. Betaal alleen als je meer bereik en contact wil.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Plan title="Gratis" price="€0" features={["1 vacature", "3 contacten", "Basis distributie"]} cta="/recruiters/new" />
        <Plan title="Starter" price="€99/m" features={["3 vacatures", "Onbeperkt contact", "AI-rewrite", "Distributie"]} cta={stripe} />
        <Plan title="Pro" price="€299/m" features={["10 vacatures", "AI-matching", "Analytics", "Geen succesfee"]} cta={stripe} />
      </div>

      <p className="mt-6 text-xs text-gray-400">Stel je Stripe-betaallink in via NEXT_PUBLIC_STRIPE_LINK.</p>
    </main>
  );
}

function Plan({ title, price, features, cta }: { title: string; price: string; features: string[]; cta: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-2xl">{price}</p>
      <ul className="mt-3 space-y-1 text-sm text-gray-600">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <a href={cta} className="mt-4 inline-block rounded-xl border px-4 py-2 font-medium">
        Kies {title}
      </a>
    </div>
  );
}
