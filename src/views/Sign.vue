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
			/*登录状态*/
			let Signin = async() => {
				let dengru = await proxy.$axios.get('/login/status',{})
				localStorage.setItem("myInfo",JSON.stringify(dengru.data.data))
				console.log(dengru)
				return dengru.data.data
			}
			/*获取用户信息*/
			let myInfo = async() => {
				let arrs =  JSON.parse(localStorage.getItem('myInfo'))
				let dengrus = await proxy.$axios.get(`/user/detail?uid=${arrs.profile.userId}`,{})
					
			}
			/*获取账户信息*/
			let zhInfo = async() => {
				let arrs =  JSON.parse(localStorage.getItem('myInfo'))
				let dengrus = await proxy.$axios.get('/user/account',{})
				console.log(dengrus)
				localStorage.setItem("myInfos",JSON.stringify(dengrus.data))	
			}
			/*事件*/
			
			
			/*时间戳timestamp=*/
			onMounted(async() =>{
				let getkey = await proxy.$axios.get('/login/qr/key?timestamp=New Date()',{withCredentials: true})
				let getkeys = getkey.data.data.unikey
				let getewimg = await proxy.$axios.get(`/login/qr/create?key=${getkeys}&qrimg=true&timestamp=New Date()`,{withCredentials: true})
				erweiimg.img = getewimg.data.data.qrimg
				const checkStatus = async() => {
					const res = await proxy.$axios.get(`/login/qr/check?key=${getkeys}&timestamp=New Date()`,{withCredentials: true})
					console.log(`查找cookies:${res}`)
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
										myInfo()
										zhInfo()
										clearInterval(timer)
				          }
				        }, 3000)
			})
			
			return{
				erweiimg,Signin,myInfo,zhInfo
			}
		},
		
	}
</script>

<style scope>
	.el-row {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
</style>
