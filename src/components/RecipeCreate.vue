<script setup lang="ts">
import { mergeProps, onMounted, ref, type Ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
const recipes: Ref<{name: string, lastUpdated: Date, ingredients: string, directions: string}[]> = ref([]);
const router = useRouter();
onMounted(() => {
    recipes.value = JSON.parse(localStorage.getItem("recipes")!) || [];
    console.log(recipes.value)
}) 

const recipeName: Ref<string> = ref('')
const recipeIngredients: Ref<string> = ref('')
const recipeDirections: Ref<string> = ref('')

function submit() {
    let newRecipe = {
        name: recipeName.value,
        lastUpdated: new Date(),
        ingredients: recipeIngredients.value,
        directions: recipeDirections.value,
    }
    recipes.value.push(newRecipe)
    localStorage.setItem('recipes', JSON.stringify(recipes.value))
    router.push('/')
}

function reset() {
    recipeName.value = ''
    recipeIngredients.value = ''
    recipeDirections.value = ''
}

</script>

<template>
<form @submit="submit">
<div class="row justify-content-center">
    <div class="col-6">
        <div class="mb-3">
            <label for="recipeNameInput" class="form-label">My Recipe</label>
            <input required type="text" v-model="recipeName" class="form-control" id="recipeNameInput">
        </div>
        <div class="mb-3">
            <label for="recipeIngredientsInput" class="form-label">Ingredients</label>
            <textarea required v-model="recipeIngredients" class="form-control" id="recipeIngredientsInput" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label for="recipeDirectionsInput" class="form-label">Directions</label>
            <textarea required v-model="recipeDirections" class="form-control" id="recipeDirectionsInput" rows="3"></textarea>
        </div>
    </div>
</div>
<div class="row justify-content-center">
    <div class="col-3">
        <button class="btn btn-primary" type="submit">Submit</button>
    </div>
    <div class="col-3">
        <button class="btn btn-danger" @click="reset()">Reset</button>
    </div>
</div> 
</form>
</template>