const express = require('express');
const { mongoose } = require('mongoose');
const cors = require("cors")

require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;

main().then(()=> console.log("MongoDB connect succesfully")).catch(err => console.log(err));

// middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookstore-git-main-harshit-mauryas-projects.vercel.app', 'https://bookstore-5ejr6vxqp-harshit-mauryas-projects.vercel.app'],
    credentials: true
}))


// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats')

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Hello World!')
      })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})