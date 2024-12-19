import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository tests", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })
    
    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Bryan Gonzalez");
        const address = new Address("Rua 1", 2, "014736-987", "Petrolina");
        customer.address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" }})

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
        })
    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Bryan Gonzalez");
        const address = new Address("Rua 1", 2, "014736-987", "Petrolina");
        customer.address = address;
        await customerRepository.create(customer);

        customer.changeName("Bryan Rodriguez Gonzalez");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" }});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            city: customer.address.city,
        })
    })

    it("sould find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Bryan Gonzalez");
        const address = new Address("Rua 1", 2, "014736-987", "Petrolina");
        customer.address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);
        
        expect(customer).toStrictEqual(customerResult);
    })

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.find("2");
        }).rejects.toThrow("Customer not found");
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "José Ivaldo");
        const address1 = new Address("Rua 1", 2, "09874632", "Campinas");
        customer1.address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();

        const customer2 = new Customer("2", "Rubens Minelli");
        const address2 = new Address("Rua 8", 10, "874256987", "Piracicaba");
        customer2.address = address2;
        customer2.addRewardPoints(50);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
        
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    })
    
})