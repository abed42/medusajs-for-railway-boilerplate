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

  async retrieve(id : string): Promise<Credit | undefined> {
    const customerRepo = this.activeManager_.withRepository(
      this.creditRepository_
    );

    const credit = await customerRepo.findOne({
      where: { id },
    });
    console.log(credit, "credit log here");
    return credit;
  }

  async update(data: {credid: number, id : string}): Promise<Credit | null> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const creditRepository = transactionManager.withRepository(
          this.creditRepository_
        );

        const credit = await this.retrieve(data.id);

       if (!credit){
          return null
        }
        credit.credit += data.credid
        return await creditRepository.save(credit);
      }
    );
  }
}

export default CreditService;
