import { TransactionBaseService } from "@medusajs/medusa";
import CustomerRepository from "../repositories/customer";
import { Customer } from "../models/customer";
import { EntityManager, IsNull, Not } from "typeorm";
// import { UpdateOnboardingStateInput } from "../types/onboarding";

type InjectedDependencies = {
  manager: EntityManager;
  customerRepository: typeof CustomerRepository;
};

class CustomerService extends TransactionBaseService {
  protected customerRepository_: typeof CustomerRepository;

  constructor({ customerRepository }: InjectedDependencies) {
    super(arguments[0]);

    this.customerRepository_ = customerRepository;
  }

  async retrieve(id : string): Promise<Customer | undefined> {
    const customerRepo = this.activeManager_.withRepository(
      this.customerRepository_
    );

    const customer = await customerRepo.findOne({
      where: { id },
    });
    console.log(customer, "customer log here");
    return customer;
  }

  async update(data: {credid: number, id : string}): Promise<Customer | null> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const customerRepository = transactionManager.withRepository(
          this.customerRepository_
        );

        const customer = await this.retrieve(data.id);

       if (!customer){
          return null
        }
        customer.credit += data.credid
        return await customerRepository.save(customer);
      }
    );
  }
}

export default CustomerService;
