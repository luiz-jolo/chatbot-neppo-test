module.exports = async function validateOtherTopic(message) {
    return {
      reply: "Mensagem recebida. Nossa equipe analisará sua solicitação.",
      nextState: "end",
    };
  };
  