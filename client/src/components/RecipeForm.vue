<script setup lang="ts">
import { defineProps, onMounted, ref, type Ref, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import RecipeForm from './RecipeForm.vue'

// const recipes: Ref<{name: string, lastUpdated: Date, ingredients: string, directions: string}[]> = ref([]);
const props = defineProps(['recipe'])
const emit = defineEmits(['submit'])
const ingredients: Ref<{id: number, name: string}[]> = ref([]);

const recipeName: Ref<string> = ref(props.recipe?.name || '')
const recipeIngredients: Ref<number[]> = ref(props.recipe?.ingredients || [0])
const recipeDirections: Ref<string> = ref(props.recipe?.directions || '')

onMounted(async () => {
    await getIngredients()
}) 


async function getIngredients() {
    try {
        const response = await axios.get('http://localhost:3000/ingredients-api/ingredients')
        ingredients.value = response.data
        console.log(response.data)
    }
    catch(err) {
        console.error('Error fetching data:', err);
    }
}
async function submit() {    
    const newRecipe = {
            name: recipeName.value,
            lastUpdated: new Date().toISOString().split('T')[0],
            ingredients: recipeIngredients.value,
            directions: recipeDirections.value,
    }

    emit('submit', newRecipe);
}

function addIngredientSelect() {
    recipeIngredients.value.push(0)
    console.log(recipeIngredients)
}

function removeIngredientSelect(index: number) {
    recipeIngredients.value.splice(index, 1)
    console.log(recipeIngredients)
}

function reset() {
    recipeName.value = ''
    recipeIngredients.value = [0]
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
        <label class="form-label">Ingredients</label>
        <div class="mb-3">
            <div class="mb-2" v-for="(item, index) in recipeIngredients">
                <select v-model="recipeIngredients[index]" class="form-select mb-1"  aria-label="Default select example">
                    <option v-for="ingredient in ingredients" :value="ingredient.id">
                        {{ ingredient.name }}
                    </option>
                </select>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeIngredientSelect(index)">Remove</button>
            </div>
         </div>
         <button type="button" class="btn btn-secondary" @click="addIngredientSelect()">Add</button>

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
        <button class="btn btn-danger" type="button" @click="reset()">Reset</button>
    </div>
</div> 
</form>
</template>