
import { NextRequest, NextResponse } from 'next/server';
import { getCustomer, getCart , createPaymentSessions, addItem} from '@lib/data';
import { cookies } from "next/headers"
import { CartWithCheckoutStep } from 'types/global';
export async function GET(req: NextRequest, res: NextResponse) {
    
    try {
        const cartId = cookies().get("_medusa_cart_id")?.value

        const cart = (await createPaymentSessions(cartId || '').then(
            (cart) => cart
          )) as CartWithCheckoutStep;
        
        return NextResponse.json({ cart:getCart(cartId || '') }, { status: 200 });
    } catch (error: any) {
      console.error('happy error',error);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const response = await fetch("https://example.org/post", {
//   method: "POST",
//   body: JSON.stringify({ username: "example" }),
//   headers: myHeaders,
// });
