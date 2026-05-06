import React, { useState, useRef , useEffect } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
};

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };

    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("https://linushiggs.alwaysdata.net/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      let botText = "";

      if (data.type === "cars") {
        botText = data.reply
          .map(
            (c) =>
              `🚗 ${c.company} ${c.car_name}
Engine: ${c.engine}
Power: ${c.horsepower}
Speed: ${c.top_speed}
0-100: ${c.performance}
Price: ${c.price}
Fuel: ${c.fuel}
Seats: ${c.seats}
Torque: ${c.torque}`
          )
          .join("\n\n-----------------\n\n");
      } else {
        botText = data.reply;
      }

      const botMsg = {
        sender: "bot",
        text: botText,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again." },
      ]);
    }

    setMessage("");
  };
  useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [chat]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          borderRadius: "50%",
          width: 60,
          height: 60,
          background: "#0d6efd",
          color: "white",
          border: "none",
          fontSize: 25,
          cursor: "pointer",
        }}
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            left: 20,
            width: 320,
            height: 450,
            background: "#0d6efd",
            borderRadius: 10,
            boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Messages */}
         <div
  style={{
    flex: 1,
    overflowY: "auto",
    padding: 10,
    background: "#282c34",
  }}
>
  {chat.map((c, i) => (
    <div
      key={i}
      style={{
        marginBottom: 12,
        textAlign: c.sender === "user" ? "right" : "left",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "8px 10px",
          borderRadius: 10,
          background: c.sender === "user" ? "#0d6efd" : "#0c69ff",
          color: c.sender === "user" ? "white" : "black",
          whiteSpace: "pre-line",
          maxWidth: "90%",
        }}
      >
        {c.text}
      </div>
    </div>
  ))}

  {/* 👇 AUTO SCROLL TARGET (IMPORTANT) */}
  <div ref={chatEndRef} />
</div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
               onKeyDown={handleKeyPress}
              placeholder="Ask about cars..."
              style={{
                flex: 1,
                padding: 10,
                border: "none",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "0 15px",
                background: "#0d6efd",
                color: "white",
                border: "none",
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