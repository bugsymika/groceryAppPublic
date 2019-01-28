<template>
  <div v-if="this.render == true">
    <h1>Copy and paste each box into an email to save your lists!</h1>

    <div id="flex">
      <div class="box">
        <shopping-list/>
      </div>
      <div class="box">
        <recipes/>
      </div>
    </div>
    <button v-on:click="changeDoneStateFalse">Return?</button>
  </div>
</template>

<script>
import ShoppingList from "./ShoppingList.vue";
import Recipes from "./Recipes.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "DoneScreen",
  data() {
    return {
      render: false
    };
  },
  components: {
    ShoppingList,
    Recipes
  },
  computed: {
    ...mapGetters(["returnDone"])
  },
  watch: {
    returnDone: function() {
      if (this.returnDone == true) {
        this.render = true;
      } else {
        this.render = false;
      }
    }
  },
  methods: {
    ...mapMutations(["CHANGE_DONE_STATE"]),
    changeDoneStateFalse: function() {
      this.CHANGE_DONE_STATE(false);
    }
  }
};
</script>

<style scoped>
.box {
  height: 500px;
  width: 500px;
  background-color: antiquewhite;
  border-style: solid;
  border-width: 4px;
  border-color: black;
  overflow: scroll;
  margin-left: 20px;
}

#flex {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}
</style>


