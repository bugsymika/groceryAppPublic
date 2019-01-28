<template>
  <div id="app">
    <done-screen/>
    <div v-if="returnDone==false">
      <h1>Meal Prep Planner</h1>
      <div>
        <form @submit.prevent="addIngredient">
          <SearchBar/>
          <ingredientStoreButton id="ingredientStoreButton"/>
        </form>
      </div>
      <ingredient-display/>
      <div>
        <meal-box/>
        <nutrient-display/>
      </div>
      <button v-on:click="this.changeDoneStateTrue">Done?</button>
    </div>
  </div>
</template>

<script>
import IngredientDisplay from "./components/IngredientDisplay.vue";
import SearchBar from "./components/SearchBar.vue";
import MealBox from "./components/MealBox.vue";
import IngredientStoreButton from "./components/IngredientStoreButton.vue";
import debounce from "lodash/debounce";
import IngredientListDisplay from "./components/IngredientListDisplay";
import { mapMutations, mapGetters } from "vuex";
import NutrientDisplay from "./components/NutrientDisplay.vue";
import DoneScreen from "./components/DoneScreen.vue";
export default {
  name: "app",
  data() {
    return {
      submittable: false,
      thisVisible: true
    };
  },
  components: {
    IngredientDisplay,
    SearchBar,
    MealBox,
    IngredientStoreButton,
    IngredientListDisplay,
    NutrientDisplay,
    DoneScreen
  },
  methods: {
    ...mapMutations([
      "ADD_INGREDIENT_TO_RECIPE",
      "CHANGE_ISSHOW",
      "CHANGE_DONE_STATE"
    ]),
    addIngredient: function() {
      if (this.isShow == true) {
        this.ADD_INGREDIENT_TO_RECIPE();
        searchBar.__vue__.searchBar = "";
        this.CHANGE_ISSHOW(false);
      }
    },
    changeDoneStateTrue: function() {
      this.CHANGE_DONE_STATE(true);
    }
  },
  computed: { ...mapGetters(["isShow", "returnDone"]) },
  watch: {
    returnDone: function() {
      if (this.returnDone == true) {
        this.thisVisible == false;
      } else if (this.returnDone == false) {
        this.thisVisible == true;
      }
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
html {
  background: linear-gradient(45deg, rgb(162, 195, 255), rgb(165, 255, 165));
  background-attachment: fixed;
  height: 100%;
}
#ingredientStoreButton {
  height: 35px;
  vertical-align: middle;
  margin-left: 5px;
}

input {
  vertical-align: middle;
}

button:enabled:hover {
  cursor: pointer;
}
</style>
