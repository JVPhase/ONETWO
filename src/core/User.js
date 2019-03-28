import Cookies from 'js-cookie'

export default new class{
	checkAuth(){
		return new Promise((res,rej)=>{
			console.log(Cookies.get('tkn'))
			if(Cookies.get('tkn')){
				res()
			}else{
				rej()
			}
		})
	}
	login(user){
		return new Promise((res,rej)=>{
			Cookies.set('tkn', `${user.email}${user.pass}`)
			res()
		})
	}
	logout(){
		return new Promise((res,rej)=>{
			Cookies.remove('tkn')
			res()
		})
	}
}