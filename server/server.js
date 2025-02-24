// Import
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { readdirSync } = require('fs');
const path = require('path'); // เพิ่มการ import path

const app = express();

connectDB();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// ให้บริการไฟล์ static จากโฟลเดอร์ processed
app.use('/processed', express.static(path.join(__dirname, 'processed')));

// ----------- Routes Start --------------

// Example Route 1
// app.get('/product', (rea, res, next) => {
//     res.send('Hello Product Endpoint')   
// })

// Example Route 2
// app.use('/api', productRouter )
// app.use('/api', authRouter )

// Example Route 3
readdirSync('./routes')
  .map((r) => app.use('/api', require('./routes/' + r)));

// ----------- Routes End -----------------

app.listen(5000, () => console.log('Server is running on port 5000'));