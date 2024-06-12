import Cors from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const secret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_979ef028764e1b1ec8988727374b3237c66ac2c808d3f0d229f95ef14cb67dc1";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature");
    
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    
    if (event.type === "checkout.session.completed") {
    //   if (!event.data.object.customer_details.email) {
    //     throw new Error(`missing user email, ${event.id}`);
    //   }
     
    //  if (!event.data.object.metadata.itinerary_id) {
    //     throw new Error(`missing itinerary_id on metadata, ${event.id}`);
    //   }
    
    //   updateDatabase(event.data.object.metadata.itinerary_id);
    //   sendEmail(event.data.object.customer_details.email);
    console.log("completed event");
    console.log("webhook event", event);
    console.log(event.data.object);

    }
    
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}
