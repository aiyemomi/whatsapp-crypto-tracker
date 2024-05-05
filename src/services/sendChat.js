const client = require("../config/wwjsConfig");
const data = require("../../crypto_data.json");
const send_chats = async () => {
  const chats = await client.getChats();
  console.log("running cb");
  const group = chats.find((chat) => chat.name === "Testg");

  if (group) {
    try {
      for (const e of data) {
        const message = JSON.stringify(e);
        console.log(message);
        await client.sendMessage(group.id._serialized, message);
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    console.log("group not found");
  }
};
module.exports = send_chats;
