<template>
  <div class="login-container">
    <h1>로그인</h1>
    <Form v-slot="$form">
      <div class="login-field">
        <CustomInputText
          v-model="id"
          :input-id="'email'"
          :label-name="'아이디'"
          :input-type="'text'"
        />
        <CustomInputText
          v-model="password"
          :input-id="'password'"
          :label-name="'비밀번호'"
          :input-type="'password'"
        />
      </div>
      <CustomButton @click="handelLogin" label-name="로그인" :justify="'end'" />
    </Form>
    <div class="social-login">
      <SocialLoginButton
        v-for="social in socialLoginButtons"
        @click="social.handleFunction"
        :key="social.name"
        :socialname="social.name"
        :src-path="social.srcPath"
      />
    </div>
    <div class="sign-up">
      <p>아직 회원이 아니신가요?</p>
      <RouterLink :to="{ name: 'signup' }">회원 가입 하러 가기</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { Form } from "@primevue/forms";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance";
import CustomInputText from "@/components/input/CustomInputText.vue";
import CustomButton from "@/components/button/CustomButton.vue";
import SocialLoginButton from "@/components/button/SocialLoginButton.vue";
import googleLogo from "@/assets/googlelogo.png";
import kakaoLogo from "@/assets/kakaologo.png";

const id = ref("");
const password = ref("");
const router = useRouter();

const handelLogin = async () => {
  try {
    const response = await axiosInstance.post(
      "http://127.0.0.1:8000/api/auth/login/",
      {
        email: id.value, // id input이 email을 의미함
        password: password.value
      }
    );

    const { access, refresh, user } = response.data;

    // 토큰을 localStorage에 저장
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    console.log(access)
    // 로그인 성공 후 리다이렉트 (예: 홈으로)
    router.replace("/");
  } catch (error) {
    console.error("❌ 로그인 실패:", error.response?.data || error.message);
    alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
  }
};

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

onMounted(() => {
  if (typeof window.Kakao !== "undefined" && !window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY);
  }
});

const handleGoogleLogin = () => {
  const redirectUri = "http://localhost:5173/api/auth/google/callback/";
  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;

  window.location.href = oauthUrl;
};
const handleKakaoLogin = () => {
  if (window.Kakao) {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/api/auth/kakao/callback/"
    });
  } else {
    console.error("❌ Kakao SDK not available");
  }
};
const socialLoginButtons = ref([
  {
    handleFunction: handleGoogleLogin,
    name: "google",
    srcPath: googleLogo
  },
  {
    handleFunction: handleKakaoLogin,
    name: "kakao",
    srcPath: kakaoLogo
  }
]);

</script>

<style scoped>
.login-container {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.login-field {
  margin-bottom: 2rem;
}

.social-login {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
}
.sign-up {
  text-align: center;
  margin-top: 2rem;
}
</style>
