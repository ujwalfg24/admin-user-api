const bcrypt =require("bcrypt")
const User =require('../model/user')
const Product =require('../model/product')
const jwt =require('jsonwebtoken')

const postLogin = async (req, res, next) => { try {
    const { email, password ,role} = req.body;

    const validUser = await User.find({ email: email ,role: role});

    const matched = await bcrypt.compare(password, validUser[0].password);
    if (matched) {
        let token = jwt.sign({email:req.body.email}, 'secretkey');
        res.send({message:"sucess",data:{token}});
      
    } else {
        res.json({ message: "Password not matched" });
    }
    
}
catch (err){
    console.log(err);
    res.status(500).json({message : "something went wrong"})
};

}




const postRegister = async (req, res, next) => {
    const { fname,lname,email,role, password }= req.body;
    if (
        fname.length < 1 ||
        lname.length < 1 ||
         email.length < 1 ||
         password.length < 1 ||
         role.length < 1 
       
    ) {
        return res.status(400).json( {
            message: "Invalid Name or Password did not match",
        });}
    const alreadyUser = await User.find({ email: email });
    if (alreadyUser.length > 0) {
        return res.status(400).json({ message: "Already registered user, login" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User ({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        role:  req.body.role,
        password: hashPass,
       
    });
    newUser
        .save()
        .then(() => {
           return res.status(201).json({ message: "Registered successfully, login" });
        })
        .catch((err) => console.log(err));
};

const customerLogin = async (req, res, next) => { try {
    const { email, password ,role} = req.body;

    const validUser = await User.find({ email: email ,role: role});

    const matched = await bcrypt.compare(password, validUser[0].password);
    if (matched) {
       res.send({message: "sucessfully logged in"})
      
    } else {
        res.json({ message: "Password not matched" });
    }
    
}
catch (err){
    console.log(err);
    res.status(500).json({message : "something went wrong"})
};

}


const customerRegister = async (req, res, next) => {
    const { fname,lname,email,role, password }= req.body;
    if (
        fname.length < 1 ||
        lname.length < 1 ||
         email.length < 1 ||
         password.length < 1 ||
         role.length < 1 
       
    ) {
        return res.status(400).json( {
            message: "Invalid Name or Password did not match",
        });}
    const alreadyUser = await User.find({ email: email ,role:role });
    if (alreadyUser.length > 0 ) {
        return res.status(400).json({ message: "Already registered customer, login" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User ({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        role:  req.body.role,
        password: hashPass,
       
    });
    newUser
        .save()
        .then(() => {
           return res.status(201).json({ message: "Registered successfully, login" });
        })
        .catch((err) => console.log(err));
};













function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') { 

      const bearer = bearerHeader.split(' ');

      const bearerToken = bearer[1];
      req.token = bearerToken;  

      next();

    } else {
      res.sendStatus(403);
    }
  
  }








const getProducts = async (req, res, next) => {

  try {
    let productlist = await Product.find()
   console.log(productlist)
   res.json(productlist)
  } catch (err) {
    console.log(err.message)
  }
        
  } ;


  const createProduct =  (req, res, next) => {
   
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

 


 const deleteProduct = (req, res, next) => {
  
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








module.exports = {
  
    getProducts,
    postLogin,
    postRegister,
    customerRegister,
    customerLogin,
    verifyToken,
    createProduct, 
    deleteProduct ,
    updateProduct
   
   
};