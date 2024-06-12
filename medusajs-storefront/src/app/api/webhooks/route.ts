import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (): Promise<boolean> => {
  console.log("BAAAAAMMMM 💥💥💥💥💥💥💥💥💥 fulfilling order");
  return true;
}
const handleCompletedCheckoutSession = async (event: Stripe.CheckoutSessionCompletedEvent) => {
  try {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      (event.data.object as any).id,
      {
        expand: ["line_items"],
      }
    );
    const lineItems = sessionWithLineItems.line_items;
    if (!lineItems) return false;
     
    const ordersFulfilled = await fulfillOrder();

    if (ordersFulfilled) return true;
  } catch (error) {
    console.error("error handlingCompletedCheckoutSession", error);
    return false;
  }
}


export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  let result = "Webhook called.";

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    console.log("event 💥💥💥💥", event);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const savedSession = await handleCompletedCheckoutSession(event);
      if (!savedSession)
        return NextResponse.json(
          { error: "Unable to save checkout session" },
          { status: 500 }
        );
      break;


  }
  return NextResponse.json({ received: true, status: result });
}