import Stripe from "stripe";

export const stripeInstance = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    typescript: true,
    //   apiVersion: "2022-11-15",
});