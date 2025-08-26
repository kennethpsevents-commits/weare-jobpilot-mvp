"use client";

type Props = { onClose(): void };

export default function Paywall({ onClose }: Props) {
  const stripeLink =
    process.env.NEXT_PUBLIC_STRIPE_LINK || "/pricing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Upgrade om kandidaten te contacteren</h2>
        <p className="mt-2 text-sm text-gray-600">
          Je gratis limiet is op. Ontgrendel onbeperkt contact, AI-rewrite en distributie.
        </p>
        <div className="mt-4 flex gap-2">
          <a
            href={stripeLink}
            className="rounded-xl border px-4 py-2 font-medium"
          >
            Upgrade
          </a>
          <button onClick={onClose} className="rounded-xl border px-4 py-2">
            Sluiten
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Tip: testmodus werkt ook met Stripe testkaarten (4242 4242 4242 4242).
        </p>
      </div>
    </div>
  );
}
