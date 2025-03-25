const pool = require("./pool");

async function getAllItems() {
  const query = {
    text: "SELECT * FROM items",
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function getItemById(id) {
  const query = {
    text: "SELECT * FROM items WHERE item_id=$1",
    values: [id],
  };
  const { rows } = await pool.query(query);
  console.log(rows[0]);
  return rows[0];
}

async function getItemsByCategory(categoryId) {
  const query = {
    text: `
        SELECT
            i.item_id,
            name,
            description
        FROM "items" AS i
        INNER JOIN "items_categories" AS ic
            ON i.item_id = ic.item_id
        WHERE ic.category_id = $1;`,
    values: [categoryId],
  };
  const { rows } = await pool.query(query);
  console.log(rows);
  return rows;
}

async function insertItem(item) {
  const query = {
    text: `
        INSERT INTO Items ("name", "description", "price", "stock")
        VALUES ($1, $2, $3, $4)
        RETURNING item_id;
        `,
    values: [item.name, item.description, item.price, item.stock],
  };
  const { rows } = await pool.query(query);
  const id = rows[0];
  console.log(id);
  return id;
}

async function updateItem(item, itemId) {
  console.log("updateItem");
  const query = {
    text: `
            UPDATE Items
            SET name = $1, description = $2, price = $3, stock = $4
            WHERE item_id = $5;
        `,
    values: [item.name, item.description, item.price, item.stock, itemId],
  };
  await pool.query(query);
}

async function getAllCategories() {
  const query = {
    text: "SELECT * FROM categories",
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function getCategoryById(id) {
  const query = {
    text: "SELECT * FROM categories WHERE category_id=$1",
    values: [id],
  };
  const { rows } = await pool.query(query);
  console.log(rows[0]);
  return rows[0];
}

async function getCategoriesByItem(itemId) {
  const query = {
    text: `
            SELECT c.category_id, name
                FROM "categories" AS c
            INNER JOIN "items_categories" AS ic
                ON c.category_id = ic.category_id
            WHERE ic.item_id = $1;
        `,
    values: [itemId],
  };
  const { rows } = await pool.query(query);
  console.log(rows);
  return rows;
}

async function getCategoryIdsByItem(itemId) {
  const query = {
    text: `
            SELECT c.category_id
                FROM "categories" AS c
            INNER JOIN "items_categories" AS ic
                ON c.category_id = ic.category_id
            WHERE ic.item_id = $1; 
        `,
    values: [itemId],
  };
  const { rows } = await pool.query(query);
  console.log(rows);
  return rows;
}

async function insertCategory(category) {
  const query = {
    text: `
            INSERT INTO Categories ("name", "description_heading", "description")
            VALUES ($1, $2, $3);
        `,
    values: [category.name, category.descriptionHeading, category.description],
  };
  await pool.query(query);
}

async function insertRelationItemCategory(itemId, categoryId) {
  console.log("insertRelationItemCategory");
  const query = {
    text: `
            INSERT INTO Items_Categories (item_id, category_id)
            VALUES ($1, $2);
        `,
    values: [itemId, categoryId],
  };
  await pool.query(query);
}

async function removeRelationItemCategory(itemId) {
  console.log("removeRelationItem");
  const query = {
    text: `
            DELETE FROM Items_Categories
            WHERE item_id = $1;
        `,
    values: [itemId],
  };
  await pool.query(query);
}

module.exports = {
  getAllItems,
  getItemById,
  getItemsByCategory,
  insertItem,
  updateItem,
  getAllCategories,
  getCategoryById,
  getCategoriesByItem,
  getCategoryIdsByItem,
  insertCategory,
  insertRelationItemCategory,
  removeRelationItemCategory,
};
