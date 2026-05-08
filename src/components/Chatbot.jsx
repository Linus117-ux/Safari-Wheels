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


  useEffect(() => {// Scroll to bottom whenever chat or typing status changes to the end of the chat window 
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, typing]);


  const fetchBotReply = async (msg) => {  // Function to send user message to the backend API and fetch the bot's reply
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
      if (data.type === "cars") {  // If the response type is 'cars', format the reply to display car details in a user-friendly way.
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
          .join("\n━━━━━━━━━━━━━━\n");// Separate multiple cars with a line for better readability
      } else {
        botText = data.reply;
      }

      setChat((prev) => [ // Add the bot's reply to the chat history
        ...prev,
        {
          sender: "bot",
          text: botText,
        },
      ]);
    } catch (error) {
      setChat((prev) => [ // In case of an error (e.g., network issues, server errors), add a generic error message to the chat to inform the user that something went wrong.
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

  
  useEffect(() => {  // Listen for a custom event 'openChatbot' that can be dispatched from anywhere in the app to automatically open the chatbot and send a message. This allows other components (like car details or booking pages) to trigger the chatbot with specific questions or information without the user having to manually open it first.
    const handleOpenChatbot = async (event) => {
      if (!event.detail || !event.detail.message) return; // Ensure the event has the expected structure before proceeding to prevent errors if the event is dispatched without the necessary data.

      const autoMessage = event.detail.message; // The message that will be sent to the chatbot when the event is triggered. This allows for dynamic messages to be sent based on the context of where the event was dispatched (e.g., a specific car page could send a message like "Tell me more about the Tesla Model S").

      setOpen(true); // Open the chatbot window when the event is received

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

    window.addEventListener( // Listen for the custom 'openChatbot' event on the window object. This allows any component in the app to dispatch this event to trigger the chatbot.
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

 
  const handleKeyPress = (e) => { // Allow sending message by pressing Enter key for better user experience, in addition to clicking the send button.
    if (e.key === "Enter") {
      sendMessage();
    }
  };

 
  const sendMessage = async () => { // Function to handle sending a message when the user clicks the send button or presses Enter. It adds the user's message to the chat history and then calls the function to fetch the bot's reply.
    if (!message.trim()) return;

    const currentMessage = message; // Store the current message in a variable to ensure we send the correct message to the backend, even if the user types something new before the async operation completes.

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
            {chat.map((c, i) => (  // Render each message in the chat history. User messages are aligned to the right and bot messages to the left, with different background colors for visual distinction. The message text is styled for readability, and the container allows for multiline messages with proper spacing.
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
            {typing && (  // Show a "Typing..." indicator when the bot is generating a reply to inform the user that a response is on the way, enhancing the interactivity and responsiveness of the chatbot experience.
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