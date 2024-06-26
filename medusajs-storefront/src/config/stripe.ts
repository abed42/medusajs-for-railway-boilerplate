// import Stripe from 'stripe';

// if (!process.env.STRIPE_TEST_SECRET_KEY) {
//     throw new Error('STRIPE_TEST_SECRET_KEY');
// }

// const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
//     apiVersion: "2024-04-10",
// });
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY');
}
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default stripe;
