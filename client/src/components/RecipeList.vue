<script setup lang="ts">
import { ref, reactive, onMounted, type Ref, watch, onActivated} from 'vue';
import { useRouter, useRoute } from 'vue-router'

import axios from 'axios'
const recipes: Ref<{id: number, name: string, lastupdated: Date, ingredients: string, directions: string}[]> = ref([]);
const router = useRouter();

onMounted(async () => {
    await refreshData()
}) 

async function remove(id: any) {
    try {
        const response = await axios.delete('http://localhost:3000/recipes-api/recipes/' + id)
    }
    catch(err) {
        console.error('Error fetching data:', err);
    }

    await refreshData()
}

function edit(id: any) {
  console.log(id)
  router.push('/edit/' + id);
}

async function refreshData() {
    try {
        const response = await axios.get('http://localhost:3000/recipes-api/recipes')
        recipes.value = response.data
        console.log(response.data)
    }
    catch(err) {
        console.error('Error fetching data:', err);
    }
}

</script>

<template>
<div class="row justify-content-center">
    <div class="col-8">
    <RouterLink to="/create">Add</RouterLink>
    <h2>Saved Recipes</h2>
    
    <div class="list-group" v-for="(recipe) in recipes">
        <a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" :data-bs-target="'#recipeModal' + recipe.id">
            {{ recipe.name }}
        </a>
        
        <div class="modal fade" :id="'recipeModal' + recipe.id" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"> {{ recipe.name }}</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <p>Ingredients:<br> 
                        
                            {{ recipe.ingredients }} </p>
                        <p>Directions: <br>
                            {{ recipe.directions }}</p>
                    </div>
                    <div class="modal-footer">
                        <p class="modal-title"><small>Last updated: {{ recipe.lastupdated }}</small></p>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(recipe.id)" >Delete</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="edit(recipe.id)" >Edit</button>

                        <!-- <RouterLink to="/edit" class="btn btn-primary" data-bs-dismiss="modal" :recipe="recipe">Edit</RouterLink> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


</template>
