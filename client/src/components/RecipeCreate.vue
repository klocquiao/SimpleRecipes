<script setup lang="ts">
import { mergeProps, onMounted, ref, type Ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import RecipeForm from './RecipeForm.vue'

// const recipes: Ref<{name: string, lastUpdated: Date, ingredients: string, directions: string}[]> = ref([]);
const router = useRouter();

async function submit(newRecipe: any) {
    console.log(newRecipe)

    try {
        const response = await axios.post('http://localhost:3000/recipes-api/recipes', newRecipe)
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
      <RecipeForm @submit="submit" />
    </div>
</template>