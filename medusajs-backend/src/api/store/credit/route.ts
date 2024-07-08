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


// export async function GET(req: MedusaRequest, res: MedusaResponse) {

//   const creditService: CreditService = req.scope.resolve("creditService");

// try {
//   const rawCustomerId = req.query.customerId;
//   if (typeof rawCustomerId === 'string') {
//     const credit = await creditService.retrieve(rawCustomerId);

//     if (!credit) {
//       try {
//         await creditService.create({customerId: rawCustomerId, credit: 0});
//         res.json({credit, success: true, message: "Credit successfully topped up." });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to create credit record." });
//       }} else {
//         res.json({credit, success: true, message: "Credit successfully retrieved." });
//       }
//     // console.log(credit, "credit log here from backend get request");
//     // res.json({
//     //   credit
//     // });
//   } else {
//     throw new Error('Invalid customer ID format');
//   }
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ success: false, message: "Failed to retrieve credit." });
// }
// }
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const creditService: CreditService = req.scope.resolve("creditService");

  try {
    const rawCustomerId = req.query.customerId;
    if (typeof rawCustomerId === 'string') {
      let credit = await creditService.retrieve(rawCustomerId);

      if (!credit) {
        try {
          // Capture the result of the create operation
          credit = await creditService.create({customerId: rawCustomerId, credit: 0});
          res.json({credit, success: true, message: "Credit successfully topped up." });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Failed to create credit record." });
          return; // Ensure the function exits after sending a response
        }
      } else {
        res.json({credit, success: true, message: "Credit successfully retrieved." });
      }
    } else {
      throw new Error('Invalid customer ID format');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve credit." });
  }
}

export async function PUT(req: MedusaRequest<{credit: number, id: string}>, res: MedusaResponse) {
  
  const creditService: CreditService = req.scope.resolve("creditService");
  try {

  const credit = await creditService.update({credit: req.body.credit, id :req.body.id, action: "add"})
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
