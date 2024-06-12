const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// import { NextApiRequest, NextApiResponse } from 'next';

// interface CustomError extends Error {
//   statusCode?: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "POST":
//       try {
//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create({
//           ui_mode: 'embedded',
//           line_items: [
//             {
//               // Provide the exact Price ID (for example, pr_1234) of
//               // the product you want to sell
//               price: 'price_1PPArMDmACh9hmo9kjTyUJny',
//               quantity: 1,
//             },
//           ],
//           mode: 'payment',
//           return_url:
//             `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
//         });

//         res.send({clientSecret: session.client_secret});
//       } catch (err) {
//         // Assert err to CustomError to access statusCode and message properties
//         const errorMessage = (err as CustomError).message;
//         const statusCode = (err as CustomError).statusCode || 500;
//         res.status(statusCode).json(errorMessage);
//       }
//       break;
//     case "GET":
//       try {
//         const session =
//           await stripe.checkout.sessions.retrieve(req.query.session_id);

//         res.send({
//           status: session.status,
//           customer_email: session.customer_details.email
//         });
//       } catch (err) {
//         // Assert err to CustomError to access statusCode and message properties
//         const errorMessage = (err as CustomError).message;
//         const statusCode = (err as CustomError).statusCode || 500;
//         res.status(statusCode).json(errorMessage);
//       }
//       break;
//     default:
//       res.setHeader('Allow', req.method || '*');
//       res.status(405).end('Method Not Allowed');
//   }
// }
import { NextResponse } from 'next/server';
// import { stripe } from '@/utils/stripe';

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
