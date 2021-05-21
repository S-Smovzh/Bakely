export function buildSupportedPaymentMethodData() {
  return [ {
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['visa', 'mastercard'],
      supportedTypes: ['debit', 'credit']
    }
  } ];
}

export function buildShoppingCartDetails(items, total) {
  return {
    id: 'test-order',
    displayItems: [
      items.map((item) => {
        return {
          label: item.name,
          amount: { currency: 'USD', value: item.price * (100 - item.discount) / 100 }
        };
      })
    ],
    total: {
      label: 'Total (Close it, it is an example | Это пример, отклоните выполнение):',
      amount: { currency: 'USD', value: total }
    }
  };
}
