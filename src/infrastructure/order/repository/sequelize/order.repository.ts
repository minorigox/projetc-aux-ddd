import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
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
    
    async update(entity: Order): Promise < void > {
        items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            productId: item.product_id,
            quantity: item.quantity,
        }),
        {
            where: {
                id: entity.id,
            }
        })
    }

    async find(id: string): Promise < Order > {
        const orderModel = await OrderModel.findOne({
            where: { id: id },
            include: ["items"]
        });
        const orderItems = orderModel.items.map((item) => {
            let orderItem = new OrderItem(
                item.id, item.name, item.price,
                item.product_id, item.quantity,
            )
            return orderItem;
        })
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
    }

    async findAll(): Promise < Order[] > {
        const ordersModel = await OrderModel.findAll({ include: ["items"] });
        const orders = ordersModel.map((order) => {
            let o = new Order(order.id, order.customer_id, 
                order.items.map((item) => {
                    let i = new OrderItem(item.id, item.name,
                        item.price, item.product_id, item.quantity);
                    return i;
                })
            )
            return o;
        })
        return orders;
    }

}