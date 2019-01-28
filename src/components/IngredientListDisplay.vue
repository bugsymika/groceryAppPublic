<template>
  <div>
    <div id="changeButtons">
      <button
        id="previousRecipeButton"
        v-on:click="previousMeal"
        :disabled="returnCurrentMeal==0"
      >Previous</button>
      <button
        id="nextRecipeButton"
        v-on:click="addNewMeal"
        :disabled="returnMealName.length==0"
      >Next</button>
    </div>
    <p v-if="returnMealName.length>0">{{returnMealName}}</p>
    <div v-if="returnMealName==''">
      <form @submit.prevent="changeMealName(mealNameInput)">
        <input
          autocomplete="off"
          id="nameInput"
          v-model="mealNameInput"
          placeholder="Enter meal name..."
        >
        <input id="nameSubmit" type="submit" value="enter">
      </form>
    </div>
    <br>
    <button v-if="returnMealName.length>0" v-on:click="deleteMeal">Delete Meal</button>
    <div id="mealNumber" v-if="mealHasName==true">
      # of this meal:
      <button
        :style="{'opacity':visible?1:0}"
        v-on:click="subtractMealQty"
        class="mealQtyButton"
      >-</button>
      {{returnMealQty}}
      <button class="mealQtyButton" v-on:click="addMealQty">+</button>
    </div>
    <div v-if="returnMealName==''" id="nameWarning">Give your meal a name using the input above!</div>
    <div
      v-if="mealContent==false && returnMealName.length>0"
    >Add ingredients to your meal using the search bar!</div>

    <li v-for="(ingredient,index) in returnIngredients" :key="ingredient.index">
      <button id="removeIngredientButton" v-on:click="returnIngredients.splice(index, 1)">x</button>
      <div>
        <div class="ingredientName">{{ ingredient.name }}</div>

        <div id="recipeAmount">
          <button class="recipeButton" v-on:click="changeRecipeQty(index, -1)">-1</button>
          <button class="recipeButton" v-on:click="changeRecipeQty(index, -0.5)">-1/2</button>
          {{ingredient.recipeAmt}}
          <button
            class="recipeButton"
            v-on:click="changeRecipeQty(index, 0.5)"
          >+1/2</button>
          <button class="recipeButton" v-on:click="changeRecipeQty(index, 1)">+1</button>
        </div>
      </div>
      Total: {{ingredient.servingAmt *ingredient.recipeAmt }} {{ingredient.servingUnit}} {{ingredient.index}}
    </li>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "IngredientListDisplay",
  data() {
    return {
      visible: false,
      mealHasName: false,
      mealNameInput: "",
      mealCount: "",
      mealContent: false
    };
  },
  methods: {
    ...mapMutations([
      "ADD_MEAL_QTY",
      "SUBTRACT_MEAL_QTY",
      "CHANGE_SERVING_QTY",
      "ADD_NEW_MEAL",
      "PREVIOUS_MEAL",
      "DELETE_MEAL",
      "CHANGE_MEAL_NAME"
    ]),
    subtractMealQty: function() {
      this.SUBTRACT_MEAL_QTY();
    },
    addMealQty: function() {
      this.ADD_MEAL_QTY();
    },

    changeRecipeQty: function(index, operator) {
      this.CHANGE_SERVING_QTY({ index: index, operator: operator });
    },
    changeCurrentMeal: function(operator) {
      this.CHANGE_CURRENT_MEAL(operator);
    },
    addNewMeal: function() {
      this.ADD_NEW_MEAL();
    },
    previousMeal: function() {
      this.PREVIOUS_MEAL();
    },
    deleteMeal: function() {
      this.DELETE_MEAL();
    },
    changeMealName: function(name) {
      this.CHANGE_MEAL_NAME(name);
      this.mealNameInput = null;
    }
  },

  computed: {
    ...mapGetters([
      "returnIngredients",
      "returnMealQty",
      "returnCurrentMeal",
      "returnMealName",
      "returnMealArray",
      "returnMealArrayLength"
    ])
  },
  watch: {
    returnMealQty: function() {
      if (this.returnMealQty > 1) {
        this.visible = true;
      } else if ((this.returnMealQty = 1)) {
        this.visible = false;
      }
    },
    returnMealName: function() {
      if (this.returnMealName == "") {
        this.mealHasName = false;
      } else {
        this.mealHasName = true;
      }
    },
    returnCurrentMeal: function() {
      this.mealCount = this.returnCurrentMeal;
    },
    returnMealArrayLength: function() {
      if (this.returnMealArrayLength == 0) {
        this.mealContent = false;
      } else {
        this.mealContent = true;
      }
    }
  }
};
</script>

<style scoped>
@keyframes slide-in {
  0% {
    opacity: 0%;
    transform: rotateX(-90deg);
    transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
  }
  100% {
    opacity: 1;
    transform: none;
    transition: all 0.5s cubic-bezier(0.36, -0.64, 0.34, 1.76);
  }
}
.mealQtyButton {
  padding: 0;
  border: none;
  background: none;
  font-size: 1.25rem;
  font-weight: bolder;
  margin-bottom: 6px;
}
li {
  text-align: left;
  margin-left: 5px;
  list-style: none;
  padding: 2px;
  margin-top: 6px;
  background-color: whitesmoke;
  border-style: solid;
  border-width: 2px;
  width: 480px;
  animation: slide-in 0.5s;
}

#mealNumber {
  padding-bottom: 5px;
}

#recipeAmount {
  margin-left: 65%;
  vertical-align: center;
}

p {
  width: 300px;
  text-align: center;
  margin-left: 100px;
  margin-bottom: -10px;
  font-size: 1.5em;
  font-weight: bold;
  text-transform: capitalize;
  vertical-align: middle;
}

#nameWarning {
  margin-top: -30px;
}

#changeButtons {
  vertical-align: middle;
}

#previousRecipeButton {
  float: left;
  margin-left: 5px;
}

#nextRecipeButton {
  float: right;
  margin-right: 5px;
}

#nameInput {
  margin: 15px;
  height: 20px;
  font-size: 1.25em;
  width: 200px;
}

#nutrientDisplay {
  margin-bottom: 5%;
}

.ingredientName {
  float: left;
  text-transform: capitalize;
  text-emphasis: weight;
}
#removeIngredientButton {
  float: left;
  padding: 0;
  border: none;
  background: none;
  font-size: 1.5rem;
  margin-right: 4px;
}

#nameSubmit {
  vertical-align: middle;
  width: fit-content;
  height: 30px;
}

#nameInput {
  vertical-align: middle;
}

.recipeButton {
  padding-left: 4px;
  background: none;
  font-weight: bolder;
}
</style>

