
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from 'next/server';
import { getCustomer } from '@lib/data';

const fulfillOrder = async (): Promise<boolean> => {
    console.log("BAAAAAMMMM 💥💥💥💥💥💥💥💥💥 fulfilling order");
  
    const customer = await getCustomer();
    if (!customer) return false;

    console.log("customer from stripe 🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑🤑", customer)

    await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/credit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id: customer.id,
          credit: 100
      }),
    });
  return true;
  }
export async function POST(request: Request) {
    try {
        const { priceId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1, // Correctly placed inside the object
                },
            ],
            
            mode: 'payment',
            return_url: `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        fulfillOrder();
        return NextResponse.json({ id: session.id, client_secret: session.client_secret });
    } catch (error: any) {
      console.error('happy error',error);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
