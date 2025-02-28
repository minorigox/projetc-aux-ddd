import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {

    it("should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Produto 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100
                }
            ]
        }
        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customer_id).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    })
})