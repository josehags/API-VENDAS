import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/appError';
import { ICustomer } from '../domain/models/ICustomer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({
        id,
        name,
        email,
    }: IUpdateCustomer): Promise<ICustomer> {
        const customer = await this.customersRepository.findById(id);

        //Verificanod se o usuário existe
        if (!customer) {
            throw new AppError('Customer not found.');
        }

        //Verifica se o email enviado não está em uso pelo usuário
        const customerExistsEmail = await this.customersRepository.findByEmail(
            email,
        );

        if (customerExistsEmail && email !== customer.email) {
            throw new AppError(
                'There is already one customer with this email.',
            );
        }

        customer.name = name;
        customer.email = email;

        await this.customersRepository.save(customer);

        return customer;
    }
}
export default UpdateCustomerService;
