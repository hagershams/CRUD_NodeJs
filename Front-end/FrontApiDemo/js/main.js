//Define the ProductsList and Id
let ProductsList =[];
let result=[];
let DoById;
//Default Fetch .... to Get-All-Products
function GetFetch(){
    fetch('http://localhost:8080/GetAllProducts')
    .then(response => response.json())
    .then(res => {console.log(res)
        if(res.message == "Done"){
            ProductsList = res.data;
            DisplayData();
        }
    })
}
GetFetch();
//Displaying Data on Table
function DisplayData(){
    let listData;
    for (let i = 0; i < ProductsList.length; i++) {
        listData += `
        <tr>
            <td>${ProductsList[i].Name}</td>
            <td>${ProductsList[i].Price}</td>
            <td>${ProductsList[i].Description}</td>
            <td>
                <button class="btn btn-danger" 
                onclick="DeleteProduct(${ProductsList[i].id})">Delete</button>
                <button class="btn btn-warning" 
                onclick="UpdateProduct(${ProductsList[i].id})">Update</button>
            </td>
        </tr>` 
    }
    document.getElementById("tbody").innerHTML=listData;
}
//Display After Search
function DisplayDataAfterSearch(r){
    let listData;
    listData = `
        <tr>
            <td>${r.Name}</td>
            <td>${r.Price}</td>
            <td>${r.Description}</td>
            <td>
                <button class="btn btn-danger" 
                onclick="DeleteProduct(${r.id})">Delete</button>
                <button class="btn btn-warning" 
                onclick="UpdateProduct(${r.id})">Update</button>
            </td>
        </tr>
    ` 
    document.getElementById("tbody").innerHTML=listData;
    document.getElementById("tbody").classList.remove("d-none")
}
//Custom Fetch 
function CustomFetch (endpoint,method,data){
    fetch(`http://localhost:8080/${endpoint}`,{
    method : method,
    headers :{
        "Content-Type" :"application/json"},
    body : JSON.stringify(data)})
    .then(response=>{response.json()})
    .then(res=>{console.log(res)
            GetFetch();
    })
}
//Definig Sent Values to DB from Entered Data by user
function DefineValues (){
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productDesc = document.getElementById("productDesc").value;
    let NewProduct = {
        id:DoById,
        Name:productName,
        Price:productPrice,
        Description:productDesc}
    return NewProduct;
}
//Clear the Form
function clearForm(){
    document.getElementById("productName").value = ''
    document.getElementById("productPrice").value =''
    document.getElementById("productDesc").value =''
}
//Delete Product
function DeleteProduct(id){
    console.log(id)
    CustomFetch('DeleteProduct','DELETE',{id});
}
//Add Product
function AddProduct(){
    CustomFetch('AddProduct','POST',DefineValues())
    clearForm()
}
//Update Product
function UpdateProduct(id){
    DoById = id;
    let product = ProductsList.filter(ele=> ele.id ==DoById)[0]
    WriteUpdates(product)
    ADDtoUPDATE()
}
//Turn Add Button to Update Button
function ADDtoUPDATE(){
    document.getElementById("add").classList.add("d-none")
    document.getElementById("update").classList.add("d-block")
}
//Turn the Update Button to Add Button
function UPDATEtoADD(){
    CustomFetch('UpdateProductByPut','PUT',DefineValues())
    document.getElementById("add").classList.remove("d-none")
    document.getElementById("update").classList.remove("d-block")
    clearForm()
}
//Display Specific Product on the Form ... to be updated
function WriteUpdates (x){
    document.getElementById("productName").value =x.Name
    document.getElementById("productPrice").value =x.Price
    document.getElementById("productDesc").value =x.Description
}
//Search For Update
function Searching(){
    document.getElementById("tbody").classList.add("d-none")
    document.getElementById("package").classList.add("d-none")
    document.getElementById("add").classList.add("d-none")
    document.getElementById("done").classList.remove("d-none")
    document.getElementById("update").classList.add("d-none")
    let RproductName =document.getElementById("productName").value ;
    let producttt = {
        Name : RproductName}
    fetch('http://localhost:8080/SearchProduct',{
    method : 'POST',
    headers :{
        "Content-Type" :"application/json"},
    body : JSON.stringify(producttt)})
    .then(response => {console.log(response);
        response.json()})
    .then(fetch('http://localhost:8080/SearchProduct')
        .then(response => response.json())
        .then(res => {console.log(res)
            if(res.message == "Done"){
                result = res.data;
                result = result[0]
                console.log(result);
                DisplayDataAfterSearch(result)}
        })
    )
}
//Turn Back
function turnback(){
GetFetch()
document.getElementById("package").classList.remove("d-none")
clearForm();
document.getElementById("add").classList.remove("d-none")
document.getElementById("done").classList.add("d-none")
document.getElementById("update").classList.remove("d-none")
//document.getElementById("datatable").classList.remove("d-none")
}