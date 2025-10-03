/**
 * Contexto y datos de West Burger para la IA
 * Modifica este archivo con la información real de tu negocio
 */

export const westBurgerContext = {
	nombre: "West Burger",
	descripcion:
		"Hamburguesería artesanal en Montevideo, Uruguay. Especialistas en smash burgers con ingredientes frescos y de calidad premium.",

	hamburguesas: [
		{
			nombre: "The Classic West",
			descripcion:
				"Nuestra hamburguesa insignia con doble smash de carne 100% vacuna, queso cheddar, lechuga, tomate, cebolla caramelizada y salsa West especial",
			precio: "$450",
			ingredientes: [
				"doble carne smash",
				"queso cheddar",
				"lechuga",
				"tomate",
				"cebolla caramelizada",
				"salsa West especial",
				"pan brioche",
			],
		},
		{
			nombre: "BBQ Bacon Burger",
			descripcion:
				"Smash burger con bacon crocante, queso ahumado, aros de cebolla, salsa BBQ casera y jalapeños",
			precio: "$520",
			ingredientes: [
				"carne smash",
				"bacon",
				"queso ahumado",
				"aros de cebolla",
				"salsa BBQ",
				"jalapeños",
				"pan brioche",
			],
		},
		{
			nombre: "Mushroom Swiss",
			descripcion:
				"Carne smash con champiñones salteados, queso suizo, rúcula y mayonesa de trufa",
			precio: "$480",
			ingredientes: [
				"carne smash",
				"champiñones",
				"queso suizo",
				"rúcula",
				"mayonesa de trufa",
				"pan brioche",
			],
		},
		{
			nombre: "Spicy West",
			descripcion:
				"Para los amantes del picante: doble smash, queso pepper jack, jalapeños, cebolla morada, salsa chipotle y hot sauce",
			precio: "$490",
			ingredientes: [
				"doble carne smash",
				"queso pepper jack",
				"jalapeños",
				"cebolla morada",
				"salsa chipotle",
				"hot sauce",
				"pan brioche",
			],
		},
		{
			nombre: "Veggie Deluxe",
			descripcion:
				"Hamburguesa vegetariana de garbanzos y quinoa, con queso, lechuga, tomate, aguacate y salsa verde",
			precio: "$420",
			ingredientes: [
				"medallón veggie de garbanzo y quinoa",
				"queso",
				"lechuga",
				"tomate",
				"aguacate",
				"salsa verde",
				"pan integral",
			],
		},
	],

	combos: [
		{
			nombre: "Combo West Classic",
			incluye: "Hamburguesa a elección + Papas fritas + Bebida",
			precio: "$650",
			descripcion: "El combo perfecto para disfrutar tu burger favorita",
		},
		{
			nombre: "Combo Doble",
			incluye: "2 Hamburguesas a elección + Papas grandes + 2 Bebidas",
			precio: "$1200",
			descripcion: "Ideal para compartir o para los más hambrientos",
		},
		{
			nombre: "Combo Premium",
			incluye:
				"Hamburguesa premium + Papas con cheddar y bacon + Bebida + Postre",
			precio: "$850",
			descripcion: "La experiencia completa West Burger",
		},
	],

	acompañamientos: [
		{
			nombre: "Papas Fritas Clásicas",
			descripcion:
				"Papas cortadas a mano, crujientes por fuera y suaves por dentro",
			precio: "$180",
		},
		{
			nombre: "Papas con Cheddar & Bacon",
			descripcion:
				"Papas fritas cubiertas con queso cheddar fundido y bacon crocante",
			precio: "$280",
		},
		{
			nombre: "Aros de Cebolla",
			descripcion: "Aros de cebolla rebozados y fritos, extra crujientes",
			precio: "$220",
		},
		{
			nombre: "Nuggets de Pollo",
			descripcion: "6 unidades de nuggets caseros con salsa a elección",
			precio: "$250",
		},
	],

	bebidas: [
		{
			tipo: "Refrescos",
			opciones: [
				"Coca-Cola",
				"Coca-Cola Zero",
				"Sprite",
				"Fanta",
				"Agua",
			],
			precio: "$120",
		},
		{
			tipo: "Cervezas Artesanales",
			opciones: ["IPA", "Rubia", "Roja", "Porter"],
			precio: "$200",
		},
		{
			tipo: "Batidos",
			opciones: ["Chocolate", "Vainilla", "Frutilla", "Oreo"],
			precio: "$250",
		},
	],

	horarios: {
		lunesAJueves: "12:00 - 23:00",
		viernesYSabado: "12:00 - 01:00",
		domingo: "12:00 - 23:00",
	},

	ubicacion: {
		direccion: "Av. 18 de Julio 1234, Montevideo, Uruguay",
		barrio: "Centro",
		telefono: "+598 99 123 456",
		delivery: true,
		takeaway: true,
	},

	metodosPago: [
		"Efectivo",
		"Tarjeta de débito",
		"Tarjeta de crédito",
		"Mercado Pago",
		"transferencia bancaria",
	],

	politicas: {
		delivery:
			"Envíos gratis en pedidos superiores a $800. Tiempo estimado: 30-45 minutos",
		reservas:
			"Aceptamos reservas para grupos grandes llamando con anticipación",
		alergenos:
			"Todos nuestros productos pueden contener trazas de gluten, lactosa y frutos secos. Consulta por opciones sin TACC",
	},
};

