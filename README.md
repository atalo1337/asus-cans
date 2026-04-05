# ASUS CANS Cloudflare Pages 商店

一个可直接部署到 Cloudflare Pages 的静态+Functions 商店页面，包含：

- 1天 / 1周 / 1月 / 1年 四种套餐
- `ONLY Sale today` 今日促销文案
- 默认 **50% OFF** 折扣展示
- 通过 Cloudflare Pages **变量与机密** 配置价格、货币和购买链接
- 点击购买后可选择：微信 / 支付宝 / 银行卡（三种均为演示流程，不会真实扣款）

## 本地开发

```bash
npx wrangler pages dev .
```

## 变量与机密

在 `wrangler.toml` 中已提供默认变量（`[vars]`）。

可在 Cloudflare Pages 项目设置中覆盖以下变量：

- `STORE_NAME`
- `CURRENCY`
- `SALE_PERCENT`
- `PRICE_DAY`
- `PRICE_WEEK`
- `PRICE_MONTH`
- `PRICE_YEAR`
- `CHECKOUT_URL`

如果 `CHECKOUT_URL` 需要保密，建议配置为 Pages Secret：

```bash
npx wrangler pages secret put CHECKOUT_URL
```

API 路由：`/api/plans`（由 `functions/api/plans.js` 提供）会读取上述变量并返回前端展示数据。
