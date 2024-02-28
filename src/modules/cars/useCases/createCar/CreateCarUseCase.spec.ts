import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to creagte a new car", async () => {
    await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 100,
      brand: "Test",
      category_id: "category",
    });
  });

  it("should not be able to create a car that alredy exists", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Test Car 1",
        description: "Test Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 100,
        brand: "Test",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Test Car 2",
        description: "Test Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 100,
        brand: "Test",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to creagte a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Car",
      description: "Test Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 100,
      brand: "Test",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
