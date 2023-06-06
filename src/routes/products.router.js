import express from 'express';
import ProductManager from '../productManager.js';
import { ProductService } from '../services/products.service.js';
/* import { uploader } from '../utils.js'; */

const container = new ProductManager('./src/data/products.json');

const Service = new ProductService();

export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  /* try {
    const limit = req.query.limit;
    const products = await container.getProducts();
    if (limit) {
      return res.status(200).json(products.slice(0, limit));
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    console.log(error);
  } */
  try {
    const products = await Service.getAll();
    return res.status(200).json({
      status: 'success',
      msg: 'listado de productos',
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.get('/:id', async (req, res) => {
  /* try {
    const id = req.params.id;
    const product = await container.getProductById(parseInt(id));

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(400).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
  } */
  try {
    const { id } = req.params;
    const product = await Service.getOneById(id);
    return res.status(200).json({
      status: 'success',
      msg: 'listado de productos',
      data: product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.post(
  '/',
  /* uploader.single('file'), */ async (req, res) => {
    /* try {
      const product = req.body;
      // product.thumbnail = 'http://localhost:8080' + req.file.filename;
      const result = await container.addProduct(product);
      return res.status(201).json({ message: result });
    } catch (error) {
      console.log(error);
    } */
    try {
      const { title, description, price, thumbnail, code, stock, category, status } = req.body;

      const productCreated = await Service.createOne(title, description, price, thumbnail, code, stock, category, status);
      return res.status(201).json({
        status: 'success',
        msg: 'product created',
        data: productCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
  }
);

productsRouter.put('/:id', async (req, res) => {
  /* try {
    const modifyProduct = req.body;
    if (modifyProduct.id) {
      return res.status(400).json({ error: 'Can not change ID' });
    }

    const id = req.params.id;
    const result = await container.updateProduct(parseInt(id), modifyProduct);
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
  } */
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;

    const productUptaded = await Service.updateOne(id, title, description, price, thumbnail, code, stock, category, status);

    return res.status(201).json({
      status: 'success',
      msg: 'product uptaded',
      data: productUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  /* try {
    const id = req.params.id;
    const result = await container.deleteProduct(parseInt(id));
    return res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
  } */
  try {
    const { id } = req.params;

    const deleted = await Service.deleteOne(id);
    return res.status(200).json({
      status: 'success',
      msg: 'product deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});
