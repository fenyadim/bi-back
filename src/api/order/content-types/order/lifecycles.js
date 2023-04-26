const TextMessage = require("viber-bot").Message.Text;
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;

const bot = new ViberBot({
  authToken: "50ef6738f327e0c9-c545d37f62e40878-53476091c2e34178",
  name: "EchoBot",
  avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png",
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // Echo's back the message to the client. Your bot logic should sit here.
  response.send(message);
});

const https = require("https");
const port = 3002;

// Viber will push messages sent to this URL. Web server should be internet-facing.

https
  .createServer(bot.middleware())
  .listen(port, () => bot.setWebhook("http://localhost:3001"));

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
    bot.onTextMessage(/^hi|hello$/i, (message, response) =>
      response.send(
        new TextMessage(
          `Hi there ${response.userProfile.name}. I am ${bot.name}`
        )
      )
    );
    console.log(res);
    // const { result } = event;
    // const res = await strapi
    //   .service("api::order.order")
    //   .findOne({ id: [result.id] });
    // console.log(res);
  },
};
