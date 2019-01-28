import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentIngredient: [],
    ingredientStats: {
      name: "",
      servingAmt: "",
      servingUnit: "",
      protein: "",
      fat: "",
      carbs: "",
      kcal: "",
      recipeAmt: 1
    },
    isShow: false,
    meal: [],
    currentMeal: 0,
    meals: [
      {
        mealName: "",
        mealQty: 1,
        mealArray: []
      }
    ],
    done: false
  },
  getters: {
    displayFood: state => {
      return state.ingredientStats;
    },
    isShow: state => {
      return state.isShow;
    },
    isContent: state => {
      if (state.meals[state.currentMeal].mealArray.length == 0) {
        return false;
      } else {
        return true;
      }
    },
    returnIngredients: state => {
      return state.meals[state.currentMeal].mealArray;
    },
    returnMealQty: state => {
      return state.meals[state.currentMeal].mealQty;
    },
    returnCurrentMeal: state => {
      return state.currentMeal;
    },
    returnMealName: state => {
      return state.meals[state.currentMeal].mealName;
    },
    returnMealArray: state => {
      return state.meals[state.currentMeal].mealArray;
    },
    returnMealArrayLength: state => {
      return state.meals[state.currentMeal].mealArray.length;
    },
    returnShoppingList: state => {
      let ingredients = [];
      let ingredientsFiltered = [];
      let i;
      for (i = 0; i < state.meals.length; i++) {
        state.meals[i].mealArray.forEach(function(object) {
          ingredients.push(
            object.recipeAmt * object.servingAmt * state.meals[i].mealQty +
              " " +
              object.servingUnit.replace('"', " inch ") +
              " " +
              object.name
          );
        });
      }

      ingredients.forEach(function(ingredient) {
        let i;
        let index = ingredient.indexOf(" ");
        let ingredientQty = 0;
        for (i = 0; i < ingredients.length; i++) {
          let newIndex = ingredient.indexOf(" ");
          if (
            ingredient.slice(newIndex + 1) == ingredients[i].slice(newIndex + 1)
          ) {
            ingredientQty += Number(ingredients[i].slice(0, index));
          }
        }
        let newIngredient = ingredientQty + ingredient.slice(index);
        ingredientsFiltered.push(newIngredient);
      });
      let filterIngredients = new Set(ingredientsFiltered);

      let shoppingList = [...filterIngredients];
      return shoppingList;
    },
    returnMeals: state => {
      let recipes = [];
      let i;

      for (i = 0; i < state.meals.length; i++) {
        let recipe = {
          name: "",
          qty: "",
          ingredients: [],
          protein: 0,
          fat: 0,
          carbs: 0,
          kcal: 0
        };

        recipe.name = state.meals[i].mealName;
        recipe.qty = state.meals[i].mealQty;

        state.meals[i].mealArray.forEach(function(object) {
          recipe.ingredients.push(
            object.recipeAmt * object.servingAmt +
              " " +
              object.servingUnit.replace('"', " inch ") +
              " " +
              object.name
          );
          recipe.protein += object.protein;
          recipe.fat += object.fat;
          recipe.carbs += object.carbs;
          recipe.kcal += object.kcal;
        });

        recipes.push(recipe);
      }
      return recipes;
    },
    returnDone: state => {
      return state.done;
    }
  },

  mutations: {
    CHANGE_CURRENT_INGREDIENT: (state, ingredient) => {
      state.currentIngredient = [];
      state.currentIngredient.push(ingredient);
    },
    UPDATE_CURRENT_INGREDIENT: state => {
      let stats = state.ingredientStats;
      let ingredient = state.currentIngredient;
      stats.name = ingredient[0].common[0].food_name;
      stats.servingAmt = ingredient[0].common[0].serving_qty;

      stats.servingUnit = ingredient[0].common[0].serving_unit;
      stats.protein = Math.floor(
        ingredient[0].common[0].full_nutrients[0].value
      );
      stats.fat = Math.floor(ingredient[0].common[0].full_nutrients[1].value);
      stats.carbs = Math.floor(ingredient[0].common[0].full_nutrients[2].value);
      stats.kcal = Math.floor(ingredient[0].common[0].full_nutrients[4].value);
    },
    CHANGE_ISSHOW: (state, valueTF) => {
      state.isShow = valueTF;
    },
    ADD_INGREDIENT_TO_RECIPE: state => {
      state.meals[state.currentMeal].mealArray.push(state.ingredientStats);
      state.ingredientStats = {
        name: "",
        servingAmt: "",
        servingUnit: "",
        protein: "",
        fat: "",
        carbs: "",
        kcal: "",
        recipeAmt: 1
      };
    },
    ADD_MEAL_QTY: state => {
      state.meals[state.currentMeal].mealQty++;
    },
    SUBTRACT_MEAL_QTY: state => {
      if (state.meals[state.currentMeal].mealQty == 1) {
        return;
      } else {
        state.meals[state.currentMeal].mealQty--;
      }
    },
    CHANGE_SERVING_QTY: (state, object) => {
      if (
        state.meals[state.currentMeal].mealArray[object.index].recipeAmt +
          object.operator <=
        0
      ) {
        return;
      } else {
        state.meals[state.currentMeal].mealArray[object.index].recipeAmt +=
          object.operator;
      }
    },
    PREVIOUS_MEAL: state => {
      if (state.currentMeal == 0) {
        return;
      } else {
        state.currentMeal--;
      }
    },
    ADD_NEW_MEAL: state => {
      if (state.meals.length == state.currentMeal + 1) {
        state.meals.push({
          mealName: "",
          mealQty: 1,
          mealArray: []
        });
        state.currentMeal++;
      } else {
        state.currentMeal++;
      }
    },
    DELETE_MEAL: state => {
      if (state.currentMeal == 0 && state.meals.length > 1) {
        state.meals.splice(0, 1);
      } else if (state.currentMeal == 0 && state.meals.length == 1) {
        state.meals[0].mealName = "";
        state.meals[0].mealQty = 1;
        state.meals[0].mealArray = [];
      } else {
        state.meals.splice(state.currentMeal, 1);
        state.currentMeal--;
      }
    },
    CHANGE_MEAL_NAME: (state, name) => {
      state.meals[state.currentMeal].mealName = name;
    },
    CHANGE_DONE_STATE: (state, value) => {
      state.done = value;
    }
  }
});
