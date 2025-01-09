import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";

describe("Product repository tests", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })
    
    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Cerveja", 15);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Cerveja",
            price: 15,
        })
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Cerveja", 15);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Cerveja",
            price: 15,
        })

        product.changeName("Breja");
        product.changePrice(20);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne( { where: { id: "1" }});
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Breja",
            price: 20,
        })
    })

    it("should find a produt", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Cerveja", 15);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});
        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        })
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Cerveja", 20);
        await productRepository.create(product1);

        const product2 = new Product("2", "Refri", 10);
        await productRepository.create(product2);

        const product3 = new Product("3", "Lanche", 30);
        await productRepository.create(product3);

        const foundProducts = await productRepository.findAll();
        const products = [product1, product2, product3];

        expect(products).toEqual(foundProducts);
    })
})