import Stripe from "stripe";

export function getStripeServer() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  if (!key.startsWith("sk_")) {
    throw new Error(
      "STRIPE_SECRET_KEY must start with 'sk_'. You probably used a publishable key (pk_) by mistake."
    );
  }

  // ✅ Don’t force apiVersion — avoids your old type error
  return new Stripe(key, {
    typescript: true,
  });
}