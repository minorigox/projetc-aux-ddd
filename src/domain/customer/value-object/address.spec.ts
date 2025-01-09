import Address from "./address";

describe("Address unit tests", () => {
    
    it("should throw error when street is empty", () => {
        expect(() => {
            const address = new Address("", 2, "002583-603", "Hortolândia");
        }).toThrow("Street is required");
    })

    it("should throw error when number is empty", () => {
        expect(() => {
            const address = new Address("Rua 1", 0, "002586-630", "Cabo Frio");
        }).toThrow("Number is required");
    })

    it("should throw error when zip is empty", () => {
        expect(() => {
            const address= new Address("Rua 1", 2, "", "Diadema");
        }).toThrow("Zip is required");
    })

    it("should throw error when city is empty", () => {
        expect(() => {
            const address = new Address("Rua 1", 2, "002583-693", "");
        }).toThrow("City is required");
    })
})