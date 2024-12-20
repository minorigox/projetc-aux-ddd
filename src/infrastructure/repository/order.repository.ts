import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {
    async create(entity: Order): Promise < void > {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customer_id,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.product_id,
                quantity: item.quantity,
            })),
        },
        {
            include: [{ model: OrderItemModel }]
        })
    }
    update(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

}