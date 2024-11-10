<template>
	<div class="test-list">
		<h2>{{ title }}</h2>
		<ul>
			<li class="test-item" v-for="task in testTasks" :key="task.taskId">
				<p>{{ `${task.taskId}) ${task.description} ` }}</p>

				<ul class="test-variants" v-show="task.type === 1">
					<li class="task-item" v-for="(variant, idx) in task.variants" :key="idx">
						<input type="radio" :name='task.taskId'><label for="radio">{{ variant }}</label>
					</li>
				</ul>

				<input v-show="task.type === 2" type="text">

			</li>
		</ul>
		<button class="btn-done">Завершить</button>
	</div>
</template>

<script>
export default {
	props: ['title', 'testTasks']

};
</script>

<style scoped>
ul {
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: default;
	gap: 2rem;
}

p {
	font-size: 16px;
	font-weight: normal;
}

input[type='radio'] {
	margin: 0;
	width: max-content;
	cursor: pointer;
}

.test-item {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.test-list {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.test-variants {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1rem;
}

.task-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}

.btn-done {
	display: flex;
	align-self: end;
	margin-top: 2rem;
	transition: 0.3s;
}

.btn-done:hover {
	background-color: #14cc4f;
}
</style>