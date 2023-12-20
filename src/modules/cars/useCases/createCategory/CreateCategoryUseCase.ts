/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from "tsyringe";

import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRespository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlredyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlredyExists) {
      throw new Error("Category alredy exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
