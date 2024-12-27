// models/Product.js
const db = require("../config/database");

class Product {
  static async find() {
    return Array.from(db.products.values()).sort(
      (a, b) => b.createdAt - a.createdAt,
    );
  }

  static async findById(id) {
    return db.products.get(Number(id));
  }

  constructor(productData) {
    this._id = db.getNextId("products");
    this.title = productData.title;
    this.description = productData.description;
    this.price = Number(productData.price);
    this.category = productData.category;
    this.imageUrl = productData.imageUrl || "default-product.jpg";
    this.stock = Number(productData.stock);
    this.createdAt = new Date();
  }

  async save() {
    db.products.set(this._id, this);
    return this;
  }
}

module.exports = Product;
