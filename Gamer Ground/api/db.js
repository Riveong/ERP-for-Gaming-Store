// server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';


const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your SvelteKit app's URL
  }));

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'gamerground',
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/api/products', (req, res) => {
    const query = 'SELECT id, name, category, addedDate, thumbnail, price, description FROM barang';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server Error');
        return;
      }
  
      // Convert the BLOB data to Base64 string
      const products = results.map(row => ({
        ...row,
        thumbnail: row.thumbnail ? `data:image/png;base64,${row.thumbnail.toString('base64')}` : null
      }));
  
      res.json(products);
    });
  });

  app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;  // Get the product id from the URL
    const query = 'DELETE FROM barang WHERE id = ?';  // SQL query to delete the product
  
    // Execute the query
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);  // Log the error if the query fails
        res.status(500).send('Server Error');
        return;
      }
  
      if (result.affectedRows === 0) {
        // If no rows were affected, the product with the given id doesn't exist
        res.status(404).send('Product not found');
        return;
      }
  
      // Send a success message when the product is successfully deleted
      res.send(`Product with id ${productId} deleted successfully`);
    });
  });

  app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, category, price, addedDate, thumbnail, description } = req.body;
  
    let base64Data = null;
    
    // Convert Base64 thumbnail to buffer if provided
    if (thumbnail) {
      base64Data = thumbnail.replace(/^data:image\/\w+;base64,/, "");
      base64Data = Buffer.from(base64Data, 'base64');
    }
  
    console.log(req.body);  // Log the incoming request body
  
    const query = `
      UPDATE barang 
      SET name = ?, category = ?, price = ?, addedDate = ?, thumbnail = ?, description = ?
      WHERE id = ?`;
  
    const values = [name, category, price, addedDate, base64Data, description, productId];
  
    // Execute the query
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Server Error');
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).send('Product not found');
        return;
      }
  
      res.send(`Product with id ${productId} updated successfully`);
    });
  });
  
  

  
  app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT id, name, category, addedDate, thumbnail, price FROM barang WHERE id = ?';
  
    db.query(query, [productId], (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server Error');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('Product not found');
        return;
      }
  
      // Convert the BLOB data to Base64 string for the single product
      const product = {
        ...results[0],
        thumbnail: results[0].thumbnail ? `data:image/png;base64,${results[0].thumbnail.toString('base64')}` : null
      };
  
      res.json(product);
    });
  });
  

  app.get('/api/products/category/:category', (req, res) => {
    const productCategory = req.params.category;
    const query = 'SELECT id, name, category, addedDate, thumbnail, price FROM barang WHERE category = ?';
  
    db.query(query, [productCategory], (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server Error');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('No products found for this category');
        return;
      }
  
      // Convert the BLOB data to Base64 string for all products
      const products = results.map(row => ({
        ...row,
        thumbnail: row.thumbnail ? `data:image/png;base64,${row.thumbnail.toString('base64')}` : null
      }));
  
      res.json(products); // Send an array of products
    });
  });
  
  app.get('/api/products/name/:name', (req, res) => {
    const productName = req.params.name;
    const query = 'SELECT id, name, category, addedDate, thumbnail, price FROM barang WHERE name LIKE ?';
  
    // Use '%' wildcards to match any part of the name
    const searchQuery = `%${productName}%`;
  
    db.query(query, [searchQuery], (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server Error');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('No products found matching the name');
        return;
      }
  
      // Convert the BLOB data to Base64 string for all products
      const products = results.map(row => ({
        ...row,
        thumbnail: row.thumbnail ? `data:image/png;base64,${row.thumbnail.toString('base64')}` : null
      }));
  
      res.json(products); // Send an array of products
    });
  });
  

app.get('/api/detail', (req, res) => {
  let id = req.query.id;

  // Use a parameterized query to prevent SQL injection
  const query = 'SELECT id, name, category, addedDate, thumbnail, price, description FROM barang WHERE id = ?';

  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).send('Server Error');
          return;
      }

      // Convert the BLOB data to Base64 string
      const products = results.map(row => ({
          ...row,
          thumbnail: row.thumbnail ? `data:image/png;base64,${row.thumbnail.toString('base64')}` : null
      }));

      res.json(products);
  });
});

 
app.post('/api/products', (req, res) => {

  const { name, category, addedDate, thumbnail, price, description } = req.body;
  const base64Data = req.body.thumbnail.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');
  // Validate input data
  if (!name || !category || !addedDate || !thumbnail || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  // Database insertion logic
  const query = 'INSERT INTO barang (name, category, addedDate, thumbnail, price, description) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, category, addedDate, buffer, price, description];

  db.query(query, values, (err, result) => {
    if (err) {
        console.error('Error inserting item into database:', err);
        return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
});
});

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [productId], (err, result) => {
      if (err) {
          console.error('Error retrieving item from database:', err);
          return res.status(500).json({ error: 'Database error' });
      }

      if (result.length > 0) {
          res.status(200).json(result[0]);
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  });
});

app.get('/api/receipts', (req, res) => {
  const query = 'SELECT id, name, userId, category, date, item FROM receipt ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server Error');
      return;
    }

    // Convert the BLOB data to Base64 string
    const products = results.map(row => ({
      ...row,
    }));

    res.json(products);
  });
});

app.post('/api/receipts', (req, res) => {
  const { name, userId, category, date, item, price } = req.body; // Destructure the incoming data

  const query = 'INSERT INTO receipt (name, userId, category, date, item, price) VALUES (?, ?, ?, ?, ?, ?)';

  // Execute the query with the provided values
  db.query(query, [name, userId, category, date, item, price], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server Error');
      return;
    }

    res.status(201).send('Receipt added successfully');
  });
});



app.get('/api/receipts/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM receipt WHERE id = ?';
  db.query(query, [productId], (err, result) => {
      if (err) {
          console.error('Error retrieving item from database:', err);
          return res.status(500).json({ error: 'Database error' });
      }

      if (result.length > 0) {
          res.status(200).json(result[0]);
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  });
});


// Sign-Up Endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error querying the database:', err); // Log the error
      return res.status(500).json({ message: 'Database query error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
      if (err) {
        console.error('Error inserting into the database:', err); // Log the error
        return res.status(500).json({ message: 'Database insertion error' });
      }

      res.status(201).json({ message: 'User created successfully' });
    });
  });
});



// Sign-In Endpoint
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  // Query the database to find the user by email
  db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error querying the database:', err); // Log the error for debugging
      return res.status(500).json({ message: 'Database query error' });
    }

    // Check if user was found in the database
    if (results.length === 0) {
      console.log('Invalid email');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0]; // Get the user data from the query results

    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Log success and return userId
    console.log('Login successful for user:', user.name);
    res.status(200).json({ message: 'Sign in successful', userId: user.name, Id: user.id });
  });
});

// Endpoint to fetch website performance metrics
app.get('/api/admin/website-performance', (req, res) => {
  const start = Date.now();

  // Simulate a simple response to calculate response time
  res.status(200).json({
    message: 'Website performance metrics',
    loadTime: `${Date.now() - start} ms` // This is a simple load time metric
  });
});

// Endpoint to fetch the total number of receipts
app.get('/api/admin/total-receipts', (req, res) => {
  const query = 'SELECT COUNT(*) as totalReceipts FROM receipt';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching receipts:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      totalReceipts: result[0].totalReceipts
    });
  });
});

// Endpoint to fetch the total number of items
app.get('/api/admin/total-items', (req, res) => {
  const query = 'SELECT COUNT(*) as totalItems FROM barang';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      totalItems: result[0].totalItems
    });
  });
});

  // Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


