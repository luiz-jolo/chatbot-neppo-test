const Fuse = require("fuse.js");
const { cidadesComAeroportoCoordenadas } = require("../infra/cities_data" );

const fuse = new Fuse(cidadesComAeroportoCoordenadas, {
  keys: ["name"],
  includeScore: true,
  threshold: 0.4,
});

module.exports = async function validateOriginCity(message, history) {
  const input = message.trim();

  const result = fuse.search(input);

  if (!result.length) {
    return {
      reply: "❌ Cidade não encontrada na lista de cidades com aeroporto. Tente novamente.",
      nextState: "awaiting_origin_city",
    };
  }

  const cidadeEncontrada = result[0].item;
  
  return {
    reply: `✅ Cidade de origem registrada: ${cidadeEncontrada.name}. Agora, informe a cidade de destino.`,
    nextState: "awaiting_destiny_city",
    metadata: cidadeEncontrada
  };
};
