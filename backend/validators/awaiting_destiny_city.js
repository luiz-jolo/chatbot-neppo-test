const Fuse = require("fuse.js");
const { cidadesComAeroportoCoordenadas } = require("../infra/cities_data" );

const fuse = new Fuse(cidadesComAeroportoCoordenadas, {
  keys: ["name"],
  includeScore: true,
  threshold: 0.4,
});

module.exports = async function validateDestinyCity(message, history) {
  const inputCity = message.trim();

  const result = fuse.search(inputCity);

  if (!result.length) {
    return {
      reply: "❌ Cidade não encontrada na lista de cidades com aeroporto. Tente novamente.",
      nextState: "awaiting_destiny_city",
    };
  }

  const originEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_origin_city"
  );

  const originCity = originEntry?.data.name || "N/A";
  
  if (originCity === result[0].item.name) {
    return {
      reply: "A cidade de destino não pode ser igual à cidade de origem. Informe uma cidade diferente.",
      nextState: "awaiting_destiny_city",
    };
  }

  const dateEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_date"
  );
  
  const date = dateEntry?.text || "N/A";
  const cidadeEncontrada = result[0].item;

  const resumo = `📋 *Resumo da solicitação:*\n📅 Data: ${date}\n📍 Origem: ${originCity}\n🏁 Destino: ${cidadeEncontrada.name}\n\n1 - Confirmar \n2 - Cancelar.`;

  return {
    reply: resumo,
    nextState: "awaiting_confirmation",
    metadata: cidadeEncontrada
  };
};
