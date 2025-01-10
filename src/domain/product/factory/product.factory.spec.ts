import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it("should create a product type a", () => {
        const product = ProductFactory.create("a", "Suco", 10);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Suco");
        expect(product.price).toBe(10);
        expect(product.constructor.name).toBe("Product");
    })

    it("should create a product type b", () => {
        const product = ProductFactory.create("b", "Coxinha", 5);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Coxinha");
        expect(product.price).toBe(10);
        expect(product.constructor.name).toBe("ProductB");
    })

    it("should throw an error when product type is not supported", () => {
        expect(() => ProductFactory
            .create("c", "Product C", 1))
            .toThrow("Product type not supported.");
    })
})