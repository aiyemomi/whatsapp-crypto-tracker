const qrcode = require("qrcode-terminal");

const client = require("../config/wwjsConfig");

const handle_events = (cb) => {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", () => {
    console.log("Authenticated!");
  });

  client.on("ready", async () => {
    cb();
    console.log("Client is ready!");
  });
};
module.exports = handle_events;
