import { useState, useRef, useEffect } from "react";
import "./AIChat.css";
import { getSystemPrompt } from "../../data/westBurgerContext.js";

export default function AIChat() {
	const [messages, setMessages] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);
	const systemPrompt = getSystemPrompt();

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!inputValue.trim() || isLoading) return;

		const userMessage = inputValue.trim();
		setInputValue("");

		// Agregar mensaje del usuario
		setMessages((prev) => [
			...prev,
			{ role: "user", content: userMessage },
		]);
		setIsLoading(true);

		try {
			const response = await fetch(
				"https://openrouter.ai/api/v1/chat/completions",
				{
					method: "POST",
					headers: {
						Authorization:
							"Bearer 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",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						model: "deepseek/deepseek-chat-v3.1:free",
						messages: [
							{
								role: "system",
								content: systemPrompt,
							},
							{
								role: "user",
								content: userMessage,
							},
						],
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}

			const data = await response.json();
			const aiMessage =
				data.choices[0]?.message?.content || "No se recibió respuesta";

			// Agregar respuesta de la IA
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: aiMessage },
			]);
		} catch (error) {
			console.error("Error al llamar a la IA:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const clearChat = () => {
		setMessages([]);
	};

	return (
		<div className="ai-chat-container">
			<div className="ai-chat-header">
				<h3>🍔 Asistente West Burger</h3>
				{messages.length > 0 && (
					<button
						onClick={clearChat}
						className="clear-btn"
						title="Limpiar chat">
						🗑️
					</button>
				)}
			</div>

			<div className="ai-chat-messages">
				{messages.length === 0 ? (
					<div className="welcome-message">
						<p>
							👋 ¡Hola! Soy el asistente virtual de West Burger 🍔
						</p>
						<p>
							¿En qué puedo ayudarte hoy? Pregúntame sobre nuestro
							menú, combos, horarios o lo que necesites.
						</p>
					</div>
				) : (
					messages.map((msg, index) => (
						<div
							key={index}
							className={`message ${
								msg.role === "user"
									? "message-user"
									: "message-assistant"
							}`}>
							<div className="message-content">{msg.content}</div>
						</div>
					))
				)}
				{isLoading && (
					<div className="message message-assistant">
						<div className="message-content loading">
							<span className="typing-indicator">
								<span></span>
								<span></span>
								<span></span>
							</span>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<form onSubmit={handleSubmit} className="ai-chat-input-form">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Pregunta sobre nuestro menú, combos, horarios..."
					disabled={isLoading}
					className="ai-chat-input"
				/>
				<button
					type="submit"
					disabled={isLoading || !inputValue.trim()}
					className="ai-chat-send-btn">
					{isLoading ? "⏳" : "📤"}
				</button>
			</form>
		</div>
	);
}
