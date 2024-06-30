const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;


app.use(cors());


app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'muneeb12',
    database: 'restaurant_management'
});

db.connect(err => {
   try{
    if(err){
        throw err;
    }
    console.log('MySQL Connected...');
   }

    catch(e){
        console.log("Error ha connection mai");
        console.log(e);
    }
  
         
    
});

// CRUD operations for Customer
app.get('/customers', (req, res) => {
    console.log("Custumer k doara get request bheji gaie ha");
    const sql = 'SELECT * FROM Customer';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Result yai ha :" + results);
        res.send(results);

    });
});

app.post('/customers', (req, res) => {
    console.log("Post ki request aie ha...");
    const { name, address, contactNo } = req.body;
    const sql = 'INSERT INTO Customer (Name, Address, ContactNo) VALUES (?, ?, ?)';
    db.query(sql, [name, address, contactNo], (err, result) => {
        if (err) throw err;
        res.send("Ok ki report ha");
    });
});

app.post('/waiters', (req, res) => {
    const { name , role ,email } = req.body;
    const sql = 'INSERT INTO Waiter (Name , Role , Email) VALUES (? , ? , ?)';
    db.query(sql, [name , role , email], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/customers/:id', (req, res) => {
    const { name, address, contactNo } = req.body;
    const sql = 'UPDATE Customer SET Name = ?, Address = ?, ContactNo = ? WHERE ID = ?';
    db.query(sql, [name, address, contactNo, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/customers/:id', (req, res) => {
    const sq2 = 'DELETE FROM Orders WHERE CustomerID = ?';
    const sq1 = 'DELETE FROM Customer WHERE ID = ?';
   

    try{
        db.query(sq2, [req.params.id], (err, result) => {
        
            try{
             if(err){
                 throw err;
     
             }
             db.query(sq1, [req.params.id], (err, result) => {
                 if (err) throw err;
                 res.send(result);
             });
            //  res.send(result);
            
     
            }
             catch(e){
                 console.log("Error ha connection mai");
                 console.log(e);
             }
             
         });
    }
    catch(e){
        db.query(sq1, [req.params.id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }
});

// CRUD operations for Order
app.get('/order', (req, res) => {
    const sql = 'SELECT * FROM Orders';
    db.query(sql, (err, results) => {
        try{
            if (err){
                throw err;
            }
            res.send(results);
        }
        catch(e){
            console.log("Error ha connection mai");
            console.log(e);
        }
    });
});

app.post('/order', (req, res) => {
    const { customerID, totalAmount, paymentStatus, price } = req.body;
    const sql = 'INSERT INTO Orders (CustomerID, TotalAmount, PaymentStatus, Price , Location) VALUES (?, ?, ?, ?)';
   try{
    db.query(sql, [customerID, totalAmount, paymentStatus, price , Location], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            res.status(500).send('Error inserting order');
        } else {
            console.log('Order added successfully');
            res.status(200).send('Order added successfully');
        }
    });
   }
   catch(e){

   }
});


app.put('/order/:id', (req, res) => {
    const { noOfItems, customerID } = req.body;
    const sql = 'UPDATE Orders SET NoOfItems = ?, CustomerID = ? WHERE OrderNo = ?';
    db.query(sql, [noOfItems, customerID, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/order/:id', (req, res) => {
    const sql = 'DELETE FROM Orders WHERE OrderNo = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// CRUD operations for Bill
app.get('/bills', (req, res) => {
    const sql = 'SELECT * FROM Bill';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/bills', (req, res) => {
    const { price, orderID, customerID } = req.body;
    const sql = 'INSERT INTO Bill (Price, OrderID, CustomerID) VALUES (?, ?, ?)';
    db.query(sql, [price, orderID, customerID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/bills/:id', (req, res) => {
    const { price, orderID, customerID } = req.body;
    const sql = 'UPDATE Bill SET Price = ?, OrderID = ?, CustomerID = ? WHERE BillNo = ?';
    db.query(sql, [price, orderID, customerID, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/bills/:id', (req, res) => {
    const sql = 'DELETE FROM Bill WHERE BillNo = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// CRUD operations for Manager
app.get('/managers', (req, res) => {
    const sql = 'SELECT * FROM Manager';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/managers', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO Manager (Name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/managers/:id', (req, res) => {
    const { name } = req.body;
    const sql = 'UPDATE Manager SET Name = ? WHERE ID = ?';
    db.query(sql, [name, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/managers/:id', (req, res) => {
    const sql = 'DELETE FROM Manager WHERE ID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// CRUD operations for Waiter
app.get('/waiters', (req, res) => {
    const sql = 'SELECT * FROM Waiter';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});



app.put('/waiters/:id', (req, res) => {
    const { name } = req.body;
    const sql = 'UPDATE Waiter SET Name = ? WHERE ID = ?';
    db.query(sql, [name, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/waiters/:id', (req, res) => {
    const sql = 'DELETE FROM Waiter WHERE ID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// CRUD operations for Chef
app.get('/chefs', (req, res) => {
    const sql = 'SELECT * FROM Chef';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/chefs', (req, res) => {
    const { name  , role , email} = req.body;
    const sql = 'INSERT INTO Chef (Name , Role , Email) VALUES (? , ? , ?)';
    db.query(sql, [name , role , email], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/chefs/:id', (req, res) => {
    const { name } = req.body;
    const sql = 'UPDATE Chef SET Name = ? WHERE ID = ?';
    db.query(sql, [name, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/chefs/:id', (req, res) => {
    const sql = 'DELETE FROM Chef WHERE ID = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE email = ?';
    
    db.query(sql, [email], (err, results) => {
        if (err) throw err;
        
        if (results.length > 0 && results[0].password === password) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.get('/api/sales', (req, res) => {
    const sql = 'SELECT transaction_date, total_amount, transaction_count, avg_transaction_value, food_sales, beverage_sales FROM sales';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


app.get('/feedback-stats', (req, res) => {
    const query = `
      SELECT 
        SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) AS positive_feedback,
        SUM(CASE WHEN rating < 4 THEN 1 ELSE 0 END) AS negative_feedback
      FROM feedback;
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching feedback data' });
        return;
      }
      res.json(results[0]);
    });
  });
  
  app.get('/feedback', (req, res) => {
    const query = `
      SELECT 
        customer_name, feedback_text, rating, date_submitted
      FROM feedback
      ORDER BY date_submitted DESC;
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching feedback data' });
        return;
      }
      res.json(results);
    });
  });
  

  app.post('/menus', (req, res) => {
    const { name, description, price, category } = req.body;
    const sql = 'INSERT INTO Menu (Name, Description, Price, Category) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, category], (err, result) => {
        if (err) {
            console.error('Error adding menu item:', err);
            res.status(500).send('Error adding menu item');
        } else {
            console.log('Menu item added successfully');
            res.status(200).send('Menu item added successfully');
        }
    });
});


app.get('/menus', (req, res) => {
    const sql = 'SELECT * FROM Menu';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching menu items:', err);
            res.status(500).send('Error fetching menu items');
        } else {
            res.status(200).json(results);
        }
    });
});


app.delete('/menus/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const sql = 'DELETE FROM Menu WHERE ItemID = ?';
    db.query(sql, itemId, (err, result) => {
        if (err) {
            console.error('Error deleting menu item:', err);
            res.status(500).send('Error deleting menu item');
        } else {
            console.log(`Menu item with ItemID ${itemId} deleted successfully`);
            res.status(200).send(`Menu item with ItemID ${itemId} deleted successfully`);
        }
    });
});




app.listen(port, () => {
    console.log("Server started on port " +  port);
});