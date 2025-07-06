document.addEventListener("DOMContentLoaded", () => {
    let state = "start";

    botSay("Olá! aqui é a Nepi 😁 estou aqui para te ajudar com a sua solicitação de viagem corporativa!");
  
    document.getElementById("chat-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const input = document.getElementById("user-input");
      const message = input.value.trim();
      if (!message) return;
  
      addMessage("user", message);
      handleMessage(message);
      input.value = "";
    });
  
    function addMessage(sender, text) {
      const log = document.getElementById("chat-log");
      const msg = document.createElement("div");
      msg.className = sender;
      msg.textContent = text;
      log.appendChild(msg);
      log.scrollTop = log.scrollHeight;
    }
  
    function botSay(text) {
      addMessage("bot", text);
    }
  
    function handleMessage(input) {
      switch (state) {
        case "start":
          botSay("Olá! Qual cidade você deseja saber o clima?");
          state = "awaiting_city";
          break;
        case "awaiting_city":
          fetchWeather(input);
          break;
        default:
          botSay("Não entendi, vamos começar de novo.");
          state = "start";
          break;
      }
    }
  
    async function fetchWeather(city) {
      try {
        const res = await fetch("http://localhost:3000/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });
  
        if (!res.ok) throw new Error("Cidade não encontrada");
        const data = await res.json();
  
        botSay(`O tempo em ${data.city} está ${data.description} com temperatura de ${data.temperature}°C.`);
        botSay("Deseja consultar outra cidade?");
        state = "awaiting_city";
      } catch (err) {
        botSay("Ops! Não consegui encontrar essa cidade. Tente novamente.");
      }
    }
  });
  