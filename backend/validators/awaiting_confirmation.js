module.exports = async function validateConfirmation(message, history) {

  const originEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_origin_city"
  );
  const destinyEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_destiny_city"
  );
  

  if (message === "1") {
    return {
      reply: "Solicitação registrada com sucecsso ✅ \n\nSeu protocolo é o XPTO, vamos te responder em até 2 dias úteis. Estou te encaminhando um email 📧 com os dados completos.",
      nextState: "end",
    };
  } else if (message === "2") {
    return {
      reply: "Certo! volte quando quiser aqui que estarei te esperando!",
      nextState: "end",
    };
  } else {
    return {
      reply: "Opção inválida. Por favor, digite 1 ou 2.",
      nextState: "awaiting_confirmation",
    };
  }

};
