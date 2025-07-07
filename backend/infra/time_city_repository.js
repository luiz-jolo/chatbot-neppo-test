const fetch = require("node-fetch");

async function buscarPrevisaoCidade({ latitude, longitude }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const max = data?.daily?.temperature_2m_max?.[0];
    const min = data?.daily?.temperature_2m_min?.[0];

    return `Máxima de ${max}°C e mínima de ${min}°C.`;
  } catch (error) {
    console.error("Erro ao buscar previsão:", error);
    return "⚠️ Não foi possível obter a previsão do tempo.";
  }
}

module.exports = { buscarPrevisaoCidade };
