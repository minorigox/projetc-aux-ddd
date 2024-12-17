import Product from "./product";

describe("Product unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Lavadora", 100);
        }).toThrow("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrow("Name is required");
    })

    it("should throw error when price is less than 0", () => {
        expect(() => {
            const product = new Product("1", "Lavadora", 0);
        }).toThrow("Price must be greater than 0");
    })

    it("should change name", () => {
        const product = new Product("1", "Lavadora", 100);
        product.changeName("Centrifuga");
        expect(product.name).toBe("Centrifuga");
    })

    it("should change price", () => {
        const product = new Product("1", "Centrifuga", 100);
        product.changePrice(500);
        expect(product.price).toBe(500);
    })
})