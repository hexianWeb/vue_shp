<template>
  <div class="type-nav">
    <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeIn "
        leave-active-class="animate__bounceOutDown"
      >
        <div class="sort" v-show="showTypeNav">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in cateList"
              :key="c1.categoryId"
              @click="goSearch"
            >
              <!-- <h3 @mouseenter="changeIndex(index)"> -->
              <h3>
                <a
                  :data-cateName="c1.categoryName"
                  :data-cate1ID="c1.categoryId"
                  >{{ c1.categoryName }}-{{ index }}</a
                >
              </h3>
              <!-- <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}"> -->
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-cateName="c2.categoryName"
                        :data-cate2ID="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-cateName="c3.categoryName"
                          :data-cate3ID="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入loadsh的全部功能
import _ from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标在哪个一级分类上
      currentIndex: -1,
      showTypeNav: this.$route.meta.showTypeNav,
    };
  },
  // 当组件挂载完毕 可以向服务器发送请求
  mounted() {
    // 通过Vuex发请求 存储仓库中 =>放在APP。vue中 避免组件反复挂载 请求重复发送
    // this.$store.dispatch("cateList");
  },
  methods: {
    // 搜索框发送数据
    goSearch(event) {
      let element = event.target;
      let { catename, cate1id, cate2id, cate3id } = element.dataset;
      //    console.dir(element.dataset);
      //    console.dir(catename)
      // 触发了a标签
      if (catename) {
        let location = { name: "search" };
        let query = {
          categoryName: catename,
        };
        // 一级分类的a
        if (cate1id) {
          query.category1Id = cate1id;
        }
        // 二级分类的a
        if (cate2id) {
          query.category2Id = cate2id;
        }
        // 三级分类的a
        if (cate3id) {
          query.category3Id = cate3id;
        }
        // 动态添加query里的参数
        location.query = query;

        // 判断 是否路由中还有params参数
        if(this.$route.params) {
            location.params = this.$route.params
        }
        this.$router.push(location);
      }
    },
    // 改变导航显示类型
    enterShow() {
      // this.data.showTypeNav = true
      this.showTypeNav = true;
    },
    leaveShow() {
      // 避免主页出现
      if (this.$route.path != "/home") {
        this.showTypeNav = false;
      }
    },
  },
  // 右侧需要一个函数 当使用这个计算属性 时，右侧函数会立即执行一次
  // 注入一个参数state，其实就是大仓库的数据
  computed: {
    ...mapState({
      cateList: (state) => {
        return state.HomeStore.cateList;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
