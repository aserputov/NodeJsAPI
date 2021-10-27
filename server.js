const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/model");
const bodyParser = require("body-parser")
const app = new express();
const stripe = require('stripe')('sk_test_16DB2bD5GOxhLlXuzV2jMSsw00E31uvZqK')
var cors = require("cors");
require("dotenv").config();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/", (req, res) => {
//   let query = { Category: "Compotes" };
  Product.find((error, blogpost) => {
    console.log(error);
    res.json(
      "GO AWAY BOIIIII THIS API IS FOR PRIVATE SCHOOL BOYS - Anatoliy Serputov 2000 "
    );
  });
});

app.post('/create-checkout-session', async (req, res) => {
  // const {totalPrice} = req.body;
  const totalPrice = req.body.totalPrice;
  const total = totalPrice.totalPrice.toFixed(2)
  console.log(total)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'CAD',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount_decimal: total* 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/',
    cancel_url: 'http://localhost:3000/',
  });

  res.json({ id: session.id });
});

app.get("/all", (req, res) => {
 
  Product.find((error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});

app.get("/compotes", (req, res) => {
  let query = { Category: "Compotes" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/picklesreadymeals", (req, res) => {
  let query = { Category: "Pickles & Ready Meals" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/lemonade", (req, res) => {
  let query = { Category: "Lemonade" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/sauces", (req, res) => {
  let query = { Category: "Sauces" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/honey", (req, res) => {
  let query = { Category: "Honey" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/preservesjams", (req, res) => {
  let query = { Category: "Preserves & Jams" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/seasoningspices", (req, res) => {
  let query = { Category: "Seasonings & Spices" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/snacks", (req, res) => {
  let query = { Category: "Snacks" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/flour", (req, res) => {
  let query = { Category: "Flour" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});
app.get("/cheese", (req, res) => {
  let query = { Category: "Cheese" };
  Product.find(query, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost });
  });
});







// app.get("/add", (req, res) => {
//     Product.updateMany({}, { $set: { Discount: "5" } });   
//   });
  
app.get("/result", (req, res) => {
   let name = req.query.name;

  

   let q = { Name: name};
  Product.find(q, (error, blogpost) => {
    console.log(error);
    res.json({ blogpost }); 
  });
});

app.get("/sample/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((param) => {
      if (param) {
        res.status(201).json(param);
      } else {
        res.status(204).json({ message: "Data was not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("App listening on port 4000");
});

// Product.create({
//     Name: "Anatoliy",
//     Category: "Category",
//     Price: 20.00,
//     SmallDesc: "String",
//     LongDesc: "String",
//     Quantity: "20",
//     Size: "huge",
//     Img:["https://nena.ge/uploads/Product/gallery/219551587723059.jpg","https://nena.ge/uploads/Product/gallery/219971587723061.jpg","https://nena.ge/uploads/Product/gallery/513721587723064.jpg"],
// }, (error, blogpost) =>{
//         console.log(error,blogpost)
//     })

//     Product.find({ Img:"[]" }).remove((error, blogpost) =>{ console.log(error,blogpost)
//         res.json( {blogpost});
// })
//     let query = { Category: 'Compotes' };
//     Product.remove((error, blogpost) =>{ console.log(error,blogpost)
//         res.json( {blogpost});
// })
