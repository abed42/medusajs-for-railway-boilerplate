import { TransactionBaseService } from "@medusajs/medusa";
import CreditRepository from "../repositories/credit";
import { Credit } from "../models/credit";
import { EntityManager, IsNull, Not } from "typeorm";
// import { UpdateOnboardingStateInput } from "../types/onboarding";

type InjectedDependencies = {
  manager: EntityManager;
  creditRepository: typeof CreditRepository;
};

class CreditService extends TransactionBaseService {
  protected creditRepository_: typeof CreditRepository;

  constructor({ creditRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.creditRepository_ = creditRepository;
  }

  async retrieve(customerId : string): Promise<Credit | undefined> {
    const creditRepo = this.activeManager_.withRepository(
      this.creditRepository_
    );

    const credit = await creditRepo.findOne({
      where: { customerId },
    });
    console.log(credit, "credit log here");
    return credit;
  }

  async update(data: {credit: number, id : string}): Promise<Credit | null> {
    console.log(data)
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const creditRepository = transactionManager.withRepository(
          this.creditRepository_
        );

        const credit = await this.retrieve(data.id);

       if (!credit){
        console.log("credit not found")
          return null
        }
        credit.credit += data.credit
        return await creditRepository.save(credit);
      }
    );
  }

  async create(data: {credit: number, customerId : string}): Promise<Credit | null> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const creditRepository = transactionManager.withRepository(
          this.creditRepository_
        );
        // add credit and customer id to credit table
        const credit = await creditRepository.save(data);
        return credit;
      } 
    );
  }
}

export default CreditService;
