import  CreditService  from "../../../../services/credit";

interface CreditTopUpRequestBody {
  customerId: string;
  credit: number;
}
interface RequestBody {
  customerId: string; 
}

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function PUT(req: MedusaRequest<{credit: number, id: string}>, res: MedusaResponse) {
  
  const creditService: CreditService = req.scope.resolve("creditService");
  try {

  const credit = await creditService.update({credit: req.body.credit, id :req.body.id, action: "buy"})
    console.log(req.body.credit, "req.body log here");
    console.log(credit, "credit log here");
    res.json({
      credit
    });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to top up credit." });

  }
}