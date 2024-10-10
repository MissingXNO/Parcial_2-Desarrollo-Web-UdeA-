import { getFoodFormData, displayFoods, displayMessage } from './domUtils.js'; // PENDIENTE
import foodService from './foodService.js';                                     //PENDIENTE

let localFoods = []; // Copia local de los alimentos para no realizar GET en cada momento (El endpoint genera una estructura aleatoria en cada refresco :/ lo que cambiaría los elementos consultados y borraría los agregados/modificados por el usuario)

document.getElementById('consultar-btn').addEventListener('click', async () => {
    const foods = await foodService.getFoods(); // Obtener de la API
    localFoods = foods; // GuARDASR EN LA COPIA LOCAL
    displayFoods(foods, 'food-results');
});

document.getElementById('add-food-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newFood = getFoodFormData('add-food-form');
    const result = await foodService.addFood(newFood); // Mandar nuevo alimento a la API
    if (result.success) {
        localFoods.push(newFood); // Actualizar copia local (nuevamnte, consultar la API producirá que se genere una lista de alimentos aleatoria, entonces SI se realizan POST y PUT pero no se consultan las actualizacione mediante GET)
        displayMessage('Alimento agregado correctamente.');
        displayFoods(localFoods, 'food-results'); //mostrar lista actualizada
    }
    else{
        displayMessage('Alimento YA EXISTE'); 
    }
});

document.getElementById('modify-food-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const modFood = getFoodFormData('modify-food-form');
    const result = await foodService.modifyFood(modFood); // modificar el alimento en la API
    if (result.success) {
        // actualizar la copia local
        const index = localFoods.findIndex(food => food.name.toLowerCase() === modFood.name.toLowerCase());
        if (index !== -1) {
            localFoods[index] = { ...localFoods[index], ...modFood }; 
            displayMessage('Alimento modificado correctamente.');
            displayFoods(localFoods, 'food-results'); //lista actualizada
        }
    } else {
        displayMessage('No se encontró un alimento con ese nombre.');
    }
});
