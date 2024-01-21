const express = require("express");
const ProductManager = require("./index");

const PORT = 5000;
const API_BASE_PATH = "/api";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const productManager = new ProductManager('productos.json');

app.get(`${API_BASE_PATH}/products`, (req, res) => {
  const limit = parseInt(req.query.limit);
  const allProducts = productManager.getProducts();

  if (isNaN(limit) || limit <= 0) {
    res.json({ products: allProducts });
  } else {
    const limitedProducts = allProducts.slice(0, limit);
    res.json({ products: limitedProducts });
  }
});

app.get(`${API_BASE_PATH}/products/:pid`, (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.post(`${API_BASE_PATH}/products`, (req, res) => {
  const productData = req.body; 

  if (!productData) {
    return res.status(400).json({ error: 'Se requieren datos del producto en el cuerpo de la solicitud.' });
  }

  try {
    productManager.addProduct(productData);
    res.json({ success: true, message: 'Producto agregado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});


app.listen(PORT, () => {
  console.log(`API RUNNING, PORT: ${PORT}`);
});
