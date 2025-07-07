module.exports = async function validateStart(message) {
    return {
      reply: "Escolha uma opção (digite o número):\n\n1 - Viagem aérea ✈️\n2 - Outro assunto 📄",
      nextState: "awaiting_option",
    };
  };
  