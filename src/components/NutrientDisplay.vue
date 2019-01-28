<template>
  <div id="nutrientDisplay">
    <div :style="{'opacity':isContent?1:0}">
      <strong>{{getProtein}}g</strong> Protein
      <strong>{{getFat}}g</strong> Fat
      <strong>{{getCarbs}}g</strong> Carbs
      <strong>{{getKcal}}</strong> Kcal
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NutrientDisplay",
  computed: {
    ...mapGetters(["returnMealArray", "returnMealArrayLength", "isContent"]),
    getProtein: function() {
      let i;
      let sumArray = [];
      let sum = 0;
      for (i = 0; i < this.returnMealArray.length; i++) {
        sumArray.push(
          this.returnMealArray[i].protein * this.returnMealArray[i].recipeAmt
        );
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
        sumArray.push(
          this.returnMealArray[i].fat * this.returnMealArray[i].recipeAmt
        );
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
        sumArray.push(
          this.returnMealArray[i].carbs * this.returnMealArray[i].recipeAmt
        );
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
        sumArray.push(
          this.returnMealArray[i].kcal * this.returnMealArray[i].recipeAmt
        );
      }
      for (i = 0; i < sumArray.length; i++) {
        sum += sumArray[i];
      }
      return sum;
    }
  }
};
</script>

<style scoped>
#nutrientDisplay {
  height: 22px;
  width: 500px;
  background-color: antiquewhite;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  display: inline-block;
}
</style>
