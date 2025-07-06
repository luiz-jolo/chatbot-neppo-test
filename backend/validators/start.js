module.exports = async function validateStart(message) {
    return {
      reply: "Escolha uma opção:\n1 - Iniciar preenchimento de dados\n2 - Outro assunto",
      nextState: "awaiting_option",
    };
  };
  