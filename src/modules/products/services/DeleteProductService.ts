//Mostra um produto especifico

import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    //pesuisando o produto

    const productsRepository = getCustomRepository(ProductRepository);
    //verificando se há um produto no banco de dados
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
      //se não tiver o produto ele dispara uma exceção de erro
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
