import { connect } from "http2";
import  CreditService  from "../../../services/credit";

interface CreditTopUpRequestBody {
  customerId: string;
  credit: number;
}
interface RequestBody {
  customerId: string; 
}

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {

  const creditService: CreditService = req.scope.resolve("creditService");
  try {

  const credit = await creditService.retrieve((req.body as RequestBody).customerId)
    console.log(credit, "credit log here");
    res.json({
      credit
    });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed get credit." });

  }
}
export async function PUT(req: MedusaRequest<{credit: number, id: string}>, res: MedusaResponse) {
  
  const creditService: CreditService = req.scope.resolve("creditService");
  try {

  const credit = await creditService.update({credit: req.body.credit, id :req.body.id})
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
export async function POST(req: MedusaRequest<CreditTopUpRequestBody>, res: MedusaResponse) {
  const { customerId, credit } = req.body;

  // Validate input (not shown)

  const creditService: CreditService = req.scope.resolve("creditService");

  try {
    await creditService.create({customerId: customerId, credit: credit});

    res.json({ success: true, message: "Credit successfully topped up." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to top up credit." });
  }
}
