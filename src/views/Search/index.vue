<template>
  <div>
    <van-search
      v-model="searchData"
      placeholder="请输入搜索关键词"
      shape="round"
      @clear="clear()"
      @input="input()"
    />
    <div class="search_wrap" v-if="result">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="item in recData"
          :key="item.id"
          @click="clickRec(item)"
        >
          {{ item.first }}
        </span>
      </div>
    </div>

    <div v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad()"
      >
        <van-cell
          v-for="item in searchResult"
          :key="item.id"
          center
          :title="item.name"
          value=""
          :label="item.al.name + ' - ' + item.ar[0].name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="30" @click="play(item.id)"/>
          </template>
        </van-cell> </van-list
      >>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, recommendMusicAPI, searchResultListAPI } from "@/api";

export default {
  data() {
    return {
      searchData: "",
      recData: [],
      result: true,
      searchResult: [],
      loading: false,
      finished: false,
      page: 1,
      timer:null,//输入框防抖定时器
    };
  },
  async created() {
    const res = await hotSearchAPI({
      limit: 10,
    });
    this.recData = res.data.result.hots;
    console.log("res: ", res);
  },
  methods: {
    clear() {
      this.finished = false;
      this.searchData = "";
      this.result = true;
      this.searchResult = [];
    },
    async clickRec(item) {
      this.page = 1;
      this.finished = false;
      this.searchData = item.first;
      const res = await searchResultListAPI({
        keywords: item.first,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
      this.result = !this.result;
      if (res.data.result.songs == undefined) {
        this.finished = true;
        return;
      }
      this.searchResult = res.data.result.songs;

      console.log("res: ", this.searchResult);
    },
    async input() {
      if(this.timer)
      clearTimeout(this.timer);
      this.timer=setTimeout(async()=>{
   if (this.searchData != "") {
        const data = this.searchData;
        this.finished = false;
        this.page = 1;
        const res = await searchResultListAPI({
          keywords: data,
          limit: 20,
          offset: (this.page - 1) * 20,
        });
        this.result = false;
        if (res.data.result.songs == undefined) {
          this.finished = true;
          return;
        }
        this.searchResult = res.data.result.songs;
      } else {
        this.result = true;
      }
      },500)

   
    },

    async onLoad() {
      this.page++;
      const res = await searchResultListAPI({
        keywords: this.searchData,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
      this.loading = false;
      if (res.data.result.songs == undefined) {
        this.finished = true;
        return;
      }

      this.searchResult = [...this.searchResult, ...res.data.result.songs]; //数据拼接
    },
     play(id){
      this.$router.push({
        path:'/play',
        query:{
          id
        }
      })
  },
  },
};
</script>

<style>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.92rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 1.53333rem;
  margin-right: 1rem;
  margin-bottom: 0.313333rem;
  padding: 0 0.473333rem;
  font-size: 1.073333rem;
  line-height: 1.53333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>