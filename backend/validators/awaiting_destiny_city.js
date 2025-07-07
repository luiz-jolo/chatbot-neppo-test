module.exports = async function validateDestinyCity(message, history) {
  const inputCity = message.trim().toLowerCase();

  const originEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_origin_city"
  );
  const originCity = originEntry?.text?.trim().toLowerCase();

  if (originCity === inputCity) {
    return {
      reply: "A cidade de destino não pode ser igual à cidade de origem. Informe uma cidade diferente.",
      nextState: "awaiting_destiny_city",
    };
  }

  const dateEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_date"
  );

  const origin = originEntry?.text || "N/A";
  const destiny = message;
  const date = dateEntry?.text || "N/A";

  const resumo = `📋 *Resumo da solicitação:*\n📅 Data: ${date}\n📍 Origem: ${origin}\n🏁 Destino: ${destiny}\n\n1 - Confirmar \n2 - Cancelar.`;

  return {
    reply: resumo,
    nextState: "awaiting_confirmation",
  };
};
