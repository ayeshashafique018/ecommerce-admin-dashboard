import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Spinner, Card, InputGroup } from "react-bootstrap";
import OpenAI from "openai";

const AI = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // OpenAI config (browser testing only)
  const openai = new OpenAI({
    apiKey: "YOUR_OPENAI_API_KEY_HERE", // ⚠️ Only for dev/testing
    dangerouslyAllowBrowser: true,
  });

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: query }],
        temperature: 0.7,
      });

      const answer = response.choices[0].message.content;
      setMessages([...messages, { question: query, answer }]);
      setQuery("");
    } catch (err) {
      console.error(err);
      setMessages([...messages, { question: query, answer: "AI service error." }]);
    }

    setLoading(false);
  };

  return (
    <div
      className="d-flex flex-column align-items-center p-3"
      style={{ minHeight: "100vh", backgroundColor: "#141414", color: "#EBBE4D" }}
    >
      <h1 className="mb-4 text-center" style={{ fontWeight: "700" }}>
        💎 AI Jewelry Assistant
      </h1>

      {/* Input Form */}
      <InputGroup className="mb-4 w-100" style={{ maxWidth: "600px" }}>
        <Form.Control
          placeholder="Ask me about jewelry trends, products, or insights..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ backgroundColor: "#222", color: "#EBBE4D", border: "1px solid #EBBE4D" }}
        />
        <Button
          onClick={handleQuery}
          disabled={loading}
          style={{ backgroundColor: "#EBBE4D", color: "#222", border: "none" }}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Ask AI"}
        </Button>
      </InputGroup>

      {/* Messages */}
      <div
        className="w-100"
        style={{
          maxWidth: "700px",
          flex: 1,
          overflowY: "auto",
          width: "100%",
          paddingBottom: "20px",
        }}
      >
        {messages.map((msg, idx) => (
          <Card
            key={idx}
            className="mb-3"
            style={{
              backgroundColor: idx % 2 === 0 ? "#222" : "#3b3b3b",
              borderLeft: "5px solid #EBBE4D",
            }}
          >
            <Card.Body>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong style={{ color: "#FFD700" }}>Q:</strong> {msg.question}
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#FFD700" }}>A:</strong> {msg.answer}
              </p>
            </Card.Body>
          </Card>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Optional: Clear Chat Button */}
      {messages.length > 0 && (
        <Button
          onClick={() => setMessages([])}
          style={{
            backgroundColor: "#222",
            color: "#EBBE4D",
            border: "1px solid #EBBE4D",
            marginTop: "10px",
          }}
        >
          Clear Chat
        </Button>
      )}
    </div>
  );
};

export default AI;
