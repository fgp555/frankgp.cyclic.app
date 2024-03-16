/* 
CarritoCompra.test.js
npx jest --watchAll challenge-testing/tests/CarritoCompra.test.js
 */

const CarritoCompra = require("../index.js");
// const CarritoCompra = require('./carritoCompra');

describe("CarritoCompra", () => {
  let carrito;

  beforeEach(() => {
    carrito = new CarritoCompra();
  });

  test("agregarProducto añade un producto al carrito", () => {
    const producto = { nombre: "Producto 1", precio: 10 };
    carrito.agregarProducto(producto);
    expect(carrito.productos.length).toBe(1);
    expect(carrito.productos[0]).toBe(producto);
  });

  test("calcularTotal calcula correctamente el total de la compra", () => {
    const productos = [
      { nombre: "Producto 1", precio: 10 },
      { nombre: "Producto 2", precio: 20 },
      { nombre: "Producto 3", precio: 30 },
    ];
    productos.forEach((producto) => carrito.agregarProducto(producto));
    expect(carrito.calcularTotal()).toBe(60);
  });

  test("aplicarDescuento aplica el descuento correctamente", () => {
    const productos = [
      { nombre: "Producto 1", precio: 10 },
      { nombre: "Producto 2", precio: 20 },
    ];
    productos.forEach((producto) => carrito.agregarProducto(producto));
    const porcentajeDescuento = 10; // 10%
    const totalConDescuento = carrito.aplicarDescuento(porcentajeDescuento);
    expect(totalConDescuento).toBe(27); // 10% de descuento en $30 (total de la compra)
  });
});
