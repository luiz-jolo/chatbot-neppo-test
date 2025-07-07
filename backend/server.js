const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const validators = require("./validators");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/message", async (req, res) => {
  const { message, state, history } = req.body;

  console.log("Mensagem:", message);
  console.log("Estado atual:", state);
  console.log("Historico:", history);

  const validator = validators[state] || validators["default"];
  const result = await validator(message, history);
  
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
