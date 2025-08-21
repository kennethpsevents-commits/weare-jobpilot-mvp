"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const c = localStorage.getItem("cookie-consent");
    if (!c) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 inset-x-0">
      <div className="container">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-md flex gap-3 items-center justify-between">
          <p className="text-sm text-gray-600">
            We use minimal analytics (consent‑based). Read our <a href="/legal/cookies" className="link">cookie policy</a>.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { localStorage.setItem("cookie-consent", "denied"); setVisible(false); }}>Decline</Button>
            <Button variant="primary" onClick={() => { localStorage.setItem("cookie-consent", "granted"); setVisible(false); }}>Allow</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
