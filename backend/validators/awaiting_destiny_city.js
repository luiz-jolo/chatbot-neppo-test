module.exports = async function validateDestinyCity(message) {
    return {
      reply: `Cidade ${message} registrada. Obrigado! Em breve entraremos em contato.`,
      nextState: "end",
    };
  };
  