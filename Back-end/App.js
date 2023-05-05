const express = require('express')
const mysql2 = require('mysql2')
const fs = require('fs')
const cors = require('cors')

//Invoking 
const app = express()
//creating port
let port=8080;
let SearchName;
//Creating Database Connection
const query = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ass5"
})


//Middleware
app.use(express.json())

//Allowing Access To any Front-end to connect This Back-end Codes
app.use(cors())



//Welcoming Home Page
let Home = fs.readFileSync('./Home.html'); //For Welcome Page
app.get('/',(req,res)=>{
    res.write(Home);
})





//.......................................Products APIs............................................

/* For Postman Check : use this raw data :
{
    "Name": "dj",
    "Description": "Good",
    "price": 1500
}
*/

//.......................................Products APIs............................................



//Get All Products
app.get('/GetAllProducts',(req,res)=>{
    query.execute(`select * from products` , (err,data)=>{
        return res.json({message:"Done",data})
    })

})

//Add Product
app.post('/AddProduct',(req,res)=>{
    let {Name , Description, Price}=req.body;
    query.execute(`insert into products (Name , Description, Price) values ("${Name}",
    "${Description}",${Price})`,(err,data)=>{
    return res.json({message:"Done",data})})}
)

//Search For Product
app.post('/SearchProduct',(req,res)=>{
    let {Name} = req.body;
    SearchName=Name;
    query.execute(`select * from products where Name="${Name}"` , (err,data)=>{
        return res.json({message:"Done",data})
    })
})

/*app.post('/SearchProduct',(req,res)=>{
    let {Name} = req.body
    app.get('/SearchProduct',(req,res)=>{
        query.execute(`select * from products where Name="${Name}"` , (err,data)=>{
            return res.json({message:"Done",data})
        })
    })
})*/
app.get('/SearchProduct',(req,res)=>{
    query.execute(`select * from products where Name="${SearchName}"` , (err,data)=>{
        return res.json({message:"Done",data})
    })
})



//Update Product using PUT
app.put('/UpdateProductByPut', (req,res)=>{
    let {id, Name , Description, Price}= req.body;
    query.execute(`update products set Name ="${Name}" ,Price="${Price}",
    Description="${Description}" where id= "${id}"` , (err,data)=>{
        if (data && data.affectedRows == 0){
            return res.json("Cannot Update as Entered Product not Exists!")}
        else{
            return res.json({message:"Done",data})}
    })
})





//Delete Product using (request.body)
app.delete('/DeleteProduct', (req,res)=>{
    let {id} = req.body;
    query.execute(`delete from products where id= "${id}"` , (err,data)=>{
        if (data && data.affectedRows == 0){
            return res.json({message : "Cannot Delete as Product not Exist!"})
        }
        else{
            console.log(data)
            return res.json({message:"Done",data})
        }
    })
})


app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`);
})