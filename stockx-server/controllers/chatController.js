const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "YOUR_API_KEY" 
});

const askChatbot = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const systemPrompt = {
      role: "system",
      content: "You are the 'StockX AI Assistant', an expert in finance, the stock market, investing, and the StockX application. Introduce yourself if asked. Answer queries related to finance, trading, and stocks clearly and concisely. If a user asks about topics completely unrelated to finance, trading, or this app, politely decline and steer the conversation back to stocks and investing. Keep your answers brief, informative, and formatted cleanly."
    };

    const messages = [
      systemPrompt,
      ...(history || []),
      { role: "user", content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant", 
      temperature: 0.5,
      max_tokens: 1024,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ message: "Failed to fetch response from AI", error: error.message });
  }
};

module.exports = {
  askChatbot
};
