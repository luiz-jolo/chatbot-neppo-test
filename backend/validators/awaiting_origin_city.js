module.exports = async function validateCity(message) {
    return {
      reply: `Cidade de partida ${message} registrada. Agora informe a cidade de destino`,
      nextState: "awaiting_destiny_city",
    };
  };
  