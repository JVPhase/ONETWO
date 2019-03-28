<template>
  <div class="home">
    <img alt="Crying logo" src="../assets/logo.jpg" width="320px"><br/>
    <span>Поиск </span><input type="text" placeholder="введите имя или фамилию" v-model="search" />
    <table class="table">
	    <tr>
		    <th>Имя</th>
		    <th>Фамилия</th>
		    <th>Возраст</th>
	    </tr>
	    <template v-if="filteredUsers.length != 0">
		    <tr v-for="(item, key) in filteredUsers">
			    <td>{{item.name}}</td>
			    <td>{{item.surname}}</td>
			    <td>{{item.age}}</td>
		    </tr>
	    </template>
		<template v-else>
		    <tr>
			    <td colspan="3">Пользователи не найдены по данному запросу</td>
		    </tr>
		</template>
    </table>
    <button class="logout-btn" @click="logout">Выйти</button>
  </div>
</template>

<script>
	import App from '../core/App'
	export default {
		name: 'mytable',
		data() {
			return{
				users: [],
				search: ''
			}
		},
		created(){
			this.getUsers()
		},
		methods: {
			getUsers(){
				App.Table.get()
					.then(data => {
						this.users = data
					})
			},
			logout(){
				App.User.logout()
					.then(_ => {
						this.$router.push('/auth')
					})
			}
		},
		computed: {
			filteredUsers(){
				let users = this.users
				if(this.search !== ''){
					users = users.filter(item =>{
						return item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 || item.surname.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
					})
				}
				return users
			}
		}
	}
</script>
<style>
	.table{
		width: 100%;
		border-collapse: collapse;
	}
	.table td {
		border: 1px solid darkgrey;
	}
	.table th{
		border: 1px solid grey;
		font-weight: 600;
	}
	input[type="text"]::placeholder {
	    color: black;
	}
	input[type="text"]{
		width: 268px;
	    padding: 10px;
	    margin-bottom: 10px;
    }
    .logout-btn{
	    margin-top: 20px;
	    padding: 10px;
	    border: 1px solid firebrick;
	    border-radius: 5px;
	    color: firebrick;
	    text-transform: uppercase;
	    font-weight: 600;
    }
</style>