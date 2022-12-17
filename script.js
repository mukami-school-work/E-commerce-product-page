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


  let grid = document.querySelector(".products");
  let filterInput = document.getElementById("filterInput");
  let buttons = document.querySelector('#buttons');
  let allButton = document.querySelector('#the-all-btn');

  fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json =>{

          // iterating products
          for (let value of json){
              
              addElement(grid, value)
            
          }
          
      });

      fetch('https://fakestoreapi.com/products/categories')
      .then(res=>res.json())
      .then(json=> {

        // iterating categories
        for (let value of json){
          console.log(value)
              
          addButton(buttons, value);
        
        }
      
      })


  // add event listener
  filterInput.addEventListener('keyup', filterProducts);

  // add event listener on the all button
  allButton.addEventListener('click', () => {
    location.reload();
  });

  // callback function 
  function filterProducts(){
      let filterValue = filterInput.value.toUpperCase();
      let item = grid.querySelectorAll('.item')
      // console.log(filterValue);

      for (let i = 0; i < item.length; i++){
          let span = item[i].querySelector('.title');

          if(span.innerHTML.toUpperCase().indexOf(filterValue) > -1){
              item[i].style.display = "initial";
          }else{
              item[i].style.display = "none";
          }
          
      }
  } 


  // get value from the api create dynamic buttons
  function addButton(appendIn, value){
  let button = document.createElement('button');
  button.className = "border-2 px-8 py-1 bg-yellow-400 border rounded-md "
  let [ a, b, c, d ] = value;
  button.id = value;
  let categoryChoice = button.innerHTML = value;

  appendIn.appendChild(button);

  // add event listener
  button.addEventListener('click', filterProduct);

  function filterProduct(){
    let buttonValue = categoryChoice.toUpperCase();
    let item = grid.querySelectorAll('.item');

      for (let i = 0; i < item.length; i++){
        let span = item[i].querySelector('a.block');

          if(span.innerHTML.toUpperCase().indexOf(buttonValue) > -1){
              item[i].style.display = "initial";
          }else{
              item[i].style.display = "none";
          }
      
      }
    }
  }

  // get value from the api create dynamic element
  function addElement(appendIn, value){
      let div = document.createElement('div');
      div.className = 'item justify-self-center';

      let { image, title, category, price } = value;
      div.innerHTML = `
              <img src="${image}" class="bg-cover img mx-auto" alt="img1">
              <div class="text-center py-3 font-poppins">
                  <h1 class="text-lg title">${title}</h1>
                  <a href="#" class="block"><span class="text-sm text-red-400">${category}</span></a>
                  <span class="block py-3">$<span class="text-md">${price}</span></span>
                  <button class="border-2 px-8 py-1 bg-yellow-400 border rounded-md">Buy Now</button>
              </div>
      `;
      appendIn.appendChild(div);
    
  }

  });