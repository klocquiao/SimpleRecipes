<script setup lang="ts">
import { ref, reactive, onMounted, type Ref, watch } from 'vue';

const recipes: Ref<{name: string, lastUpdated: Date, ingredients: string, directions: string}[]> = ref([]);

onMounted(() => {
    recipes.value = JSON.parse(localStorage.getItem("recipes")!) || [];
    console.log(recipes.value)
}) 

</script>

<template>
<div class="row justify-content-center">
    <div class="col-8">
    <RouterLink to="/create" :recipes="recipes">Add</RouterLink>
    <h2>Saved Recipes</h2>
    
    <div class="list-group" v-for="(recipe, index) in recipes" :key="recipe.name">
        <a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" :data-bs-target="'#recipeModal' + index">
            {{ recipe.name }}
        </a>
        

        <div class="modal fade" :id="'recipeModal' + index" tabindex="-1" aria-hidden="true">
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
                        <p class="modal-title"><small>Last updated: {{ recipe.lastUpdated }}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


</template>