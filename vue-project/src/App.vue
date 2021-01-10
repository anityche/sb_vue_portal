<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-system-bar></v-system-bar>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <!-- <v-list-item-group v-model="selectedItem" color="primary"> -->
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- </v-list-item-group> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="isLogin">웰컴</v-btn>
        <v-btn flat v-else router :to="{ name: 'login' }">Log In</v-btn>
        <!-- <v-btn flat>link three</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      drawer: null,
      selectedItem: 0,
      items: [
        { link: "/home", title: "Home", icon: "mdi-home-city" },
        { link: "/login", title: "Login", icon: "mdi-home-city" },
        { link: "/mypage", title: "My Account", icon: "mdi-account" }
      ],
      right: null
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  props: {
    source: String
  }
};
</script>
