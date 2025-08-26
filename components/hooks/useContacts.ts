"use client";

import { useEffect, useMemo, useState } from "react";

const KEY = "jp_contacts_used";
const FREE = Number(process.env.NEXT_PUBLIC_FREE_CONTACTS ?? 3);

export function useContacts() {
  const [used, setUsed] = useState<number>(0);

  useEffect(() => {
    try {
      const n = Number(localStorage.getItem(KEY) ?? 0);
      setUsed(Number.isFinite(n) ? n : 0);
    } catch {}
  }, []);

  const contactsLeft = Math.max(0, FREE - used);
  const hasFree = contactsLeft > 0;

  const markContact = () => {
    try {
      const n = used + 1;
      localStorage.setItem(KEY, String(n));
      setUsed(n);
    } catch {}
  };

  const resetContacts = () => {
    try {
      localStorage.removeItem(KEY);
      setUsed(0);
    } catch {}
  };

  return useMemo(
    () => ({ used, contactsLeft, hasFree, markContact, resetContacts, freeQuota: FREE }),
    [used]
  );
}
