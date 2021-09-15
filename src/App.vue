<template>
	<Head/>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
		<router-link to="/sign">Sign</router-link>
  </div>
  <router-view/>
</template>
<script >
	import Head from './views/head.vue';
	export default {
		name:'App',
		components: {
			Head
		}
	} 
	
</script>
<style>
*{
	margin: 0;
	padding: 0;
	list-style-type: none;
	text-decoration: none;
	color: #333;
  font-size: 16px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
