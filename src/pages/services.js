export function getCusNames(customers) {
  return Array.from(customers, (cus) => cus?.name);
}

export function getCustomerId(customers, cusName) {
  const customer = customers.find((cus) => cus?.name === cusName);
  return customer.id !== 0 ? customer.id : 0;
}

export function getCustomerName(customers, customer_id) {
  const customer = customers.find((cus) => cus?.id === customer_id);
  return customer?.name;
}
