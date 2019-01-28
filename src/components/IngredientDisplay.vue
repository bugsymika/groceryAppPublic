<template>
  <div id="searchResults">
    <div :style="{visibility: visible? 'visible':'hidden'}">
      {{displayFood.name}}
      <br>
      {{displayFood.servingAmt}} {{displayFood.servingUnit}}
      <br>
      {{displayFood.protein}}g Protein {{displayFood.fat}}g Fat {{displayFood.carbs}}g
      <br>
      {{displayFood.kcal}} kcal
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ingredientDisplay",
  data() {
    return {
      name: "",
      visible: false
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["displayFood", "isShow"])
  },
  watch: {
    isShow: function() {
      if (this.isShow == true) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    }
  }
};
</script>

<style scoped>
#searchResults {
  font-size: 1.2em;
  height: 104px;
  padding-top: 25px;
}
</style>