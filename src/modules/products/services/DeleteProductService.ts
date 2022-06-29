import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/appError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import redisCachae from '@shared/cache/RedisCache';

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}
    public async execute({ id }: IDeleteProduct): Promise<void> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await redisCachae.invalidate('api-vendas-PRODUCT_LIST');

        await this.productsRepository.remove(product);
    }
}

export default DeleteProductService;
