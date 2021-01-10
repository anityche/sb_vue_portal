<template>
  <div>
    <h1>{{ userInfo.name }} 님, 환영합니다.</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
