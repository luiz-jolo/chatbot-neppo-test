const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const Fuse = require("fuse.js");
const dotenv = require("dotenv");
const { cities } = require("./cities");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const fuse = new Fuse(cities, {
  includeScore: true,
  threshold: 0.4,
});

function extractCity(message) {
  console.log("Frase recebida:", message);
  console.log("Tipo:", typeof message);
  const input = typeof message === "string" ? message.trim() : "";
  if (!input) return null;

  const result = fuse.search(input);
  if (result.length > 0) {
    return result[0].item;
  }
  return null;
}

app.post("/api/weather", async (req, res) => {
  const message = req.body.city;
  const city = extractCity(message);

  if (!city) {
    return res.status(400).json({ error: "Cidade não reconhecida." });
  }

  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Cidade não encontrada");

    const data = await response.json();
    res.json({
      city,
      description: data.weather[0].description,
      temperature: data.main.temp,
    });
  } catch (err) {
    res.status(400).json({ error: "Erro ao buscar clima." });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
