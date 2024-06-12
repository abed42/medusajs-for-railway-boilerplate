import stripe from "config/stripe";

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session;
}
interface SearchParams {
  session_id?: string;
}

export default async function CheckoutReturn({  searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    console.error("Session ID is undefined.");
    // Handle the case where sessionId is undefined, e.g., return an error message or a loading indicator
    return <p>Loading...</p>; // Or any other appropriate response
  }

  const session = await getSession(sessionId);

  console.log(session);

  if (session?.status === "open") {
    return <p>Payment did not work.</p>;
  }

  if (session?.status === "complete") {
    return (
      <h3>
        We appreciate doing business with you, Your Stripe customer ID is:
        {(session.customer as string)}.
      </h3>
    );
  }

  return null;
}
