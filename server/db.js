const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'medico.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize Tables
db.serialize(() => {
    // Products Table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        model TEXT,
        description TEXT,
        image TEXT,
        price REAL,
        in_stock BOOLEAN DEFAULT 1,
        is_new BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Migration: Add is_new column if it doesn't exist
    db.run("ALTER TABLE products ADD COLUMN is_new BOOLEAN DEFAULT 0", (err) => {
        if (err) {
            console.log("Migration (is_new): " + err.message);
        } else {
            console.log("Migration (is_new): Success");
        }
    });

    // Inquiries Table
    db.run(`CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seed Data if empty
    db.get("SELECT count(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            console.log("Seeding initial products...");
            const products = [
                {
                    name: "Digital X-Ray System",
                    category: "medical",
                    model: "DR-X500",
                    description: "High-resolution digital radiography with wireless flat panel detector.",
                    price: 45000,
                    image: "./Assets/products/xray.jpg"
                },
                {
                    name: "Vital Sign Monitor",
                    category: "medical",
                    model: "VS-800",
                    description: "Multiparameter patient monitor with 12.1 inch touchscreen display.",
                    price: 2500,
                    image: "./Assets/products/monitor.jpg"
                },
                {
                    name: "Surgical Robot Arm",
                    category: "surgery",
                    model: "SR-2000",
                    description: "Precision robotic assistance for minimally invasive laparoscopic procedures.",
                    price: 150000,
                    image: "./Assets/products/robot.jpg"
                },
                {
                    name: "Hematology Analyzer",
                    category: "laboratory",
                    model: "HA-300",
                    description: "Automated 5-part differential hematology analyzer for high-volume labs.",
                    price: 12000,
                    image: "./Assets/products/analyzer.jpg"
                },
                {
                    name: "ICU Electric Bed",
                    category: "other",
                    model: "EB-900",
                    description: "Fully adjustable electric hospital bed with integrated weighing scale.",
                    price: 3200,
                    image: "./Assets/products/bed.jpg"
                },
                {
                    name: "Infrared Thermometer",
                    category: "medical",
                    model: "IR-50",
                    description: "Contactless clinical thermometer with 1-second response time.",
                    price: 45,
                    image: "./Assets/products/thermometer.jpg"
                }
            ];

            const insert = db.prepare("INSERT INTO products (name, category, model, description, price, image) VALUES (?, ?, ?, ?, ?, ?)");
            products.forEach((p) => {
                insert.run(p.name, p.category, p.model, p.description, p.price, p.image);
            });
            insert.finalize();
            console.log("Seeded " + products.length + " products.");
        }
    });
});

module.exports = db;
