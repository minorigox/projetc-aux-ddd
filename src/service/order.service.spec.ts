import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order unit tests", () => {

    it("Should get total of all orders", () => {
        const item1 = new OrderItem("i1", "item1", 15, "produto1", 10);
        const item2 = new OrderItem("i2", "item2", 10, "produto2", 10);

        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c1", [item2]);

        const total = OrderService.total([order1, order2]);
        expect(total).toBe(250);
    })
})