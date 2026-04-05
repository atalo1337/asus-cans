const planContainer = document.getElementById('plans');
const planTemplate = document.getElementById('planTemplate');
const storeName = document.getElementById('storeName');
const paymentDialog = document.getElementById('paymentDialog');
const paymentForm = document.getElementById('paymentForm');
const cancelPaymentButton = document.getElementById('cancelPayment');
const dialogPlan = document.getElementById('dialogPlan');
const purchaseResult = document.getElementById('purchaseResult');

let activePlanName = '';

function asCurrency(amount, currency) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function bindPurchaseButton(button, planName) {
  button.addEventListener('click', () => {
    activePlanName = planName;
    dialogPlan.textContent = `购买套餐：${planName}`;
    paymentDialog.showModal();
  });
}

async function renderPlans() {
  try {
    const response = await fetch('/api/plans');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    storeName.textContent = data.storeName;

    data.plans.forEach((plan) => {
      const node = planTemplate.content.cloneNode(true);
      node.querySelector('.plan-name').textContent = plan.label;
      node.querySelector('.price-discount').textContent = asCurrency(
        plan.discounted,
        data.currency,
      );
      node.querySelector('.price-original').textContent = asCurrency(
        plan.original,
        data.currency,
      );

      const buyButton = node.querySelector('.buy-btn');
      bindPurchaseButton(buyButton, plan.label);
      planContainer.appendChild(node);
    });
  } catch (error) {
    planContainer.innerHTML = `<p>加载失败，请稍后重试。(${error.message})</p>`;
  }
}

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const method = new FormData(paymentForm).get('payMethod');
  const message = `购买完成！你选择了${method}支付（${activePlanName}）。请联系QQ号357376256获取。`;
  purchaseResult.textContent = message;
  paymentDialog.close();
  window.alert(message);
});

cancelPaymentButton.addEventListener('click', () => {
  paymentDialog.close();
});

renderPlans();
