<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="10">
      <!-- gutter为间距 -->
      <van-col span="8" v-for="item in recList" :key="item.id">
        <van-image width="100%" height="7rem" fit="cover" :src="item.picUrl" />
        <p class="song_name">{{ item.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <van-cell-group>
      <van-cell v-for="item in newList" :key="item.id" center 
      :title="item.name" value="" 
      :label="item.song.artists[0].name+' - '+item.name"
      >
        <template #right-icon > 
          <van-icon name="play-circle-o" size="30" @click="play(item.id)" />
        </template>
      </van-cell>
      
    </van-cell-group>
  </div>
</template>

<script>
import { newMusicAPI, recommendMusicAPI } from "@/api";
export default {
  async created() {
    const res = await recommendMusicAPI({
      limit: 6,
    });
    this.recList = res.data.result;
    //最新音乐
    const newres = await newMusicAPI({
      limit: 6,
    });
    this.newList = newres.data.result;
    console.log("newList: ", this.newList);
  },
 methods: {
    play(id){
      this.$router.push({
        path:'/play',
        query:{
          id
        }
      })
  },
 },
  data() {
    return {
      recList: [],
      newList: [],
    };
  },
};
</script>

<style>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}

/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical;
  /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2;
  /** 显示的行数 **/
  overflow: hidden;
  /** 隐藏超出的内容 **/
}
.van-cell{
  border-bottom: 1px solid gray;;
}

</style>