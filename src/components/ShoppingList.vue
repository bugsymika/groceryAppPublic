<template>
  <div>
    <h3>Your Shopping List:</h3>
    <div
      id="shoppingList"
      v-for="ingredient in returnShoppingList"
      :key="ingredient.index"
    >{{ingredient}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShoppingList",

  computed: {
    ...mapGetters(["returnShoppingList", "returnMeals"])
  }
};
</script>

<style scoped>
h3 {
  border-bottom: solid;
  padding-bottom: 20px;
}
#shoppingList {
  text-align: left;
  padding-bottom: 2%;
  margin-left: 2%;
}
</style>
