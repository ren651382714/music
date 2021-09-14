<template>
  <div class="home">
   
		<p>{{arrs}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState} from "vuex";

export default {
  name: 'Home',
  components: {
   
  },
	setup(){
		let arrs =  JSON.parse(localStorage.getItem('myInfo'))
		return{
			arrs
		}
	}
	
}
</script>
