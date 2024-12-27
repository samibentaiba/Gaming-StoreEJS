// models/User.js
const bcrypt = require("bcryptjs");
const db = require("../config/database");

class User {
  static async findOne(query) {
    return Array.from(db.users.values()).find(
      (user) =>
        (query.email && user.email === query.email) ||
        (query.username && user.username === query.username) ||
        (query._id && user._id === query._id),
    );
  }

  static async findById(id) {
    return db.users.get(id);
  }

  constructor(userData) {
    this._id = db.getNextId("users");
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.role = userData.role || "user";
    this.createdAt = new Date();
  }

  async save() {
    if (!this.password.startsWith("$2")) {
      // Check if password is not already hashed
      this.password = await bcrypt.hash(this.password, 10);
    }
    db.users.set(this._id, this);
    return this;
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

module.exports = User;
