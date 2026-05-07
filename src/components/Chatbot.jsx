import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Safari Wheels! Ask me about cars, prices, bookings, engines, speed and more.",
    },
  ]);

  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, typing]);

  // =========================
  // SEND TO API FUNCTION
  // =========================
  const fetchBotReply = async (msg) => {
    try {
      setTyping(true);

      const res = await fetch(
        "https://linushiggs.alwaysdata.net/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: msg,
          }),
        }
      );

      const data = await res.json();

      let botText = "";

      // CAR DATA
      if (data.type === "cars") {
        botText = data.reply
          .map(
            (c) => `
🚗 ${c.company} ${c.car_name}

⚡ Engine: ${c.engine}
🏁 Power: ${c.horsepower}
🚀 Top Speed: ${c.top_speed}
⏱ 0-100: ${c.performance}
⛽ Fuel: ${c.fuel}
🪑 Seats: ${c.seats}
🔧 Torque: ${c.torque}

💰 Price: ${c.price}
`
          )
          .join("\n━━━━━━━━━━━━━━\n");
      } else {
        botText = data.reply;
      }

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botText,
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Server error. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  // =========================
  // AUTO OPEN CHATBOT EVENT
  // =========================
  useEffect(() => {
    const handleOpenChatbot = async (event) => {
      if (!event.detail || !event.detail.message) return;

      const autoMessage = event.detail.message;

      setOpen(true);

      // Add user message
      setChat((prev) => [
        ...prev,
        {
          sender: "user",
          text: autoMessage,
        },
      ]);

      // Fetch bot reply
      await fetchBotReply(autoMessage);
    };

    window.addEventListener(
      "openChatbot",
      handleOpenChatbot
    );

    return () => {
      window.removeEventListener(
        "openChatbot",
        handleOpenChatbot
      );
    };
  }, []);

  // =========================
  // ENTER KEY
  // =========================
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    // Add user message
    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    await fetchBotReply(currentMessage);
  };

  return (
    <>
      {/* CHAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 65,
          height: 65,
          borderRadius: "50%",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontSize: 28,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
          zIndex: 9999,
          transition: "0.3s",
        }}
      >
        {open ? "✖" : "🤖"}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 95,
            right: 20,
            width: 360,
            height: 520,
            background: "#111827",
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
            zIndex: 9999,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "16px",
              background:
                "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            🚗 Safari Wheels AI
          </div>

          {/* CHAT AREA */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 15,
              background: "#0f172a",
            }}
          >
            {chat.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    c.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    background:
                      c.sender === "user"
                        ? "#2563eb"
                        : "#1e293b",

                    color: "white",

                    padding: "12px 14px",

                    borderRadius: 14,

                    maxWidth: "85%",

                    whiteSpace: "pre-line",

                    fontSize: 14,

                    lineHeight: 1.5,
                  }}
                >
                  {c.text}
                </div>
              </div>
            ))}

            {/* TYPING */}
            {typing && (
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              >
                🤖 Typing...
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* INPUT AREA */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #1e293b",
              background: "#111827",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyPress}
              placeholder="Ask about cars..."
              style={{
                flex: 1,
                padding: 14,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "white",
                fontSize: 14,
              }}
            />

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              style={{
                padding: "0 18px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                opacity: !message.trim() ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;