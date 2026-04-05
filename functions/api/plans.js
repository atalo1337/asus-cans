export const onRequestGet = async (context) => {
  const env = context.env;
  const saleRate = Number(env.SALE_PERCENT ?? 50);
  const discountFactor = Math.max(0, Math.min(100, saleRate)) / 100;

  const basePlans = [
    { key: 'day', label: '1天', amount: Number(env.PRICE_DAY ?? 9.9) },
    { key: 'week', label: '1周', amount: Number(env.PRICE_WEEK ?? 29.9) },
    { key: 'month', label: '1月', amount: Number(env.PRICE_MONTH ?? 89.9) },
    { key: 'year', label: '1年', amount: Number(env.PRICE_YEAR ?? 599.9) },
  ];

  const plans = basePlans.map((plan) => {
    const discounted = Number((plan.amount * (1 - discountFactor)).toFixed(2));
    return {
      key: plan.key,
      label: plan.label,
      original: Number(plan.amount.toFixed(2)),
      discounted,
      salePercent: saleRate,
    };
  });

  return Response.json({
    storeName: env.STORE_NAME ?? 'ASUS CANS 购买商店',
    saleText: 'ONLY Sale today',
    currency: env.CURRENCY ?? 'USD',
    checkoutUrl: env.CHECKOUT_URL ?? 'https://example.com/checkout',
    plans,
  });
};
