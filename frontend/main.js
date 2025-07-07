document.addEventListener("DOMContentLoaded", () => {
  let state = "start";
  let conversationHistory = [];

  botSay("Olá! aqui é a Nepi 😁 estou aqui para te ajudar com a sua solicitação de viagem corporativa!");
  handleMessage("");

  document.getElementById("chat-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("user-input");
    const userMessage = input.value.trim();
    if (!userMessage) return;

    addMessage("user", userMessage);
    handleMessage(userMessage);
    input.value = "";
  });

  function addMessage(sender, text) {
    const log = document.getElementById("chat-log");
    const msg = document.createElement("div");
    msg.className = sender;
    msg.textContent = text;
    msg.innerHTML = text.replace(/\n/g, "<br>");
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;

    if (sender === "user") {
      conversationHistory.push({ sender, text, state });
    } else {
      conversationHistory.push({ sender, text });
    }
  }

  function botSay(text) {
    addMessage("bot", text);
  }

  async function handleMessage(userMessage) {
    try {
      const res = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          state,
          history: conversationHistory,
        }),
      });
  
      if (!res.ok) throw new Error("Erro na resposta do servidor");
  
      const data = await res.json();
      botSay(data.reply);
  
      state = data.nextState;
      console.log("Estado atualizado para:", state);
    } catch (err) {
      botSay("Erro ao se comunicar com o servidor.");
      console.error(err);
    }
  }
});
