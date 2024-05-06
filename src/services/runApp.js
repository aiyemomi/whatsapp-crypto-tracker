const cron = require("node-cron");
const client = require("../config/wwjsConfig");
const handle_events = require("./eventHandlers");
const send_chats = require("./sendChat");

const { exec } = require("child_process");

const cron_time = process.env.CRON_TIME || "0 10 * * *";
const run_app = () => {
  cron.schedule(cron_time, async () => {
    exec("python index.py", (error) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        return;
      }
      client.initialize();
      handle_events(send_chats);
    });
  });
};
module.exports = run_app;
