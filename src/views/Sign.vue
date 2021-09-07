<template>
	<el-row>
		<el-col :span="24">
			<div class="grid-content bg-purple-dark">
				<h3>登录二维码</h3>
				<img :src="erweiimg.img" />
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import {	reactive,getCurrentInstance,onMounted	} from "vue";
	export default {
		name: 'Sign',
		setup() {
			const {	proxy	} = getCurrentInstance();
			const erweiimg = reactive({
				img:''
			});
			let Signin = async() => {
				let dengru = await proxy.$axios.get('/login/status',{})
				
				
				return dengru.data.data
				this.$store.commit("setData", dengru.data.data)
				console.log(dengru.data.data)
			}
			
			onMounted(async() =>{
				let getkey = await proxy.$axios.get('/login/qr/key',{withCredentials: true})
				
				let getkeys = getkey.data.data.unikey
				let getewimg = await proxy.$axios.get(`/login/qr/create?key=${getkeys}&qrimg=true`,{withCredentials: true})
				erweiimg.img = getewimg.data.data.qrimg
				const checkStatus = async() => {
					const res = await proxy.$axios.get(`/login/qr/check?key=${getkeys}`,{withCredentials: true})
					return res.data
					
				}
				
				let timer = setInterval(async () => {
				          const statusRes = await checkStatus()
				          if (statusRes.code === 800) {
				            alert('二维码已过期,请重新获取')
				            clearInterval(timer)
				          }
				          if (statusRes.code === 803) {
				            
				            clearInterval(timer)
				            alert('授权登录成功')
				            Signin()
										
				          }
				        }, 3000)
								
					
				
			})
			
			return{
				erweiimg,Signin
			}
		},
		
	}
</script>

<style>
	.el-row {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
</style>
