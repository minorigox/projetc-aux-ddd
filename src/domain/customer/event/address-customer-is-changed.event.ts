import EventInterface from "../../@shared/event/event.interface";

export default class AddressCustomerIsChangedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;
    
    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}