<template>
	<article>
		<h2>Тесты</h2>
		<main>
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
		</main>
	</article>


</template>

<script>
export default {
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
					"Кенгуру 2022 - 1 класс": [],
					"Кенгуру 2023 - 2 класс": [],
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
							"variants": ["Писать слова", "Слушать учителя", "Читать учебник", "Ловить ебашек", "Решать задачи"],
							"answer": 3
						},
						{
							"taskId": 7,
							"type": 2,
							"description": "Гриша постоянное приходил в школу с невыученными уроками. Учитель сказал Грише, что пора взяться за... Закончите предложение.",
							"answer": ["голову", "голова"]
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
							"variants": ["Лампочка", "Зеркало", "Каранда", "Батарейка", "Рубашка"],
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
article {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

main {
	width: 100%;
	display: flex;
	flex-direction: column;
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

.variants-tests {
	cursor: pointer;
}

.active {
	box-shadow: 0 2px #282828;
}
</style>