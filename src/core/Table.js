import axios from 'axios'

export default new class{
	get() {
		return new Promise((res,rej)=>{
			axios.get('/table.json')
				.then(data =>{
					res(JSON.parse(JSON.stringify(eval("(" + data.data + ")"))).users)
				})
				.catch(err =>{
					rej(err)
				})
		})
	}
}