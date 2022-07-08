const Product =require("../model/product")
const jwt=require("jsonwebtoken")




 const getProducts = async (req, res, next) => {
    jwt.verify(req.headers.authorization , "secretkey",(err, authData) => {
        if(err) {
          console.log(err)
          return res.sendStatus(403)
        } 
        else {
        return res.send({
            message: 'Product list',authData
        }
        )}
         
        })

  try {
    let productlist = await Product.find()
   console.log(productlist)
   res.json(productlist)
   } catch (err) {
     console.log(err.message)
  }
        
  } ;

 const createProduct =  (req, res, next) => {
    jwt.verify(req.headers.authorization , "secretkey",(err, authData) => {
        if(err) {
          console.log(err)
          return res.sendStatus(403)
        } 
        else {
        return res.send({
            message: `product added`,authData
        }
        )}
         
        })


    const image = req.file.path
   
    const newProduct = Product({
        name: req.body.name,
        desc: req.body.desc,
        quantity: req.body.quantity,
        unit_price: req.body.unit_price,
        image:image,
        
    });
    
    newProduct
        .save()
        .then(() => res.send(`New Product added: ${newProduct.name}`))
        .catch((err) => console.log(err));
};

 const getProduct = (req, res, next) => {

    jwt.verify(req.headers.authorization , "secretkey",(err, authData) => {
        if(err) {
          console.log(err)
          return res.sendStatus(403)
        } 
        else {
        return res.send({
            message: `product list`,authData
        }
        )}
         
        })

    const id = req.params.id;
    Product.findById(id).then((product) => {
       res.send(product);
   });
};

 const deleteProduct = (req, res, next) => {
    jwt.verify(req.headers.authorization , "secretkey",(err, authData) => {
        if(err) {
          console.log(err)
          return res.sendStatus(403)
        } 
        else {
        return res.send({
            message: 'Product deleted',authData
        }
        )}
         
        })


    const id = req.params.id;
    Product.findById(id)
        .then((product) => {
            product.delete();
            res.send(` Product : ${product.name} is deleted`);
        })
        .catch((err) => {
            console.log(err);
        });
};

 const updateProduct = (req, res, next) => {
  
    jwt.verify(req.headers.authorization , "secretkey",(err, authData) => {
        if(err) {
          console.log(err)
          return res.sendStatus(403)
        } 
        else {
        return res.send({
            message: 'Product updated',authData
        }
        )}
         
        })

    const id = req.params.id;
    Product.findById(id).then((_product) => {
        Product.updateOne(
            { _id: Product._id },
            {
                name: req.body.name,
                desc: req.body.desc,
                quantity: req.body.quantity,
                unit_price: req.body.unit_price
    
            }
        )
            .then(() => {
                res.send(` product with id : ${id} updated `);
            })
            .catch((err) => console.log(err));
    });
};
module.exports = { getProducts, createProduct, deleteProduct ,updateProduct,getProduct};