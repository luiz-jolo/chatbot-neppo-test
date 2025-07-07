module.exports = async function validateDate(message) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (dateRegex.test(message)) {
      return {
        reply: "Data registrada! 🏙️ Agora, informe a cidade de origem (partida)",
        nextState: "awaiting_origin_city",
      };
    } else {
      return {
        reply: "Formato de data inválido. Use DD/MM/AAAA.",
        nextState: "awaiting_date",
      };
    }
  };
  