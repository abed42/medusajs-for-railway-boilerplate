import stripe from "config/stripe";
import { getCustomer } from '@lib/data';

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session;
}
interface SearchParams {
  session_id?: string;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    console.error("Session ID is undefined.");
    // Handle the case where sessionId is undefined, e.g., return an error message or a loading indicator
    return <p>Loading...</p>; // Or any other appropriate response
  }

  const session = await getSession(sessionId);

  console.log(session);
  const fulfillOrder = async (): Promise<boolean> => {
    console.log("BAAAAAMMMM 💥💥💥💥💥💥💥💥💥 fulfilling order");
  
    const customer = await getCustomer();
    if (!customer) return false;
  
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
  if (session?.status === "open") {
    return <p>Payment did not work.</p>;
  }

  if (session?.status === "complete") {
    fulfillOrder();

    return (
      <div className="text-center h-100">


        <h3 className="text-4xl text-green-500 my-32">
          Payment successful!
        </h3>
        <br />

        <p className="text-3xl text-center my-20">
        You now have <span className="font-bold text-blue-400 ">100</span> credits
        </p>
        {/* {(session.customer as string)}. */}


      </div>
    );
  }

  return null;
}
