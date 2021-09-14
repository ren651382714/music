<template>
	<el-table :data="state.mylist" pager-count border style="width: 100%">
		
		<el-table-column prop="name" label="姓名" width="350"> </el-table-column>
		<el-table-column prop="reason" label="推荐" width="320">
		</el-table-column>
		
		<el-table-column prop="al.picUrl" label="图片路径" width="150">
			<template #default="scope">
				
				<img :src="scope.row.al.picUrl" class="table-img" :alt="scope.row.al.name"/>
			</template>
		</el-table-column>
		<el-table-column prop="dt" :formatter="formatter" label="收听数量" width="120"> </el-table-column>
		<el-table-column prop="trackNumberUpdateTime" label="更新时间" :formatter="uptimes"  width="120">
		</el-table-column>

		<el-table-column prop="publishTime" label="出版日期" :formatter="publishTime"  width="120">
		</el-table-column>

		<el-table-column fixed="right" label="操作" width="100">
			<template #default="scope">
				<el-button @click="handleClick(scope.row)" type="text" size="small"
					>查看
				</el-button>
				
			</template>
		</el-table-column>
	</el-table>
	<!--歌单详情-->
	<el-dialog title="歌单详情" v-model="state.dialogTableVisible"  >
	  <el-table :data="state.gridData" height="350">
			<el-table-column property="name" label="姓名" width="250"></el-table-column>
	    <el-table-column property="al.picUrl" label="图片" width="150">
				<template #default="scope">
					<img :src="scope.row.al.picUrl" class="table-img"/>
				</template>
			</el-table-column> 
	    <el-table-column property="address" label="地址"></el-table-column>
	  </el-table>
	</el-dialog>
</template>

<script>
	import moment from 'moment'
	import {	reactive,onMounted,getCurrentInstance,onUpdated,onBeforeMount	} from "vue";
	export default{
		name:'gedan',
		setup(){
			const {	proxy	} = getCurrentInstance();
			const myinfo = JSON.parse(localStorage.getItem('myInfo'));
			const state = reactive({
				mylist:[],
				gridData:[],
				psize:10,
				mylistleng :31,
				offset:1,
				dialogTableVisible:false
			})
			/* let upgdlist = async(page=1) => {
				console.log(page)
				let myinfo = JSON.parse(localStorage.getItem('myInfo'))
				let getgdlist = await proxy.$axios.get(`/user/playlist?uid=${myinfo.profile.userId}&limit=30`,{})
				 state.mylist = getgdlist.data.playlist
				 console.log(getgdlist.data)
			} */
			onBeforeMount(async()=>{
				getlish()
			})
			onMounted(async()=> {
				
			});
			let getlish = async()=>{
				state.mylist=[]
				
				let getgdlist = await proxy.$axios.get("/recommend/songs",{})
				/* 推荐歌单*/ /* let getgdlist = await proxy.$axios.get("/recommend/resource?limit=10",{}) */
				 /* 精选歌单 */   await proxy.$axios.get("/personalized?limit=1",{})
				/* 个人歌单 */ /* await proxy.$axios.get(`/user/playlist?uid=${myinfo.profile.userId}&limit=${state.psize}&offset=${(state.offset-1)*state.psize}`,{}) */
				 /* state.mylist = getgdlist */
				 console.log(getgdlist)
				 state.mylist = getgdlist.data.data.dailySongs
				 /*console.log(getgdlist.data.data.dailySongs) */
				
				
				
			}
			 onUpdated(async()=> {
				upgdlist
			}); 
			
			let handleSizeChange =async(size) => {
				console.log(size)
				state.psize = size
				
			}
			
			let handleCurrentChange =async(page) => {
				state.offset = page
				getlish()
			}	
			
			
			let handleClick = async(row) => {
				
				/* 歌单详情 */ let playlistDetail = await proxy.$axios.get(`/playlist/detail?id=${row.id}`,{withCredentials: true})	
				
				if(playlistDetail){
					state.gridData = playlistDetail.data.playlist.tracks
					state.dialogTableVisible = true	
					console.log(playlistDetail.data.playlist.tracks)
				}else{
					alert("请求错误")
				}

				/* let playlistDetail = await proxy.$axios.get(`/album?id=${row.id}`,{})	 */
				
			}
			
			let formatter = (row) =>{
				let hnum = 0
				if(row.dt>=100000000){
					hnum = row.dt/100000000
					return hnum.toFixed(2)+'亿'
				}else if(row.dt>=10000){
					hnum = row.dt/10000
					return hnum.toFixed(2)+'万'
				}else{
					return row.dt
				}
				
				console.log(row.playCount)
			}
			
			let uptimes = (row) =>{
				return moment(row.trackNumberUpdateTime).format("YYYY-MM-DD")
			}
			
			let publishTime = (row) =>{
				return moment(row.publishTime).format("YYYY-MM-DD")
			}
			let dayin = async() =>{
				console.log("state.psize"+state.psize)
				console.log("state.offset"+(state.offset-1)*state.psize)
				/* let myinfo = JSON.parse(localStorage.getItem('myInfo'))
				let getgdlist = await proxy.$axios.get(`/user/playlist?uid=${myinfo.profile.userId}&offset=29`,{})
				 state.mylist = getgdlist.data.playlist
				 console.log(getgdlist.data) */
			}
			
			return{
				handleClick,state,dayin,handleCurrentChange,getlish,formatter,uptimes,publishTime
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
