module.exports = {
  async afterCreate(event) {
    // const { data } = event.params;
    const ctx = strapi.requestContext.get();
    const data = ctx.request.body.data;
    const res = {
      Телефон: data.phone,
      ФИО: data.name,
      Адрес: `${data.city}, ${data.street}, ${data.house}, ${data.apartment}`,
      "Итоговая сумма": data.total,
    };
  },
};
