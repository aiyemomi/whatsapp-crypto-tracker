const cron = require("node-cron");
const client = require("../config/wwjsConfig");
const handle_events = require("./eventHandlers");
const send_chats = require("./sendChat");

const { exec } = require("child_process");

const cron_time = process.env.CRON_TIME || "0 10 * * *";
const run_app = () => {
  cron.schedule(cron_time, async () => {
    console.log(client);
    console.log(state);
    console.log(`cron scheduled for ${cron_time}`);
    console.log("running");
    exec("python index.py", (error) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        return;
      }
      console.log("fetched crypto data");
      client.initialize();
      handle_events(send_chats);
    });
  });
};
module.exports = run_app;
