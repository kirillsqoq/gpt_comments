import OpenAI from "openai";
const openai = new OpenAI({
	apiKey: "zq7Mj0rYJCUKUICgXK5UT3BlbkFJx0IfoJf7lDYvpv4RFEFM",
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
				content: `Тебе дан пост на Reddit: "${post}". Придумай персонализированный комментарий на английском языке, который получит положительную оценку от других пользовтателей. Комментарий должен отражать личный опыт. Комментарий должен быть содержательным и коротким. Длинна комментария не более 4 строк.`,
			},
		],
		model: "gpt-3.5-turbo",
		max_tokens: 200,
	});

	let result = chatCompletion.choices[0].message.content;
	console.log(result);

	return result;
}
