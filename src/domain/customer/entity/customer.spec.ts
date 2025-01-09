import Address from "../value-object/address";
import Customer from "./customer"

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => { 
        expect(() => {
            let customer = new Customer("", "Osvaldo");
        }).toThrow("Id is required");
    })

    it("should throw error when name is empty", () => { 
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    })

    it("should change name", () => { 
        //Arrange
        const customer = new Customer("123", "Osvaldo");

        //Act
        customer.changeName("Montenegro");

        //Assert
        expect(customer.name).toBe("Montenegro");
    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Osvaldo Montenegro");
        const address = new Address("Rua 1", 2, "011235-989", "Araraquara");
        customer.address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Osvaldo Montenegro");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    })

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Osvaldo Montenegro");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(20);
        expect(customer.rewardPoints).toBe(30);
    })

})