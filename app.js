const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//Load Product Route
const Products = require('./app/routes/api/product');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./app/config/keys').mongoURI;

//Connect to mongoose
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("Mongoose Connect") )
.catch(err => console.log(err))


//Use Routes
app.use("/api/products", Products)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
