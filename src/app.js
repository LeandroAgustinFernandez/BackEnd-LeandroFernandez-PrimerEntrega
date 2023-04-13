import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send(`<h1>Bienvenido a la tienda de productos</h1>`);
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
