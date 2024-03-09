<script setup lang="ts">
import { defineProps, onMounted, ref, type Ref, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import RecipeForm from './RecipeForm.vue'

// const recipes: Ref<{name: string, lastUpdated: Date, ingredients: string, directions: string}[]> = ref([]);
const props = defineProps(['recipe'])
const emit = defineEmits(['submit'])

const recipeName: Ref<string> = ref(props.recipe?.name || '')
const recipeIngredients: Ref<string> = ref(props.recipe?.ingredients || '')
const recipeDirections: Ref<string> = ref(props.recipe?.directions || '')


async function submit() {    
    const newRecipe = {
            name: recipeName.value,
            lastUpdated: new Date().toISOString().split('T')[0],
            ingredients: recipeIngredients.value,
            directions: recipeDirections.value,
    }

    emit('submit', newRecipe);
}

function reset() {
    recipeName.value = ''
    recipeIngredients.value = ''
    recipeDirections.value = ''
}

</script>

<template>
<form @submit.prevent="submit">
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