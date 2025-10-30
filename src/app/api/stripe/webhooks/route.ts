import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { TStripeIntentMeta } from "@/types";
import { sendMailOrderReceived } from "@/utils/mailjet";
import { patchGelatoDraftOrder } from "@/utils/gelatoHelpers";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    //   apiVersion: "2022-11-15",
    typescript: true,
});

export async function POST(request: NextRequest) {
    const body = await request.text();
    const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET_WEBHOOK_KEY as string;
    const signature = headers().get("stripe-signature");

    if (!signature) {
        console.log("No stripe-signature header found")
        return new Response("No stripe-signature header found", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`, err);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
    console.log("\n\n\n\n>>>>>>>>>>>>>>>>>> STRIPE WEBHOOK")
    console.log(JSON.stringify(event))
    console.log("<<<<<<<<<<<<<<<<<< STRIPE WEBHOOK\n\n\n\n")
    console.log("STRIPE WEBHOOK EVENT", event.type)
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent: Stripe.PaymentIntent = event.data.object as Stripe.PaymentIntent;
            // console.log("paymentIntent", paymentIntent)
            const intentMeta = paymentIntent.metadata as unknown as TStripeIntentMeta;
            console.log("intentMeta", intentMeta)

            const orderId = intentMeta.orderId;
            // TODO : UNCOMMENT NEXT LINE
            // console.log("/!\ : SKIPPED PATCHING GELATO ORDER, UNCOMMENT IN PROD")
            // if (process.env.NODE_ENV === 'production') {
            await patchGelatoDraftOrder(orderId)
            // }
            await sendMailOrderReceived(intentMeta)

            console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);

        case "checkout.session.async_payment_failed":
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            break;
        case "checkout.session.async_payment_succeeded":
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;

            break;
        case "checkout.session.completed":
            const checkoutSessionCompleted: any = event.data.object;
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return new Response("RESPONSE EXECUTE", {
        status: 200,
    });
}