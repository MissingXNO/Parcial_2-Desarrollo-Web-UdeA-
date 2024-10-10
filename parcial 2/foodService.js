let foods = []; // arreglo vacío para almacenar la copia local de lista dealimentos

export default {
    async getFoods() {
        console.log('Realizando solicitud GET a la API...');        // console log para verificar que la comunicacion funcione.
        const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods'); //Endpoint correspondiente a cedulas finalizadas en numero impar
        
        console.log('Código de estado GET:', response.status); 
        if (response.ok) {
            foods = await response.json(); // Guardar la copia local de los alimentos
            console.log('Alimentos obtenidos:', foods); 
            return foods; // Retornar la copia para su manipulacion
        } else {
            console.error('Error al obtener alimentos:', response.statusText);
            return []; // Retornar arreglo vacio si no es posible obtener la lista
        }
    },

    // Funcion de agregar alimentoss nuevos
    async addFood(food) {
        // Validar si el alimento ya existe en la lista local
        const existingFood = foods.find(f => f.name.toLowerCase() === food.name.toLowerCase()); //case sensitiviy
        if (existingFood) {
            console.warn('El alimento ya existe.'); // Advertencia en consola
            return { success: false, message: 'El alimento ya existe.' }; // advertencia al usuario
        }

        console.log('Realizando solicitud POST a la API para agregar alimento...', food);
        const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods', { //fetch.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(food)  //Se manda el json modificado a partir de la modificacion a la copia local
        });

        console.log('Código de estado POST:', response.status); // Muestra el codigo de estado
        if (response.ok) {
            const newFood = await response.json(); // Obtener la respuesta del servidor
            console.log('Alimento agregado:', newFood); // Muestra el alimento agregado
            return { success: true, food: newFood }; 
        } else {
            console.error('Error al agregar alimento:', response.statusText);
            return { success: false };
        }
    },

    // funcion para modificar un alimento existente
    async modifyFood(modifiedFood) {
        console.log('Realizando solicitud PUT a la API para modificar alimento...', modifiedFood);
        const foodIndex = foods.findIndex(f => f.name === modifiedFood.name);
        if (foodIndex !== -1) {
            foods[foodIndex] = { ...foods[foodIndex], ...modifiedFood }; // Actualiza los campos del alimento
            const response = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods/${foods[foodIndex].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foods[foodIndex]), // Envía el alimento modificados (por indexacion )a la API 
            });

            console.log('Código de estado PUT:', response.status); // Muestra el código de estado
            if (response.ok) {
                console.log('Alimento modificado:', foods[foodIndex]); // Muestra el alimento modificado
                return { success: true };
            } else {
                console.error('Error al modificar alimento:', response.statusText);
                return { success: false };
            }
        } else {
            console.warn('Alimento no encontrado para modificar.');
            return { success: false };
        }
    }
};
