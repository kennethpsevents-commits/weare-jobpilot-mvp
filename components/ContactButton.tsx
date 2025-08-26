"use client";

import { useState } from "react";
import { useContacts } from "@/components/hooks/useContacts";
import Paywall from "@/components/Paywall";

export default function ContactButton({ applyUrl }: { applyUrl: string }) {
  const { hasFree, contactsLeft, markContact, freeQuota } = useContacts();
  const [show, setShow] = useState(false);

  const onClick = () => {
    if (hasFree) {
      markContact();
      try {
        window.open(applyUrl, "_blank", "noopener,noreferrer");
      } catch {
        window.location.href = applyUrl;
      }
    } else {
      setShow(true);
    }
  };

  return (
    <div className="mt-3">
      <button
        onClick={onClick}
        className="w-full rounded-xl border px-4 py-2 font-medium"
      >
        {hasFree ? `Contacteer (nog ${contactsLeft}/${freeQuota} gratis)` : "Upgrade om te contacteren"}
      </button>
      {show && <Paywall onClose={() => setShow(false)} />}
    </div>
  );
}
