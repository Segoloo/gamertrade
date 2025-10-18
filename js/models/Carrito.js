export class Carrito {
  constructor() {
    this.items = [];
  }

  agregar(producto) {
    this.items.push(producto);
  }

  eliminar(index) {
    this.items.splice(index, 1);
  }

  calcularTotal() {
    return this.items.reduce((acc, p) => acc + p.precio, 0);
  }

  vaciar() {
    this.items = [];
  }
}
