import { Router } from "express";
import ProductManager from "../class/ProductManager.js";
const router = Router();

const productManager = new ProductManager("./products.json");

router.get("/", async (request, response) => {
  let { limit } = request.query;
  let products = await productManager.getProducts(limit);
  response.send({ products });
});

router.get("/:pid", async (request, response) => {
  let { pid } = request.params;
  let res = await productManager.getProductById(pid);
  res?.error
    ? response.status(404).send({ ...res })
    : response.status(200).send({ product: res });
});

router.post("/", async (request, response) => {
  let res = await productManager.addProduct(request.body);
  res?.error
    ? response.status(400).send({ ...res })
    : response.status(200).send({ res });
});

router.put("/:pid", async (request, response) => {
  let { pid } = request.params;
  let res = await productManager.updateProduct(parseInt(pid), request.body);
  res?.error
  ? response.status(400).send({ ...res })
  : response.status(200).send({ product: res });
});

router.delete("/:pid", async (request, response) => {
  let { pid } = request.params;
  let res = await productManager.deleteProduct(parseInt(pid));
  res?.error
    ? response.status(404).send({ ...res })
    : response.status(200).send({ res });
});

export default router;
