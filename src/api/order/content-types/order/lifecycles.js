const axios = require("axios");

module.exports = {
  async afterCreate(event) {
    // const { data } = event.params;
    const ctx = strapi.requestContext.get();
    const data = ctx.request.body.data;
    const res = {
      phone: data.phone,
      fullName: data.name,
      address: `${data.city}, ${data.street}, ${data.house}, ${data.apartment}`,
      total: data.total,
    };
    const message = `Телефон: ${res.phone}\nФИО: ${res.fullName}\nАдрес: ${res.address}\nИтоговая сумма: ${res.total}`;
    console.log(JSON.stringify(res));
    await axios.post(
      `https://api.telegram.org/bot${env("BOT_ID")}/sendMessage`,
      { chat_id: env("CHAT_ID"), text: message }
    );
  },
};
