const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/message", async (req, res) => {
  const { message, state } = req.body;

  console.log("Mensagem:", message);
  console.log("Estado atual:", state);

  let response = { reply: "Não entendi. Vamos começar de novo.", nextState: "start" };

  switch (state) {
    case "start":
      response = {
        reply: "Digite o número dentre as opções abaixo 👇\n\n1 - Iniciar preenchimento de dados\n2 - Outro assunto",
        nextState: "awaiting_option",
      };
      break;

    case "awaiting_option":
      if (message === "1") {
        response = {
          reply: "Informe a data desejada para sua viagem (formato: DD/MM/AAAA)",
          nextState: "awaiting_date",
        };
      } else if (message === "2") {
        response = {
          reply: "Certo! Por favor, descreva seu assunto e encaminharemos.",
          nextState: "awaiting_other_topic",
        };
      } else {
        response = {
          reply: "Opção inválida. Por favor, digite 1 ou 2.",
          nextState: "awaiting_option",
        };
      }
      break;

    case "awaiting_date":
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (dateRegex.test(message)) {
        response = {
          reply: "Data registrada! Agora, informe a cidade de destino.",
          nextState: "awaiting_city",
        };
      } else {
        response = {
          reply: "Formato de data inválido. Use DD/MM/AAAA.",
          nextState: "awaiting_date",
        };
      }
      break;

    case "awaiting_city":
      response = {
        reply: `Cidade ${message} registrada. Obrigado! Em breve entraremos em contato.`,
        nextState: "end",
      };
      break;

    case "awaiting_other_topic":
      response = {
        reply: "Mensagem recebida. Nossa equipe analisará sua solicitação.",
        nextState: "end",
      };
      break;
  }

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
