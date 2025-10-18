// Asegúrate que la ruta sea exactamente: js/controllers/TiendaController.js
import { Producto } from "../models/Producto.js";
import { Carrito } from "../models/Carrito.js";
import { TiendaView } from "../views/TiendaView.js";

export default class TiendaController {
  constructor() {
    this.view = new TiendaView();
    this.carrito = new Carrito();
    this.productos = [
      new Producto("Call of Duty: Black Ops 6", 249000, "https://image.api.playstation.com/vulcan/ap/rnd/202405/2921/4b45cf4b319a65e05f6e4f87a22c7b91d2e7e8aeb247b61f.png"),
      new Producto("Elden Ring: Shadow of the Erdtree", 199000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCikZGI-UtBNrJY-wK1DVxbLyhCEvxRm4Fig&s"),
      new Producto("Spider-Man 2", 269000, "https://juegosdigitalescolombia.com/files/images/productos/1697557642-marvels-spider-man-2-ps5-pre-orden-0.jpg")
    ];
  }

  init() {
    this.view.renderCatalogo(this.productos, this.agregarProducto.bind(this));
    this.configurarEventos();
  }

  configurarEventos() {
    const btnVer = document.getElementById("verCarrito");
    if (btnVer) btnVer.addEventListener("click", () => this.view.mostrarModal());
    const btnCerrar = document.getElementById("cerrarCarrito");
    if (btnCerrar) btnCerrar.addEventListener("click", () => this.view.ocultarModal());
    const btnFinal = document.getElementById("finalizarCompra");
    if (btnFinal) btnFinal.addEventListener("click", () => this.finalizarCompra());
    const btnGTA = document.getElementById("btnGTA");
    if (btnGTA) btnGTA.addEventListener("click", () => this.agregarProductoDestacado());
  }

  agregarProducto(index) {
    this.carrito.agregar(this.productos[index]);
    this.actualizarVista();
    this.animarBoton();
  }

  agregarProductoDestacado() {
    const gta = new Producto("Grand Theft Auto VI", 299000, "https://i.blogs.es/1ca280/trailer-1-illustration-16x9-/450_1000.jpg");
    this.carrito.agregar(gta);
    this.actualizarVista();
    this.animarBoton();
  }

  eliminarProducto(index) {
    this.carrito.eliminar(index);
    this.actualizarVista();
  }

  actualizarVista() {
    const total = this.carrito.calcularTotal();
    this.view.actualizarCarrito(this.carrito.items, total, this.eliminarProducto.bind(this));
  }

  finalizarCompra() {
    if (this.carrito.items.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    alert("✅ ¡Compra realizada con éxito!");
    this.carrito.vaciar();
    this.actualizarVista();
    this.view.ocultarModal();
  }

  animarBoton() {
    const btn = document.getElementById("verCarrito");
    if (!btn) return;
    btn.classList.add("scale-110");
    setTimeout(() => btn.classList.remove("scale-110"), 200);
  }
}
