/**
 * Demo promo codes for instant testing without a database.
 * In production these live in the `PromoCode` table (managed from the admin
 * dashboard); `validatePromo` here is the offline fallback.
 */
export interface PromoResult {
  ok: boolean;
  code?: string;
  discount?: number; // USD cents to subtract
  message: string;
}

const DEMO_PROMOS: Record<
  string,
  { type: "PERCENT" | "FIXED"; value: number; minOrder?: number; expiresAt?: string }
> = {
  WELCOME10: { type: "PERCENT", value: 10 },
  WORLDCUP26: { type: "PERCENT", value: 15, minOrder: 10000 },
  GOAL20: { type: "FIXED", value: 2000, minOrder: 12000 },
  // "3 for 2": buy any 3 jerseys (39.90€ each), the 3rd is free. Storewide.
  "3POUR2": { type: "FIXED", value: 3990, minOrder: 11970, expiresAt: "2026-07-30" },
};

export function validatePromo(rawCode: string, subtotal: number): PromoResult {
  const code = rawCode.trim().toUpperCase();
  const promo = DEMO_PROMOS[code];
  if (!promo) return { ok: false, message: "Invalid promo code." };
  if (promo.expiresAt) {
    const endOfDay = new Date(`${promo.expiresAt}T23:59:59`).getTime();
    if (Date.now() > endOfDay) return { ok: false, message: "This code has expired." };
  }
  if (promo.minOrder && subtotal < promo.minOrder) {
    return { ok: false, message: `Requires a minimum order.` };
  }
  const discount =
    promo.type === "PERCENT" ? Math.round((subtotal * promo.value) / 100) : Math.min(promo.value, subtotal);
  return { ok: true, code, discount, message: `Code ${code} applied!` };
}
