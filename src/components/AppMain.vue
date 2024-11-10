<template>
	<article>
		<h2>Добро пожаловать на платформу онлайн образования</h2>
		<h3>Войдите в систему</h3>
		<form @submit.prevent="logInApp">
			<input v-model="inputLogin" type="text" autocomplete="current-login">
			<input v-model="inputPass" type="password" autocomplete="current-password">
			<button class="btn-login">Войти</button>
		</form>
	</article>
</template>

<script>
export default {
	data() {
		return {
			inputLogin: '',
			inputPass: '',
			users: [
				{
					id: 1,
					name: 'Алексей',
					login: 'Alex',
					pass: '1020',
					role: 1
				},
				{
					id: 2,
					name: 'Арина',
					login: 'Arina',
					pass: '1012',
					role: 0
				},
				{
					id: 3,
					name: 'Мария',
					login: 'Mariii',
					pass: '0208',
					role: 1
				},
			],
		};
	},

	computed: {
		validateUserEnterData() {
			const findUser = this.users.filter((user) => user.login === this.inputLogin);
			if (findUser.length) {
				return findUser[0].pass === this.inputPass;
			} else {
				return false;
			}
		}
	},

	methods: {
		logInApp() {
			if (this.validateUserEnterData) {
				const findedUser = this.users.filter((user) => user.login === this.inputLogin);
				this.$store.state.currentUser = findedUser[0];
				this.$router.push('/account');
			} else {
				alert(`Неверный логин или пароль`);
			}
		}
	}
};

</script>

<style scoped>
form {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	width: 70%;
}

.btn-login {
	display: flex;
	align-self: end;
}
</style>