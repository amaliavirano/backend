class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

 
    if (this.products.some(product => product.code === code)) {
      console.log("El código del producto ya existe");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    console.log("Producto agregado con éxito");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const foundProduct = this.products.find(product => product.id === id);

    if (foundProduct) {
      return foundProduct;
    } else {
      console.log("Producto no encontrado");
    }
  }
}


const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Descripción 1", 20.5, "imagen1.jpg", "P001", 10);
productManager.addProduct("Producto 2", "Descripción 2", 30.0, "imagen2.jpg", "P002", 15);

console.log(productManager.getProducts());

const productIdToFind = 2;
const foundProduct = productManager.getProductById(productIdToFind);
console.log(foundProduct);

