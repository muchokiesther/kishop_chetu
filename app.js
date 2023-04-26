let cart = []
class Product{
    //deal with a single product

    constructor(product){
        this.product=product
    }

    render(){
        //rendering a single product
        let html = `
        
        <div class="item">
        <img src=${this.product.productImg} alt="${this.product.productName}" >
        <div class="product-item__content">
          <h2>${this.product.productName}</h2>
          <h3> ${this.product.productPrice}</h3>
          <p>${this.product.productDescription}</p>
          <button onclick="new Product().updateProduct(${this.product.id})">update</button>
         <button onclick="new Product().deleteProduct(${this.product.id})" ><ion-icon name="trash-outline"></ion-icon></button>
         <button class ="addtocart" onclick ="new Product().addtocart(${this.product.id})">ADD TO CART</button> 
        </div>
     </div>
        
        `

        return html
    }

 async addtocart(id){
    const response = await fetch(`http://localhost:3000/products/${id}`) //this is used to fetch(get) product by id
    const product = await response.json()
    // const cartResponse1 = await fetch('http://localhost:3000/cart')
    // const prod1 =  await cartResponse1.json()
    
    // const cartResponse = await fetch('http://localhost:3000/cart', { // used to post the product to the cart...
    //     method: 'POST',
    //     body:JSON.stringify(product),

    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
      


    
     const cartsentails = document.createElement('div')
     cartsentails.classList.add('cart-item')
     cartsentails.innerHTML = `
     <div class = 'in_cart'>
    
      <img src=${product.productImg} alt="" >
       <h2>${product.productName}</h2>
       <p id="cart_price"> ${product.productPrice}</p>
        <button class ="remove_cart"  >REMOVE</button>
       </div>
     `

     const cartProductlists = document.querySelector('#cart_lists')
     cartProductlists.appendChild(cartsentails)
     cart.push(product)
     
     const total = document.querySelector('.tprice')
const calculatePrice = cart.reduce(function(acc, curr)  {
    return acc + parseInt(curr.productPrice)},0)

total.textContent=calculatePrice

}
   
    //  let cart = []
    //  const total =  document.querySelector(".tprice")
    //  let quantity = parseInt(product.productPrice)
    // cart.push(quantity)
    // console.log(cart)
    //  if (quantity= product.productPrice) {
    //     quantity = parseInt(quantity)+ parseInt(product.productPrice)
    //     // return quantity;
    //  }

    // quantity = quantity+ parseInt(product.productPrice)
    // total.innerHTML  = quantity 
      
    //          console.log( quantity)    





    async deleteProduct(id) {
        await fetch(`http://localhost:3000/products/${id}`, {
            method:'DELETE',
            headers:{
                "Content-Type": "application/json"
            }
        })
        
    }
    async updateProduct(id){
        const response = await fetch(`http://localhost:3000/products/${id}`)
        const product = await response.json()
      
       this.prePopulate(product)
       const btn = document.querySelector("#btn")
       btn.addEventListener('click', (e)=>{
        e.preventDefault()
        
        const updatedProduct= new Product().readValues();
        if(btn.innerText==="Update Product"){
            console.log("Updating");
            this.sendUpdate({...updatedProduct, id})
           }
       })

    }

    async sendUpdate(product){
        
        await fetch(`http://localhost:3000/products/${product.id}`, {
            method:'PUT',
            body:JSON.stringify(product),
            headers:{
                "Content-Type": "application/json"
            }
        })
    }
    prePopulate(product){
        document.querySelector("#p_name").value=product.productName
        document.querySelector("#p_image").value = product.productImg
        document.querySelector("#p_price").value =product.productPrice
        document.querySelector("#p_description").value=product.productDescription
        document.querySelector("#btn").textContent= `Update Product`
    }

    readValues(){
        const productName= document.querySelector("#p_name").value
        const productImg = document.querySelector("#p_image").value
        const productPrice =document.querySelector("#p_price").value
        const productDescription =document.querySelector("#p_description").value
        return {productName,productImg,productDescription, productPrice};
    }
    async addProduct(){
        const newProduct =new Product().readValues();
        await fetch(' http://localhost:3000/products', {
            method:'POST',
            body:JSON.stringify(newProduct),
            headers:{
                "Content-Type": "application/json"
            }
        })
    }
}

const btn = document.querySelector("#btn")

    btn.addEventListener('click', ()=>{
        if(btn.innerText==='Add Product'){
            new Product().addProduct()
        }
    })


class ProductList{
//deal with all products

     async render(){
        //get list of products and render- api call
        let products= await this.fetchProduct()
        // console.log(products);
        let html=''
        for(let product of products){
            const productHTML = new Product(product).render()
            html +=productHTML
        }
        return html
     }

     async fetchProduct(){
        const response = await fetch('http://localhost:3000/products')
        const products = await response.json()
        return products
     }
}


class App{
    static async Init(){
        let productList=new ProductList()
        let htmlProducts = await productList.render()
        // console.log((htmlProducts));
        let app= document.querySelector('#app')
        app.innerHTML=htmlProducts
    }    
}


App.Init()
// class CustomElement extends HTMLElement{
//     static async Init(){
//         let productList=new ProductList()
//         let htmlProducts = await productList.render()
//         // console.log((htmlProducts));
//         let app= document.querySelector('#app')
//         app.innerHTML=htmlProducts
//     }  
// }
// CustomElement.Init()
// CustomElement.define( "product-item" , CustomElement);
