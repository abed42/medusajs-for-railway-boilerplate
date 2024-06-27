import  CustomerService  from "../../../services/customer";

interface CreditTopUpRequestBody {
  userId: string;
  amount: number;
}
interface RequestBody {
  id: string; // Assuming the ID is a string. Adjust the type as necessary.
}

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {

  const customerService: CustomerService = req.scope.resolve("customerService");
  try {

  const customer = await customerService.retrieve((req.body as RequestBody).id)
    console.log(customer, "customer log here");
    res.json({
      customer
    });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed get credit." });

  }
}
export async function PUT(req: MedusaRequest<{credit: number, id: string}>, res: MedusaResponse) {
  
  const customerService: CustomerService = req.scope.resolve("customerService");
  try {

  const customer = await customerService.update({credid: req.body.credit, id :req.body.id})
    console.log(customer, "customer log here");
    res.json({
      customer
    });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to top up credit." });

  }
}
// export async function POST(req: MedusaRequest<CreditTopUpRequestBody>, res: MedusaResponse) {
//   const { userId, amount } = req.body;

//   // Validate input (not shown)

//   const customerService: CustomerService = req.scope.resolve("customerService");

//   try {
//     await customerService.updateCredit(userId, amount);

//     res.json({ success: true, message: "Credit successfully topped up." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Failed to top up credit." });
//   }
// }
