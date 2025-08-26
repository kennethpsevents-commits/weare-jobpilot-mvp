export default function PricingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Abonnementen</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="border p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Free</h2>
          <p>Zoek vacatures gratis</p>
          <p className="mt-2 font-bold">€0</p>
        </div>
        <div className="border p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Starter</h2>
          <p>Extra functies + AI tips</p>
          <p className="mt-2 font-bold">€10 / maand</p>
        </div>
        <div className="border p-4 rounded-xl">
          <h2 className="font-semibold mb-2">Premium</h2>
          <p>Full AI buddy assistent + extra tools</p>
          <p className="mt-2 font-bold">€20 / maand</p>
        </div>
      </div>
    </main>
  );
}
