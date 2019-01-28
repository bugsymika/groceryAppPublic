<template>
  <div>
    <div id="mealBox">
      <ingredient-list-display/>
    </div>
  </div>
</template>

<script>
import IngredientListDisplay from "./IngredientListDisplay.vue";
import { mapGetters } from "vuex";
export default {
  name: "MealBox",
  components: {
    IngredientListDisplay
  },
  data() {
    return {
      showNuts: false
    };
  },
  computed: {
    ...mapGetters(["returnMealArray", "returnMealArrayLength"]),
    getProtein: function() {
      let i;
      let sumArray = [];
      let sum = 0;
      for (i = 0; i < this.returnMealArray.length; i++) {
        sumArray.push(this.returnMealArray[i].protein);
      }
      for (i = 0; i < sumArray.length; i++) {
        sum += sumArray[i];
      }
      return sum;
    },
    getFat: function() {
      let i;
      let sumArray = [];
      let sum = 0;
      for (i = 0; i < this.returnMealArray.length; i++) {
        sumArray.push(this.returnMealArray[i].fat);
      }
      for (i = 0; i < sumArray.length; i++) {
        sum += sumArray[i];
      }
      return sum;
    },
    getCarbs: function() {
      let i;
      let sumArray = [];
      let sum = 0;
      for (i = 0; i < this.returnMealArray.length; i++) {
        sumArray.push(this.returnMealArray[i].carbs);
      }
      for (i = 0; i < sumArray.length; i++) {
        sum += sumArray[i];
      }
      return sum;
    },
    getKcal: function() {
      let i;
      let sumArray = [];
      let sum = 0;
      for (i = 0; i < this.returnMealArray.length; i++) {
        sumArray.push(this.returnMealArray[i].kcal);
      }
      for (i = 0; i < sumArray.length; i++) {
        sum += sumArray[i];
      }
      return sum;
    }
  },
  watch: {
    returnMealArrayLength: function() {
      if (this.returnMealArrayLength == 0) {
        this.showNuts = false;
      } else {
        this.showNuts = true;
      }
    }
  }
};
</script>

<style scoped>
#mealBox {
  height: 450px;
  width: 500px;
  margin-top: 20px;
  background-color: antiquewhite;
  display: inline-block;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  overflow: scroll;
  margin-bottom: -8px;
}
</style>
