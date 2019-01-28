<template>
  <div>
    <h3>Your Recipe List:</h3>
    <div id="recipeList" v-for="(recipe, index) in returnMeals" :key="recipe.index">
      <div v-if="recipe.name !=='' && recipe.ingredients.length>0">
        <div id="name">
          {{recipe.name}}
          (x{{recipe.qty}})
        </div>
        <div id="ingredients">
          <div
            v-for="ingredient in returnMeals[index].ingredients"
            :key="ingredient.index"
          >{{ingredient}}</div>
        </div>
        <div id="nutrients">
          <br>
          <strong>{{recipe.protein}}g</strong> Protein
          <strong>{{recipe.fat}}g</strong> Fat
          <strong>{{recipe.carbs}}g</strong> Carbs
          <strong>{{recipe.kcal}}</strong>
          Kcal
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Recipes",

  computed: {
    ...mapGetters(["returnMeals"])
  }
};
</script>

<style scoped>
#name {
  font-size: 1.25rem;
  font-weight: bold;
  border-top: solid;
  padding-left: 4%;
}

#name:first-letter {
  text-transform: capitalize;
}

#recipeList {
  padding-bottom: 4%;
  text-align: left;
}

#ingredients {
  padding-top: 2%;
  border-top: solid;
  padding-left: 4%;
}

#nutrients {
  padding-left: 4%;
}
</style>
