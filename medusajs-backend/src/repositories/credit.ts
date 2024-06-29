import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Credit } from "../models/credit";

const CreditRepository = dataSource.getRepository(Credit);

export default CreditRepository;
