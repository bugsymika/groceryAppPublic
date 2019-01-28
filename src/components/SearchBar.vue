<template>
  <input
    type="text"
    placeholder="Enter an ingredient..."
    v-model="searchBar"
    id="searchBar"
    v-on:keyup="searchDB"
    autocomplete="off"
  >
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { mapState, mapMutations, mapGetters } from "vuex";
const token = require("../keys.js");

export default {
  name: "SearchBar",
  data() {
    return {
      ingredient: [],
      food: "",
      searchBar: "",
      key: token.appKey,
      appID: token.appID
    };
  },
  methods: {
    ...mapMutations([
      "CHANGE_CURRENT_INGREDIENT",
      "UPDATE_CURRENT_INGREDIENT",
      "CHANGE_ISSHOW"
    ]),
    addIngredient: function() {
      this.CHANGE_CURRENT_INGREDIENT(this.ingredient);
    },
    updateIngredient: function() {
      this.UPDATE_CURRENT_INGREDIENT();
    },
    changeIsShow(valueTF) {
      this.CHANGE_ISSHOW(valueTF);
    },
    searchDB: _.debounce(food => {
      const root = searchBar.__vue__;
      food = searchBar.value;
      if (food.length > 1) {
        axios.defaults.headers.common["x-app-id"] = root.appID;
        axios.defaults.headers.common["x-app-key"] = root.key;
        axios
          .get(
            "https://trackapi.nutritionix.com/v2/search/instant?query=" +
              food +
              "&branded=false&detailed=true"
          )
          .then(response => {
            root.ingredient = response.data;
            root.addIngredient();
            root.updateIngredient();
            root.changeIsShow(true);
          });
      }
    }, 300)
  },
  watch: {
    searchBar: function() {
      this.changeIsShow(false);
    }
  }
};
</script>

<style scoped>
#searchBar {
  width: 300px;
  height: 30px;
  font-size: 1.5em;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#addIngredientButton {
  display: inline;
}
</style>