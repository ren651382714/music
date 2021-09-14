<template>
	<div class="cooments">
		<h2 @click="myComment">我的评论</h2>
			<el-table :data="state.Commentlist" style="width: 100%">
				<el-table-column prop="user.avatarUrl" label="头像" width="180"> 
						<template #default="scope">
							<img :src="scope.row.user.avatarUrl" class="table-img"/>
						</template>
					</el-table-column>
				<el-table-column prop="time" label="日期" width="180" :formatter="uptimes"> 
						
					</el-table-column>
				<el-table-column prop="content" label="评论"> </el-table-column>
			</el-table>
	</div>
	
</template>

<script>
	import moment from 'moment'
	import {reactive,onMounted,getCurrentInstance,onBeforeMount} from "vue";
	export default{
		
		name:"myComment",
		setup(){
			let {	proxy	} = getCurrentInstance();
			let myinfo = JSON.parse(localStorage.getItem('myInfo'));
			const state = reactive({
				Commentlist:[]
			})
			onBeforeMount(async()=>{
				myComment()
			})
			onMounted(async()=>{
				
			})
			
			let uptimes = (row) =>{
				return moment(row.time).format("YYYY-MM-DD")
			}
			
			let myComment = async()=>{
				let	Commentlist = await proxy.$axios.get(`/user/comment/history?uid=${myinfo.profile.userId}`,{withCredentials: true})
				console.log(Commentlist.data.data.comments)
				state.Commentlist = Commentlist.data.data.comments
			}
			 
			return{
				state,myComment,uptimes 
			}
		}
		
	}
</script>

<style>
	.table-img{
		width: 80px;
		height: 80px;
		border-radius: 15px;
	}
</style>
