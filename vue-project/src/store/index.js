import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //전역변수로
    userInfo: null,
    // //임시로 db 에서 안하고 여기 데이터로
    // allUsers: [
    //   {
    //     id: 1,
    //     name: "hoza",
    //     email: "hoza@gmail.com",
    //     password: "123123"
    //   },
    //   {
    //     id: 2,
    //     name: "lego",
    //     email: "lego@gmail.com",
    //     password: "123123"
    //   }
    // ],
    isLogin: false,
    isLoginError: false
  },
  mutations: {
    //state 상태값을 변경하는 로직
    //로그인 성공
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;

      console.log("call loginSuccess userInfo - ", state.userInfo);
      //여기에 라우터 조절을 해도 되지만 기본적으로 뮤테이션에서는 스테이트의 상태값을 조정
    },
    //로그인 실패
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
      state.userInfo = null;
    },
    //로그아웃
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    }
  },
  actions: {
    //commit 이라는 키워드를 통해서 mutations 의 함수 실행
    //state 는 그냥 state..
    /*
    // 1. 로그인 액션시 파라미터를 loginObj <-- param
    login({ state, commit }, loginObj) {
      console.log(loginObj);

      let selectedUser = null;
      //state.allUsers 객체 중 유저에서 해당 이메일로 유저를 찾고 검증
      state.allUsers.forEach(user => {
        if (user.email === loginObj.email) selectedUser = user;
      });
      if (
        selectedUser === null ||
        selectedUser.password !== loginObj.password
      ) {
        commit("loginError");
      } else {
        commit("loginSuccess", selectedUser); //commit 파라미터는 payload 로
        router.push({ name: "mypage" }); //이동페이지
      }
    },
    */
    // 2. 로그인시도 (토큰방식)
    login({ dispatch }, loginObj) {
      console.log("call login", loginObj);
      // 로그인 -> 유저의 토큰반환 (eve.holt@reqres.in / cityslicka)
      axios
        .post("https://reqres.in/api/login", loginObj) //body parameter
        .then(res => {
          console.log("request login ", res);
          // 성공시 token: 블라블라(실제로는 user_id 값을 받아올거임)
          // 토큰을 헤더에 포함시켜서 유저 정보를 요청
          const token = res.data.token;
          console.log("login token", token);
          // 토큰을 로컬스토리지에 저장
          localStorage.setItem("access_token", token);
          dispatch("getMemberInfo");
        })
        .catch(() => {
          alert("이메일과 비밀번호를 확인하셈");
        });
    },
    // 로그아웃
    logout({ commit }) {
      console.log("call logout");
      commit("logout");
      //토큰삭제
      localStorage.removeItem("access_token");
      router.push({ name: "home" });
    },
    // 토큰으로
    getMemberInfo({ commit }) {
      console.log("call getMemberInfo");
      // 로컬스토리지에 토큰 로드
      let token = localStorage.getItem("access_token");
      let config = {
        headers: {
          "access-token": token
        }
      };
      // 토큰 -> 멤버 정보를 반환
      // 새로고침 -> 토큰만으로 멤버 정보를 요청
      axios
        .get("https://reqres.in/api/users/2", config)
        .then(response => {
          console.log("request user 2 ", response);
          const data = response.data.data;
          let userInfo = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            avatar: data.avatar
          };
          commit("loginSuccess", userInfo);
        })
        .catch(() => {
          alert("이메일과 비밀번호를 확인하셈");
        });
    }
  },
  modules: {}
});
