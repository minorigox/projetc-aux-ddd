import Order from "./order";
import OrderItem from "./order_item";

describe ("Order unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");
    })

    it("should throw error when customerId is empty", () => {

        expect(() => {
            let order = new Order("1", "", []);
        }).toThrow("CustomerId is required");
    })

    it("should throw error when item is empty", () => {

        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrow("Items are required");
    })

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "Cerveja", 20, "p1", 2);
        const item2 = new OrderItem("2", "Refri", 10, "p2", 2);
        const item3 = new OrderItem("3", "Lanche", 30, "p3", 2);
        let order = new Order("1", "123", [item1, item2, item3]);
        const total = order.total();
        expect(total).toBe(120);
    })

    it("should throw error if the qtd is less or equal 0", () => {
        expect(() => {
            const item1 = new OrderItem("1", "Cerveja", 20, "p1", 0);
            let order = new Order("1", "123", [item1]);
        }).toThrow("Quantity must be greater than 0");
    })
}) 