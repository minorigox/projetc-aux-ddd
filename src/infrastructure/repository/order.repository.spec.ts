import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: { force: true },
            })
    
            sequelize.addModels([OrderModel]);
            await sequelize.sync();
        })
        
        afterEach(async () => {
            await sequelize.close();
        })

})