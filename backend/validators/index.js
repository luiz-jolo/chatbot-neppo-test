const start = require("./start");
const awaitingOption = require("./awaiting_option");
const awaitingDate = require("./awaiting_date");
const awaitingOriginCity = require("./awaiting_origin_city");
const awaitingDestinyCity = require("./awaiting_destiny_city");
const awaitingConfirmation = require("./awaiting_confirmation");
const awaitingOtherTopic = require("./awaiting_other_topic");

module.exports = {
  start,
  awaiting_option: awaitingOption,
  awaiting_date: awaitingDate,
  awaiting_origin_city: awaitingOriginCity,
  awaiting_destiny_city: awaitingDestinyCity,
  awaiting_confirmation: awaitingConfirmation,
  awaiting_other_topic: awaitingOtherTopic,
  default: async () => ({
    reply: "Deseja começar uma nova conversa?",
    nextState: "start",
  }),
};

