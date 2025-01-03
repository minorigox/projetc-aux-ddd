import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";

describe("domain events tests", () => {

    it("should register a event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
        ).toBe(1);
    })
})