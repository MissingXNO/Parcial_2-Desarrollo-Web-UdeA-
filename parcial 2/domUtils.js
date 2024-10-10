export function getFoodFormData(formId) {           //obtener el form del dom
    const form = document.getElementById(formId);  //buscar y obtener el elemento del formulario correspondiente al ID pasado como argumento 
    return {
        name: form.querySelector('input[id$="name"]').value.trim(), //trim para quitar espacios en blanco al rededor del nombre
        description: form.querySelector('input[id$="description"]').value.trim(),//trim para quitar espacios en blanco al rededor del nombre
        image: form.querySelector('input[id$="image"]').value.trim(),//trim para quitar espacios en blanco al rededor del nombre
        ingredients: form.querySelector('input[id$="ingredients"]').value.trim().split(',').map(ingredient => ingredient.trim()) // Separar ingredientes y elimina espacios (notese que la separación por comas se tiene en cuenta también como un criteriod e entrada de ingredientes para el usuario. Es decir este deberá también separarlos por comas)
    };      //devolver lo introducido en el formulario para agregar o modificar.
}

export function displayMessage(message) {
    alert(message);
}

export function displayFoods(foods, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar el contenido anterior (sea la copia o el obtenido mediante GET)
    foods.forEach(food => {
        const listItem = document.createElement('li'); //listar elementos obtenidod (verificar CSS y HTML para ver como se despliegan)
        listItem.innerHTML = `
            <h3>${food.name}</h3>
            <img src="${food.image}" alt="${food.name}" style="width: 100px; height: 100px;">
            <p>${food.description}</p>
            <p>Ingredientes: ${food.ingredients.join(', ')}</p>
        `;
        container.appendChild(listItem); // Añadir cada alimento a la lista
    });
}
