const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from 'next/server';

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

        return NextResponse.json({ id: session.id, client_secret: session.client_secret });
    } catch (error: any) {
      console.error('happy error',error);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
