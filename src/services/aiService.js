/**
 * Servicio para hacer llamadas a la API de IA
 */

export async function fetchAIResponse(userMessage) {
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
							role: "user",
							content:
								userMessage ||
								"¿Cuál es el sentido de la vida?",
						},
					],
				}),
			}
		);

		if (!response.ok) {
			throw new Error(`Error HTTP: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error al llamar a la API de IA:", error);
		throw error;
	}
}

/**
 * Ejemplo de uso:
 *
 * import { fetchAIResponse } from './services/aiService.js';
 *
 * const respuesta = await fetchAIResponse('¿Cuál es el sentido de la vida?');
 * console.log(respuesta);
 */
