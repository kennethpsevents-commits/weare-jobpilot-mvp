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
