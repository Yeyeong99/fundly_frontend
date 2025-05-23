import CheckGoal from "@/views/Goal/CheckGoal.vue";
import CheckProducts from "@/views/Product/CheckProducts.vue";
import Community from "@/views/Community/Community.vue";
import CommunityDetail from "@/views/Community/CommunityDetail.vue";
import EditPersonalInfo from "@/views/MyPage/EditPersonalInfo.vue";
import ExchangeRate from "@/views/ExchangeRate.vue";
import GoalDetail from "@/views/Goal/GoalDetail.vue";
import GoalProductDetail from "@/views/Goal/GoalProductDetail.vue";
import LikeProducts from "@/views/MyPage/LikeProducts.vue";
import Login from "@/views/Login/Login.vue";
import GoogleCallback from "@/views/oauth/GoogleCallback.vue";
import KakaoCallback from "@/views/oauth/KakaoCallback.vue";
import ProductDetail from "@/views/Product/ProductDetail.vue";
import QnA from "@/views/MyPage/QnA.vue";
import RecommendProducts from "@/views/Product/RecommendProducts.vue";
import SearchBank from "@/views/SearchBank.vue";
import SetGoal from "@/views/Goal/SetGoal.vue";
import Signup from "@/views/Signup/Signup.vue";
import {createRouter, createWebHistory} from "vue-router";
import WritePost from "@/views/Community/WritePost.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "checkgoal",
      component: CheckGoal
    }, {
      path: "/checkgoal/:goalid",
      name: "goaldetail",
      component: GoalDetail
    }, {
      path: "/checkgoal/:goalid/:userid/:product",
      name: "goalproductdetail",
      component: GoalProductDetail
    }, {
      path: "/checkproducts",
      name: "checkproducts",
      component: CheckProducts
    }, {
      path: "/checkproducts/:id",
      name: "productdetail",
      component: ProductDetail
    }, {
      path: "/community",
      name: "community",
      component: Community
    }, {
      path: "/writepost",
      name: "writepost",
      component: WritePost
    }, {
      path: "/community/detail/:id",
      name: "detail",
      component: CommunityDetail
    }, {
      path: "/edit/personalinfo",
      name: "editpersonalInfo",
      component: EditPersonalInfo
    }, {
      path: "/exchangerate",
      name: "exchangerate",
      component: ExchangeRate
    }, {
      path: "/likeproducts",
      name: "likeproducts",
      component: LikeProducts
    }, {
      path: "/login",
      name: "login",
      component: Login
    }, {
      path: "/google/callback",
      name: "GoogleCallback",
      component: GoogleCallback
    }, {
      path: "/api/auth/kakao/callback",
      name: "KakaoCallback",
      component: KakaoCallback
    }, {
      path: "/qna",
      name: "qna",
      component: QnA
    }, {
      path: "/recommendproducts",
      name: "recommendproducts",
      component: RecommendProducts
    }, {
      path: "/searchbank",
      name: "searchbank",
      component: SearchBank
    }, {
      path: "/setgoal",
      name: "setgoal",
      component: SetGoal
    }, {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ]
});

// 로그인 안되었으면 로그인 화면만 들어갈 수 있도록
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const publicPages = ["/login", "/signup"];

  if (!isLoggedIn && !publicPages.includes(to.path)) {
    next("/login");
  } else {
    next();
  }
});

export default router;
