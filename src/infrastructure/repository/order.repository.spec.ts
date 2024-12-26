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

    it("should update an order", async () => {
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

        const orderItem2 = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            10
        );

        const order2 = new Order(order.id, order.customer_id, [orderItem2]);
        await orderRepository.update(order2);

        const orderModel = await OrderModel.findOne({
            where: { id: order2.id },
            include: ["items"],
        })

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

    it("should find an order", async () => {
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

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
        const foundOrder = await orderRepository.find(order.id);
        const foundModel = {
            customer_id: foundOrder.customer_id,
            id: foundOrder.id,
            items: foundOrder.items.map((item) => {
                let foundItem = {
                    id: item.id,
                    name: item.name,
                    order_id: order.id,
                    price: item.price,
                    product_id: item.product_id,
                    quantity: item.quantity,
                }
                return foundItem;
            }),
            total: foundOrder.total(),
        }

        expect(orderModel.toJSON()).toStrictEqual(foundModel);
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Manoel de Abreu");
        const address1 = new Address("Rua 1", 2, "987456123", "Jandira");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Cerveja", 20);
        await productRepository.create(product1);

        const orderItem1 = new OrderItem(
            "1",
            product1.name,
            product1.price,
            product1.id,
            5
        );

        const order1 = new Order("1", customer1.id, [orderItem1]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        const customer2 = new Customer("2", "Gastão Vidigal");
        const address2 = new Address("Rua 2", 1, "987456999", "Suzano");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const product2 = new Product("2", "Refri", 10);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "2",
            product1.name,
            product1.price,
            product1.id,
            10
        );

        const order2 = new Order("2", customer1.id, [orderItem2]);
        await orderRepository.create(order2);
        
        const foundOrders = await orderRepository.findAll();
        const orders = [order1, order2];
        expect(orders).toEqual(foundOrders);
    })
});