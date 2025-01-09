import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import AddressCustomerIsChangedEvent from "../../customer/event/address-customer-is-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log2.handler";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";

describe("domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
        ).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister an event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined;
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined;
    })

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Cerveja",
            description: "Pilsen Zero",
            price: 20
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreated.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled;
    })

    it("should register a customer event handler when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
        ).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    })

    it("should register a customer event handler when address customer is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("AddressCustomerIsChangedEvent", eventHandler);
        
        expect(
            eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"].length
        ).toBe(1);
        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister a customer created event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined;
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    })

    it("should unregister an address customer changed event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("AddressCustomerIsChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("AddressCustomerIsChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"]).toBeDefined;
        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"].length).toBe(0);
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const eventHandler3 = new EnviaConsoleLogHandler();

        eventDispatcher.register("AddressCustomerIsChangedEvent", eventHandler3);

        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"][0]).toMatchObject(eventHandler3);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined;
        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"]).toBeUndefined;
    })

    it("should notify all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Haroldo Marques",
        });

        // Quando o notify for executado o EnviaConsoleLog1Handler.handle() deve ser chamado
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled;
        expect(spyEventHandler2).toHaveBeenCalled;
    })

    it("should notify all address customer changed event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressCustomerIsChangedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["AddressCustomerIsChangedEvent"][0]).toMatchObject(eventHandler);

        const addressCustomerIsChangedEvent = new AddressCustomerIsChangedEvent({
            id: "1",
            name: "Haroldo Marques",
            address: "Rua 1, 2 - 123456, Bauru."
        });

        // Quando o notify for executado o EnviaConsoleLog1Handler.handle() deve ser chamado
        eventDispatcher.notify(addressCustomerIsChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled;
    })
})