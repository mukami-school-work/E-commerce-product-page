document.addEventListener('DOMContentLoaded', function() { 

    const header = document.querySelector("header");

    window.addEventListener ("scroll", function() {
        header.classList.toggle ("sticky", window.scrollY > 0);
    });

    let menu = document.querySelector('#menu-icon');
    let navlist = document.querySelector('.navlist');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navlist.classList.toggle('open');
    };

    window.onscroll = () => {
        menu.classList.remove('bx-x');
        navlist.classList.remove('open');
    };

    let products = document.querySelector('.products')
    async function fetchProducts(url){
        let data = await fetch(url);
        let response = await data.json();
        console.log(response)

    for (let i = 0; i < response.length; i++) {
        let description = response[i].description
        products.innerHTML +=`
        <div class="product">
            <img src="${response[i].image}" alt="" class="product-img">
            <div class="product-content">
                <h2 class="product-title">${response[i].title}</h2>
                <h4 class="product-category">${response[i].category}</h4>
                
                <div class="product-price-container">
                    <h3 class="product-price">$ ${response[i].price}</h3>
                    <a href="#!" data-productId= "${response[i].id}" class="add-to-cart">Add To Cart</a>
                </div>
            </div>
        </div>`;
    
    }
        
   
    };
    fetchProducts('https://fakestoreapi.com/products');
});