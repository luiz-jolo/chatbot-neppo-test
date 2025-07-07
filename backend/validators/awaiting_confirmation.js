const { buscarPrevisaoCidade } = require("../infra/time_city_repository");

module.exports = async function validateConfirmation(message, history) {

  const destinyEntry = history.find(entry =>
    entry.sender === "user" && entry.state === "awaiting_destiny_city"
  );

  const locationData = destinyEntry?.data;
  let previsaoTexto = "";
  if (locationData?.latitude && locationData?.longitude) {
    previsaoTexto = await buscarPrevisaoCidade(locationData);
    console.log("previsao texto", previsaoTexto);
  }else{
    console.log("Previsão do tempo não acessada. ACIONAR serviço de observabilidade!")
  }
  
  let respostaSolicitacao = "Solicitação registrada com sucecsso ✅ \n\nSeu protocolo é o XPTO, vamos te responder em até 2 dias úteis. Estou te encaminhando um email 📧 com os dados completos."
  if(previsaoTexto){
    respostaSolicitacao = respostaSolicitacao += `\n\nSegue uma dica para você, 🛰️ o tempo atualmente em ${locationData.name} está assim:\n\n ${previsaoTexto}, verifica se vc levar um guarda-chuva, bermuda ou casaco 💚💜`
  }

  if (message === "1") {
    return {
      reply: respostaSolicitacao,
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
