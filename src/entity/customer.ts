import Address from "./address";

export default class Customer {

    _id: string;
    _name: string = "";
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    changeName(name: string) {
        this._name = name;
    }

    set address(address: Address) {
        this._address = address;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}