/**
 * Genera el prompt del sistema con el contexto de West Burger
 */
export function getSystemPrompt() {
	return `Eres un asistente virtual amigable y servicial de West Burger, una hamburguesería artesanal en Montevideo, Uruguay. 

Tu trabajo es ayudar a los clientes con información sobre:
- Nuestro menú de hamburguesas y sus ingredientes
- Combos y promociones
- Acompañamientos y bebidas
- Precios
- Horarios de atención
- Ubicación y métodos de entrega
- Métodos de pago

INFORMACIÓN DEL NEGOCIO:

📍 Ubicación: ${westBurgerContext.ubicacion.direccion}
📞 Teléfono: ${westBurgerContext.ubicacion.telefono}
🕐 Horarios: 
  - Lunes a Jueves: ${westBurgerContext.horarios.lunesAJueves}
  - Viernes y Sábado: ${westBurgerContext.horarios.viernesYSabado}
  - Domingo: ${westBurgerContext.horarios.domingo}

🍔 MENÚ DE HAMBURGUESAS:
${westBurgerContext.hamburguesas
	.map(
		(burger) =>
			`- ${burger.nombre} (${burger.precio}): ${burger.descripcion}`
	)
	.join("\n")}

🎁 COMBOS:
${westBurgerContext.combos
	.map((combo) => `- ${combo.nombre} (${combo.precio}): ${combo.incluye}`)
	.join("\n")}

🍟 ACOMPAÑAMIENTOS:
${westBurgerContext.acompañamientos
	.map((side) => `- ${side.nombre} (${side.precio}): ${side.descripcion}`)
	.join("\n")}

🥤 BEBIDAS:
${westBurgerContext.bebidas
	.map(
		(drink) =>
			`- ${drink.tipo} (${drink.precio}): ${drink.opciones.join(", ")}`
	)
	.join("\n")}

💳 Métodos de pago: ${westBurgerContext.metodosPago.join(", ")}
🚚 Delivery: ${westBurgerContext.politicas.delivery}

INSTRUCCIONES:
- Sé amigable, profesional y entusiasta sobre nuestras hamburguesas
- Si te preguntan sobre algo que no está en el menú, sugiere alternativas similares
- Si no tienes la información exacta, indica que pueden llamar al restaurante
- Promociona nuestras especialidades y combos cuando sea apropiado
- Usa emojis ocasionalmente para ser más cercano (🍔🍟🥤)
- Responde en español de Uruguay
- Si te preguntan algo que no está relacionado con West Burger, redirige amablemente la conversación al menú

¡Tu objetivo es hacer que los clientes tengan ganas de probar nuestras deliciosas hamburguesas!`;
}
