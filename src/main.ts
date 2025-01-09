import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer("123", "Luis Henrique Soares");
const address = new Address("Rua Um", 2, "01187-011", "Barueri");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Cerveja", 10, "1", 1);
const item2 = new OrderItem("2", "Refri", 8, "1", 1);
const item3 = new OrderItem("3", "Lanche", 20, "1", 1);

const order = new Order("1", "123", [item1, item2, item3]);