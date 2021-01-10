import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //전역변수로
    userInfo: null,
    //임시로 db 에서 안하고 여기 데이터로
    allUsers: [
      {
        id: 1,
        name: "hoza",
        email: "hoza@gmail.com",
        password: "123123"
      },
      {
        id: 2,
        name: "lego",
        email: "lego@gmail.com",
        password: "123123"
      }
    ],
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
      //여기에 라우터 조절을 해도 되지만 기본적으로 뮤테이션에서는 스테이트의 상태값을 조정
    },
    //로그인 실패
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    }
  },
  actions: {
    //commit 이라는 키워드를 통해서 mutations 의 함수 실행
    //state 는 그냥 state..
    //로그인 액션시 파라미터를 loginObj <-- param
    login({ state, commit }, loginObj) {
      console.log(loginObj);

      let selectedUser = null;
      //전체 유저에서 해당 이메일로 유저를 찾고 검증
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
        router.push({ name: "mypage" });
      }
    }
  },
  modules: {}
});
