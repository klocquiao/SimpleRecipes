<script setup lang="ts">
import { mergeProps, onMounted, ref, type Ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import RecipeForm from './RecipeForm.vue'

const router = useRouter();
const route = useRoute();
const recipeId = ref('');
const recipe: Ref<{id: number, name: string, lastupdated: Date, ingredients: string, directions: string} | null> = ref(null);
const isRecipe = ref(false);

onMounted(async () => {
    recipeId.value = route.params.id as string

    try {
        const response = await axios.get('http://localhost:3000/recipes-api/recipes/' + recipeId.value)
        recipe.value = response.data
        isRecipe.value = true
    }
    catch(err) {
        console.error('Error fetching data:', err);
}}) 

async function submit(newRecipe: any) {
    console.log(newRecipe)

    try {
        const response = await axios.put('http://localhost:3000/recipes-api/recipes/' + recipeId.value, newRecipe)
        console.log(response.data)
        router.push('/')
    }
    catch(err) {
        console.error('Error fetching data:', err);
    }
}

</script>

<template>
    <div>
      <RecipeForm :recipe="recipe" @submit="submit" v-if="isRecipe" />
    </div>
</template>