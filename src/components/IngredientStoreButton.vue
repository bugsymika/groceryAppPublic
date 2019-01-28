<template>
  <button :disabled="isClick==false" v-on:click="addIngredient">Add</button>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "IngredientStoreButton",
  data() {
    return {
      isClick: false
    };
  },
  methods: {
    ...mapMutations(["ADD_INGREDIENT_TO_RECIPE", "CHANGE_ISSHOW"]),
    addIngredient: function() {
      this.ADD_INGREDIENT_TO_RECIPE();
      this.CHANGE_ISSHOW(false);
      searchBar.__vue__.searchBar = "";
    }
  },
  computed: {
    ...mapGetters(["isShow"])
  },
  watch: {
    isShow: function() {
      if (this.isShow == true) {
        this.isClick = true;
      } else {
        this.isClick = false;
      }
    }
  }
};
</script>

<style scoped>
</style>