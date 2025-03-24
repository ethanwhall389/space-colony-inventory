const pool = require('./pool');

async function getAllItems() {
    const query = {
        text: 'SELECT * FROM items',
    }
    const {rows} = await pool.query(query);
    return rows;
}

async function getItemById(id) {
    const query = {
        text: 'SELECT * FROM items WHERE item_id=$1',
        values: [id],
    }
    const {rows} = await pool.query(query);
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
    }
    const {rows} = await pool.query(query);
    console.log(rows);
    return rows;
}

async function getAllCategories() {
    const query = {
        text: 'SELECT * FROM categories',
    }
    const {rows} = await pool.query(query);
    return rows;
}

async function getCategoryById(id) {
    const query = {
        text: 'SELECT * FROM categories WHERE category_id=$1',
        values: [id],
    }
    const {rows} = await pool.query(query);
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
    }
    const {rows} = await pool.query(query);
    console.log(rows);
    return rows;
}

module.exports = {
    getAllItems,
    getItemById,
    getItemsByCategory,
    getAllCategories,
    getCategoryById,
    getCategoriesByItem,
}