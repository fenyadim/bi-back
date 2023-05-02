const { ViberClient } = require("messaging-api-viber");
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
// const TextMessage = require("viber-bot").Message.Text;
// const ViberBot = require("viber-bot").Bot;
// const BotEvents = require("viber-bot").Events;

// const client = new ViberClient({
//   accessToken: authToken,
//   sender: {
//     name: "Sender",
//   },
// });
const authToken = "50f097bd5d67e590-6d218ac0e2d544f-60b2336ed7f33e77";

const bot = new ViberBot({
  authToken: authToken,
  name: "EchoBot",
  avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png",
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // Echo's back the message to the client. Your bot logic should sit here.
  response.send(message);
});

bot.onTextMessage(/^hi|hello$/i, (message, response) =>
  response.send(
    new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}`)
  )
);

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require("https");
const { default: axios } = require("axios");
const port = process.env.PORT || 8080;

const webhookUrl = process.env.WEBHOOK_URL;

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
    // Viber will push messages sent to this URL. Web server should be internet-facing.
    https
      .createServer(bot.middleware())
      .listen(port, () => bot.setWebhook(webhookUrl));
  },
};
