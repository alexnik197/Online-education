<template>
	<main>
		<article>
			<h2>Тесты</h2>
			<div class="choose-subj">
				<div class="variants-list">
					<span class="variants-title">Предмет</span>
					<ul>
						<li @click="getTests(subj)" :class="[currentSubj === subj ? 'active' : '']" v-for="(subj, i) of subjects"
							:key="i">{{ subj }}</li>
					</ul>
				</div>
				<div v-if="subjTests" class="variants-list">
					<span class="variants-title">Тест</span>
					<ul>
						<li @click="loadTest(test)" :class="[currentTest === test ? 'active' : '']" v-for="(test, i) of subjTests"
							:key="i">{{ test }}</li>
					</ul>
				</div>
			</div>
		</article>

		<aside v-if="currentTest">
			<TheTest :title="currentTest" :testTasks="testTasks"></TheTest>
		</aside>

	</main>
</template>

<script>
import TheTest from './TheTest.vue';

export default {
	components: { TheTest },

	data() {
		return {
			subjTests: null,
			currentSubj: null,
			currentTest: null,
		};
	},

	computed: {
		loadSubjects() {
			// fetch
			/* HINTS
			type1 - Задача с вариантом ответов
			type2 - Задача с написанием слова. В ответе следует прописать массив из потенциально правильных слов (склонения итп. Писать ответы с маленькой буквы)
			*/
			const allSubjs = {
				"Математика": {
					"Кенгуру 2012 - 2 класс": [
						{
							"taskId": 1,
							"type": 1,
							"description": "Лена написала слово КЕНГУРУ два раза подряд. Сколько раз она написала букву У?",
							"variants": ["1", "2", "3", "4", "6"],
							"answer": 3
						},
						{
							"taskId": 2,
							"type": 1,
							"description": "Сегодня Арина сложила свой возраст и возраст сестры, у нее получилось 10. Какой будет сумма их возрастов через год?",
							"variants": ["5", "12", "11", "10", "20"],
							"answer": 2
						},
						{
							"taskId": 3,
							"type": 1,
							"description": "В большом ящике лежат три ящика поменьше, а в каждом из этих ящиков лежит еще по три ящика. Сколько всего ящиков?",
							"variants": ["9", "10", "12", "13", "15"],
							"answer": 3
						},
					],
					"Кенгуру 2023 - 2 класс": [
						{
							"taskId": 1,
							"type": 1,
							"description": "Мама купила воздушные шарики и разделила их поровну между Сашей и Петей. Саше достались шарики четырех разных цветов, каждого цвета по три штуки.Сколько шариков купила мама?",
							"variants": ["12", "18", "24", "36", "48"],
							"answer": 2
						},
						{
							"taskId": 2,
							"type": 1,
							"description": "Есть шаблон из пяти фигурок: ☀️🤡🐱🌙🔥. Для построения ряда картинок используют этот шаблон, не меняя порядок фигурок. Какая из пяти фигурок будет находиться на 27-м месте в этом ряду?",
							"variants": ["☀️", "🤡", "🐱", "🌙", "🔥"],
							"answer": 1
						},
						{
							"taskId": 3,
							"type": 1,
							"description": "После того, как Толя поднялся на третью ступеньку лестницы, он стал шагать через одну ступеньку. На какой ступеньке он окажется после трёх таких шагов?",
							"variants": ["5", "6", "7", "9", "11"],
							"answer": 3
						},
					],
				},

				"Русский язык": {
					"Русский медвежонок 2023 - 1 класс": [
						{
							"taskId": 1,
							"type": 1,
							"description": "Вчера был.. Каким словом нельзя закончить фразу?",
							"variants": ["Ветер", "Дождь", "Снег", "Ясно"],
							"answer": 3
						},
						{
							"taskId": 2,
							"type": 1,
							"description": "Какое имя не изменится, если вставить его на место пропуска? Я хочу дружить с …",
							"variants": ["Незнайка", "Винни-Пух", "Чебурашка", "Буратино", "Золушка"],
							"answer": 3
						},
						{
							"taskId": 3,
							"type": 1,
							"description": "Какое слово лишнее по смыслу?",
							"variants": ["Воробей", "Синица", "Птица", "Ласточка", "Голубь"],
							"answer": 2
						},
						{
							"taskId": 4,
							"type": 2,
							"description": "когда чего-то осталось мало, иногда говорят, что его осталось «с гулькин нос». А чей это нос?",
							"answer": ["голубь", "голубя", "голубиный"]
						},
						{
							"taskId": 5,
							"type": 1,
							"description": "Когда ребята ходили в детский сад, их называли Андрей, Коля, Саша, Федя, Лёша. Когда они пошли записываться в первый класс, учительница записала по алфавиту их полные имена. Чьё имя оказалось первым в алфавитном списке?",
							"variants": ["Андрея", "Лёши", "Коли", "Феди", "Саши"],
							"answer": 4
						},
						{
							"taskId": 6,
							"type": 1,
							"description": "Что обычно не нужно делать на уроке?",
							"variants": ["Писать слова", "Слушать учителя", "Читать учебник", "Считать ворон", "Решать задачи"],
							"answer": 3
						},
						{
							"taskId": 7,
							"type": 2,
							"description": "Гриша постоянное приходил в школу с невыученными уроками. Учитель сказал Грише, что пора взяться за... Закончите предложение.",
							"answer": ["голову", "голова", "ум"]
						},
						{
							"taskId": 8,
							"type": 1,
							"description": "Какую букву нельзя вставить в запись п_лить, чтобы получилось слово?",
							"variants": ["А", "О", "И", "Ы", "Е"],
							"answer": 4
						},
						{
							"taskId": 9,
							"type": 1,
							"description": "В названии насекомого стрекоза скрывается название животного – коза. В каком слове не скрывается ещё одно живое существо?",
							"variants": ["Жаворонок", "Буйвол", "Утконос", "Таракан", "Дикобраз"],
							"answer": 1
						},
						{
							"taskId": 10,
							"type": 1,
							"description": "Найдите в ответах подходящий предмет для каждого действия: разбиться, порваться, перегореть, сесть. Какой предмет оказался лишним?",
							"variants": ["Лампочка", "Зеркало", "Карандаш", "Батарейка", "Рубашка"],
							"answer": 2
						}
					]
				}
			};
			return allSubjs;
		},

		subjects() {
			let allSubjs = [];
			for (const subject in this.loadSubjects) {
				allSubjs.push(subject);
			}
			return allSubjs;
		},

		testTasks() {
			let curSubj = this.currentSubj;
			let curTest = this.currentTest;
			if (curSubj) {
				return (this.loadSubjects[curSubj])[curTest];
			}
		}
	},

	watch: {
		currentTest(value) {
			if (value !== null) {
				return this.$store.state.testMode = true;
			} else {
				return this.$store.state.testMode = false;
			}
		}
	},

	methods: {
		getTests(subj) {
			const fullSubj = this.loadSubjects[subj];
			const subjectKeys = [];
			Object.entries(fullSubj).forEach(el => {
				subjectKeys.push(el[0]);
			});
			this.currentSubj = subj;
			this.subjTests = subjectKeys;
		},
		loadTest(test) {
			this.currentTest = test;
		}
	}
};
</script>

<style scoped>
main {
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: row;
	gap: 3%;
}

article {
	display: flex;
	flex-direction: column;
	width: 40%;
	height: max-content;

	gap: 1.5rem;
}

aside {
	width: 60%;
}

ul {
	display: grid;
	justify-content: center;
	align-content: center;

	gap: 10%;
	grid-auto-flow: column;
}

li {
	place-self: center;
	cursor: pointer;
}

li:hover {
	box-shadow: 0 2px #282828;
	transition: 0.3s;
}

.choose-subj {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	font-size: 18px;
}

.variants-list {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.variants-title {
	display: flex;
	align-self: center;
	font-size: 1.3rem;
	font-size: 700;
}

.active {
	box-shadow: 0 2px #282828;
}
</style>