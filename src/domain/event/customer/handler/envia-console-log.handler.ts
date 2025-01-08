import EventHandlerInterface from "../../event-handler.interface";
import AddressCustomerIsChangedEvent from "../address-customer-is-changed.event";

export default class EnviaConsoleLogHandler 
    implements EventHandlerInterface < AddressCustomerIsChangedEvent > {   
    
    handle(event: AddressCustomerIsChangedEvent): void {
        console.log(`Endereço do cliente: ` + event.eventData.id 
            + ` - ` + event.eventData.name + ` alterado para: `
            + event.eventData.address);
    }
    
}