<template>
  <v-container fill-height style="max-width:450px;">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert class="mb-3" :value="isLoginError" type="error"
          >아이디와 비밀번호를 확인해주세요.</v-alert
        >
        <v-alert class="mb-3" :value="isLogin" type="success"
          >로그인이 완료됨.</v-alert
        >
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>로그인</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="email" label="이메일"> </v-text-field>
            <v-text-field v-model="password" type="password" label="패스워드">
            </v-text-field>
            <v-btn
              large
              block
              depressed
              color="primary"
              @click="
                login({
                  email: email,
                  password: password
                })
              "
              >로그인
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null
      // isError: false,
      // loginSuccess: false
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]) //store state load
  },
  methods: {
    ...mapActions(["login"]) //store actions load
    // login() {
    // let selectedUser = null;
    // //전체 유저에서 해당 이메일로 유저를 찾고 검증
    // this.allUsers.forEach(user => {
    //   if (user.email === this.email) selectedUser = user;
    // });
    // selectedUser === null
    //   ? (this.isError = true)
    //   : selectedUser.password !== this.password
    //   ? (this.isError = true)
    //   : (this.loginSuccess = true);

    // console.log(this.email, this.password);
    // }
  }
};
</script>
