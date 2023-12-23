import OpenAI from "openai";
const openai = new OpenAI({
	apiKey: process.env.API_KEY,
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
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{
				role: "user",
				content: `You are given a post on Reddit: "${post}". Come up with a personalized comment that would get the most likes. The comment should be short, no more than 3 lines. Do not use hashtags!!! Do not use smiles and emoji!!!`,
			},
		],
		model: "gpt-3.5-turbo",
		max_tokens: 200,
	});

	let result = chatCompletion.choices[0].message.content;
	console.log(result);

	return result;
}
