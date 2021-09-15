<template>
	<el-row>
		<el-col :span="24">
			<div class="grid-content bg-purple-dark">
				<div class="head-h3">
					<div class="head-h3-cont">
						<div class="head-h3-cont-left">
							小喇叭
						</div>
						<div class="head-h3-cont-wen">
							欢迎_{{myinfo.profile.nickname}}_来到我的云音乐！
						</div>
						<div class="head-h3-cont-img"
						 @mouseenter="gaishow" 
						 @mouseleave="gaishow">
							<img class="myheadimg" :src="myinfo.profile.avatarUrl" >
							<ul class="head-h3-cont-img-ul" v-if="isshow.isshows">
								<p>{{isshow.isshows}}</p>
								<router-link v-for="item in mylist" :key="item.id" :to="item.to">{{item.name}}</router-link >
							</ul>
						</div>
					</div>
					
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	import {onMounted,reactive} from "vue";
	export default {
		name:"Head",
		setup() {
			let myinfo = JSON.parse(localStorage.getItem('myInfo'))
			let mylist = reactive([
				{id:1,name:'我的信息',tit:'',to:''},
				{id:2,name:'我的歌单',tit:'',to:'/gedan'},
				{id:3,name:'我的评价',tit:'',to:'/myComment'},
			])
			let isshow = reactive({
				isshows:false
			})
			
			let gaishow = ()=>{
				isshow.isshows = !isshow.isshows
			}
			
			return{
				myinfo,mylist,isshow,gaishow
			}
		},
		
	}
</script>

<style scoped>
	.head-h3{
		width: 100%;
		height: 75px;
		background-color: black;
	}
	.head-h3-cont-left{
		color: #FFFFFF;
	}
	.head-h3-cont{
		width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		height: 100%;
	}
	.head-h3-cont-wen{
		color: #FFFFFF;
		font-size: 18px;
	}
	.myheadimg{
		width: 50px;
		height: 50px;
		border: 3px solid #fff;
		border-radius: 50%;
		text-align: center;
		
		display: block;
	}
	.head-h3-cont-img{
		position: relative;
	}
	.head-h3-cont-img-ul{
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100px;
		margin: 0 auto;
		padding: 8px;
		top: 56px;
		position: absolute;
		left: -23px;
	}
	.head-h3-cont-img-ul li{
		font-size: 14px;
		color: #2C3E50;
		text-align: center;
		list-style-type: none;
		width: 100%;
		display: block;
		cursor: pointer;
		margin: 5px 0;
		
	}
	.head-h3-cont-img-ul li::after{
		content: "";
		
	}
	
</style>
