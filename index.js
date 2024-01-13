const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      this.productIdCounter = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    } catch (error) {
          this.saveProducts();
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(productData) {
    const newProduct = {
      id: this.productIdCounter++,
      ...productData,
    };

    this.products.push(newProduct);
    this.saveProducts();
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

  updateProduct(id, updatedProductData) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      this.products[index] = { id, ...updatedProductData };
      this.saveProducts();
      console.log("Producto actualizado con éxito");
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log("Producto eliminado con éxito");
    } else {
      console.log("Producto no encontrado");
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: "Producto 1",
  description: "Descripción 1",
  price: 20.5,
  thumbnail: "imagen1.jpg",
  code: "P001",
  stock: 10
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción 2",
  price: 30.0,
  thumbnail: "imagen2.jpg",
  code: "P002",
  stock: 15
});

console.log(productManager.getProducts());

const productIdToUpdate = 2;
productManager.updateProduct(productIdToUpdate, { price: 25.0 });

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);

console.log(productManager.getProducts());

