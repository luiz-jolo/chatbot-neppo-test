module.exports = async function validateOption(message) {
    if (message === "1") {
      return {
        reply: "Informe a data desejada para sua viagem (formato: DD/MM/AAAA)",
        nextState: "awaiting_date",
      };
    } else if (message === "2") {
      return {
        reply: "Certo! Por favor, descreva seu assunto e encaminharemos.",
        nextState: "awaiting_other_topic",
      };
    } else {
      return {
        reply: "Opção inválida. Por favor, digite 1 ou 2.",
        nextState: "awaiting_option",
      };
    }
  };
  