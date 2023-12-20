import OpenAI from "openai";
const openai = new OpenAI({
	apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
// Обработчик маршрута для корневого URL
app.get("/", (req, res) => {
	res.send("Привет, это Express-сервер!");
});

// Обработчик маршрута для другого URL
app.get("/api/comment", async (req, res) => {
	console.log(req.body.post);
	const comment = await getComment(req.body.post);
	console.log(comment);
	res.json({ comment: comment });
});

// Запуск сервера на выбранном порту
app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});

async function getComment(post) {
	const stream = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		max_tokens: 100,
		messages: [
			{
				role: "user",
				content: `Тебе дан пост на Reddit: "${post}". Придумай персонализированный комментарий на английском языке, который получит положительную оценку от других пользовтателей. Комментарий должен отражать личный опыт.`,
			},
		],
		stream: true,
	});
	let result = "";
	for await (const chunk of stream) {
		result = result + chunk.choices[0]?.delta?.content || "";
	}
	return result;
}
