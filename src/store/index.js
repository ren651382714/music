import { createStore } from 'vuex'


export default createStore({
  state() {
		return {
			arrs:{}
		}
		
  },
  mutations: {
		setData(state,arrs){
			state.arrs=arrs
			//这里打印下看下是否有接收到,
			console.log(state.arrs);
		}
  },
  actions: {
		
  },
  modules: {
		
  }
})
