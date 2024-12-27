// config/database.js
class InMemoryDB {
  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.sequences = { users: 1, products: 1 };
  }

  // Helper method to get next ID for a collection
  getNextId(collection) {
    return this.sequences[collection]++;
  }
}
// Create a singleton instance
const db = new InMemoryDB();
module.exports = db;
