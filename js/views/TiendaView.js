export class TiendaView {
  constructor() {
    this.listaCarrito = document.getElementById("listaCarrito");
    this.contador = document.getElementById("contadorCarrito");
    this.total = document.getElementById("totalCarrito");
    this.modal = document.getElementById("modalCarrito");
    this.catalogo = document.getElementById("catalogoProductos");
  }

  renderCatalogo(productos, onAgregar) {
    if (!this.catalogo) return;
    this.catalogo.innerHTML = "";
    productos.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="rounded-xl mb-4 w-full">
        <h4 class="text-xl font-bold text-blue-300">${p.nombre}</h4>
        <p class="text-gray-400 mb-2">Experiencia única para gamers.</p>
        <span class="text-green-400 font-semibold block mb-3">$${p.precio.toLocaleString()}</span>
        <button class="btn-success" data-index="${i}">🛒 Agregar</button>
      `;
      this.catalogo.appendChild(div);
    });

    // Delegación segura de eventos
    this.catalogo.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', () => onAgregar(parseInt(btn.dataset.index)));
    });
  }

  actualizarCarrito(items, total, onEliminar) {
    if (!this.listaCarrito || !this.contador || !this.total) return;
    this.listaCarrito.innerHTML = "";
    items.forEach((p, i) => {
      const row = document.createElement('div');
      row.className = 'flex justify-between bg-gray-800 p-3 rounded-lg items-center';
      row.innerHTML = `
        <span>${p.nombre}</span>
        <span>$${p.precio.toLocaleString()}</span>
        <button class="text-red-400 hover:text-red-500 font-bold" data-index="${i}">X</button>
      `;
      this.listaCarrito.appendChild(row);
    });

    this.total.textContent = "$" + total.toLocaleString();
    this.contador.textContent = `(${items.length})`;

    this.listaCarrito.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', () => onEliminar(parseInt(btn.dataset.index)));
    });
  }

  mostrarModal() { if (this.modal) this.modal.classList.remove("hidden"); }
  ocultarModal() { if (this.modal) this.modal.classList.add("hidden"); }
}
