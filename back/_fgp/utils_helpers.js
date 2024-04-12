// server.js

const express = require('express');
const app = express();
const port = 3000;

// Datos de ejemplo (simulación de una base de datos en memoria)
let users = [
    { id: 1, name: 'Usuario 1' },
    { id: 2, name: 'Usuario 2' },
    { id: 3, name: 'Usuario 3' }
];

// utils.js

// Función para validar datos de usuario
function validateUser(user) {
    return user && typeof user === 'object' && 'id' in user && 'name' in user;
}

// Función para formatear respuestas JSON
function formatResponse(status, message, data = null) {
    return { status, message, data };
}

// helpers.js
// Función para generar un ID único
function generateUniqueId() {
    return Math.floor(Math.random() * 1000000);
}

// Middleware para el parsing del body en las solicitudes POST
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// Ruta para obtener un usuario por su ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json(formatResponse('error', 'Usuario no encontrado'));
    }
    res.json(formatResponse('success', 'Usuario encontrado', user));
});

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (!validateUser(newUser)) {
        return res.status(400).json(formatResponse('error', 'Datos de usuario no válidos'));
    }
    newUser.id = generateUniqueId(); // Generar un ID único para el nuevo usuario
    users.push(newUser);
    res.status(201).json(formatResponse('success', 'Usuario creado correctamente', newUser));
});

// Ruta para actualizar un usuario existente
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    let found = false;
    users = users.map(user => {
        if (user.id === userId) {
            found = true;
            return { ...user, ...updateUser };
        }
        return user;
    });
    if (!found) {
        return res.status(404).json(formatResponse('error', 'Usuario no encontrado'));
    }
    res.json(formatResponse('success', 'Usuario actualizado correctamente'));
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json(formatResponse('success', 'Usuario eliminado correctamente'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
