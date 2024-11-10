<template>
	<article v-if="$store.state.currentUser">
		<h2>{{ `Добро пожаловать, ${$store.state.currentUser.name}!` }}</h2>
		<main>
			<button v-if="$store.state.currentUser.role === 1">Создать тест</button>
			<button @click="goToTests">Решать тесты</button>
		</main>
	</article>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods: {
		goToTests() {
			this.$router.push('/tests');
		}
	}
};
</script>
<style scoped>
article {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

main {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
</style>