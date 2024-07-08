import stripe from "config/stripe";
import { getCredit } from "@lib/data/";

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
    return <p>Loading...</p>;
  }

  const session = await getSession(sessionId);
  const fetchData = async () => {
    return await getCredit();
    }
  const credit = await fetchData();
  
  if (session?.status === "open") {
    return <p>Payment did not work.</p>;
  }

  if (session?.status === "complete") {
    return (
      <div className="text-center h-100">


        <h3 className="text-4xl text-green-500 my-32">
          Payment successful!
        </h3>
        <br />

        <p className="text-3xl text-center my-20">
        You now have <span className="font-bold text-blue-400 ">{credit}</span> credits
        </p>
      </div>
    );
  }

  return null;
}
