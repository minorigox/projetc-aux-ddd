import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([
            CustomerModel, 
            OrderModel, 
            OrderItemModel, 
            ProductModel,
        ]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Manoel de Abreu");
        const address = new Address("Rua 1", 2, "987456123", "Jandira");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Cerveja", 20);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1", 
            product.name, 
            product.price, 
            product.id, 
            5
        );

        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.product_id
                },
            ],
        });
    });
});