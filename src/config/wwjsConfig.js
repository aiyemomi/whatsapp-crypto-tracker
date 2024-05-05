const { Client, RemoteAuth } = require("whatsapp-web.js");
const { MongoStore } = require("wwebjs-mongo");
const mongoose = require("mongoose");

const store = new MongoStore({ mongoose });
const client = new Client({
  authStrategy: new RemoteAuth({
    store,
    clientId: process.env.CLIENT_ID,
    backupSyncIntervalMs: 300000,
  }),
});

module.exports = client;
