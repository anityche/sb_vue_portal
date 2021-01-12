<template>
  <v-app>
    <v-card>
      <!-- app bar -->
      <v-app-bar color="accent-3" prominent app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-menu offset-y v-if="isLogin">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dialpad</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item :to="{ name: 'mypage' }">
                <v-list-item-title>Mypage</v-list-item-title>
              </v-list-item>
              <!-- import mapActions 하지 않고 dispatch 를 통해 호출 -->
              <v-list-item @click="$store.dispatch('logout')">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn text v-else :to="{ name: 'login' }">Log In</v-btn>
          <!-- <v-btn text>link three</v-btn> -->
        </v-toolbar-items>
      </v-app-bar>
      <!-- // app-bar -->

      <!-- nav -->
      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list dense nav>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item :to="{ name: 'home' }" exact>
              <v-list-item-action>
                <v-icon>mdi-home-city</v-icon>
              </v-list-item-action>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isLogin === false" :to="{ name: 'login' }" exact>
              <v-list-item-action>
                <v-icon>mdi-login</v-icon>
              </v-list-item-action>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item v-else :to="{ name: 'mypage' }" exact>
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-title>Mypage</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!-- // nav -->

      <!-- <v-card-text>v-card-text</v-card-text> -->
    </v-card>

    <!-- v-content(v1.5) to v-main(v2.0 high) -->
    <v-main>
      <router-view></router-view>
    </v-main>
    <!-- // v-content to v-main -->

    <!-- footer -->
    <v-footer color="indigo">
      <span class="white--text">copyright &copy; 2020</span>
    </v-footer>
    <!-- // footer -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      group: null,
      right: null
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  props: {
    source: String
  }
};
</script>
