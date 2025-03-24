//THE PURPOSE of this file is for quickly and easily setting up the local development
//   database for multiple developers when they join the project, or for resetting the
//   database during development for dev, testing, or other purposes.

require('dotenv').config(); // Load env variables
const {Client} = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS Items (
    item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR (255),
    "description" TEXT,
    "price"  MONEY,
    "stock" SMALLINT,
    "added" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR (255),
    "description_heading" TEXT,
    "description" TEXT
);

CREATE TABLE IF NOT EXISTS Items_Categories (
    items_categories_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_id INT REFERENCES Items(item_id) ON DELETE CASCADE,
    category_id INT REFERENCES Categories(category_id) ON DELETE CASCADE
);

INSERT INTO Items ("name", "description", "price", "stock")
VALUES
    ('Gravity boots', 'Stay fit in zero-G with adjustable resistance and magnetic stabilization.', 150.00, 10),
    ('Oxygen Canister (XL)', 'High-capacity O2 tank with a 72-hour supply. Perfect for spacewalks or unexpected decompression.', 200.00, 35),
    ('Plasma Wrench', 'A multi-tool for repairing spaceships. Works in extreme temperatures and vacuum conditions.', 99.99, 28),
    ('Ion Thruster Fuel Pod', 'Refillable canister for personal ion thrusters (compatible with most models).', 249.99, 18),
    ('Space S''more Kit', 'Flameless heating unit + marshmallows, chocolate, and graham crackers for a taste of Earth.', 20.00, 200),
    ('Holo-Map Navigator', 'Projects 3D star maps and colony blueprints. Voice-controlled with AI assistant.', 349.99, 15);

INSERT INTO Categories ("name", "description_heading", "description")
VALUES
    ('Tools', 'Because even in zero-G, duct tape won''t fix everything.', 'From plasma wrenches to asteroid-mining lasers, our tools are built to withstand cosmic chaos. Perfect for repairs, construction, or improvising your way out of an alien encounter.'),
    ('Navigation', 'Getting lost in space is not a vibe.', 'Holo-maps, quantum compasses, and AI-guided star charts to keep you on course—whether you''re orbiting Mars or dodging asteroid fields.'),
    ('Food', 'Earth flavors, zero-G packaging.', 'Freeze-dried ice cream, hydroponic salad kits, and protein bricks that almost taste like grandma''s cooking. Bon appétit, astronaut!'),
    ('Recreation', 'For when space gets too quiet.', 'Zero-G chess sets, VR simulations of Earth''s beaches, and karaoke helmets (soundproof, thankfully). Because even astronauts need to unwind.'),
    ('First Aid', 'For minor cuts, major decompression, and existential space dread.', 'Nanobot bandages, anti-radiation pills, and emergency serotonin boosters. (Disclaimer: Does not cure "I miss gravity" syndrome.)'),
    ('Wearables', 'Fashion meets function… in a vacuum.', 'Self-heating jumpsuits, magnetic boots, and helmets with built-in TikTok filters. Stay alive and Instagram-ready.');

INSERT INTO Items_Categories (item_id, category_id)
VALUES
    (1, 2),
    (1, 6),
    (2, 5),
    (2, 6),
    (3, 1),
    (4, 2),
    (5, 3),
    (5, 4),
    (6, 2),
    (6, 6);
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        client_encoding: 'UTF8'
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done seeding');
}

main();