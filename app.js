let clientes = [];

document.getElementById('formulario1').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    if (clientes.some(cliente => cliente.email === email)) {
        alert('El correo electrónico ya está registrado.');
        return;
    }

    const cliente = {
        id: Date.now(),
        nombre,
        email,
        telefono
    };

    clientes.push(cliente);
    actualizarTabla();
    this.reset();
});

function actualizarTabla() {
    const tbody = document.getElementById('clientes-tbody');
    tbody.innerHTML = '';
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>
                <button onclick="editarCliente(${cliente.id})">Editar</button>
                <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarCliente(id) {
    const cliente = clientes.find(cliente => cliente.id === id);
    if (cliente) {
        document.getElementById('edit-id').value = cliente.id;
        document.getElementById('edit-nombre').value = cliente.nombre;
        document.getElementById('edit-email').value = cliente.email;
        document.getElementById('edit-telefono').value = cliente.telefono;
        document.getElementById('modal-edicion').style.display = 'block';
    }
}

document.getElementById('formulario-edicion').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('edit-id').value);
    const nombre = document.getElementById('edit-nombre').value;
    const email = document.getElementById('edit-email').value;
    const telefono = document.getElementById('edit-telefono').value;

    const cliente = clientes.find(cliente => cliente.id === id);
    if (cliente) {
        if (clientes.some(c => c.email === email && c.id !== id)) {
            alert('El correo electrónico ya está registrado.');
            return;
        }
        cliente.nombre = nombre;
        cliente.email = email;
        cliente.telefono = telefono;
        actualizarTabla();
        cerrarModal();
    }
});

function eliminarCliente(id) {
    clientes = clientes.filter(cliente => cliente.id !== id);
    actualizarTabla();
}

function cerrarModal() {
    document.getElementById('modal-edicion').style.display = 'none';
}