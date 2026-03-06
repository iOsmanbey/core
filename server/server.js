const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../')); // Serve static frontend files for simplified full-stack feel

// 1. GET All Products
app.get('/api/products', (req, res) => {
    const { category, search, sort } = req.query;
    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category && category !== 'all') {
        sql += " AND category = ?";
        params.push(category);
    }

    if (search) {
        sql += " AND (name LIKE ? OR description LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }

    if (sort === 'price-asc') sql += " ORDER BY price ASC";
    else if (sort === 'price-desc') sql += " ORDER BY price DESC";
    else if (sort === 'name-asc') sql += " ORDER BY name ASC";
    else if (sort === 'name-desc') sql += " ORDER BY name DESC";
    else sql += " ORDER BY created_at DESC";

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// 2. GET Product by ID
app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// 3. POST Inquiry
app.post('/api/inquiries', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO inquiries (name, email, message) VALUES (?,?,?)";
    const params = [name, email, message];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

// 4. POST Product (Add)
app.post('/api/products', (req, res) => {
    const { name, category, model, description, price, image, is_new } = req.body;
    // Handle object structure from admin (multilingual support pending backend DB schema update, for now use generic/EN)
    const pName = typeof name === 'object' ? name.en : name;
    const pDesc = typeof description === 'object' ? description.en : description;

    // Convert boolean/string to integer 0/1 for SQLite
    const isNewVal = (is_new === true || is_new === 'true' || is_new === 1) ? 1 : 0;

    const sql = "INSERT INTO products (name, category, model, description, price, image, is_new) VALUES (?,?,?,?,?,?,?)";
    const params = [pName, category, model, pDesc, price, image, isNewVal];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": { id: this.lastID } });
    });
});

// 5. DELETE Product
app.delete('/api/products/:id', (req, res) => {
    const sql = "DELETE FROM products WHERE id = ?";
    db.run(sql, req.params.id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

// 6. PUT Product (Update)
app.put('/api/products/:id', (req, res) => {
    const { name, category, model, description, price, image, is_new } = req.body;
    const pName = typeof name === 'object' ? name.en : name;
    const pDesc = typeof description === 'object' ? description.en : description;

    // Convert boolean/string to integer 0/1 for SQLite
    const isNewVal = (is_new === true || is_new === 'true' || is_new === 1) ? 1 : 0;

    let sql = "UPDATE products SET name=?, category=?, model=?, description=?, price=?, is_new=?";
    const params = [pName, category, model, pDesc, price, isNewVal];

    // Only update image if a new one is provided
    if (image && image.length > 0) {
        sql += ", image=?";
        params.push(image);
    }

    sql += " WHERE id=?";
    params.push(req.params.id);

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "updated", changes: this.changes });
    });
});

// Increase payload size limit for base64 images
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
