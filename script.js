document.addEventListener('DOMContentLoaded', function() { 

   // Hero Section

    const sr = ScrollReveal ({
      distance: '30px',
      duration: 2600,
      reset: true
    })

    sr.reveal('.home-text',{delay:280, origin:'bottom'})

    // End Hero Section

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

 // Contact form section starts here
 function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_47oz8kn";
  const templateID = "template_uhltvgf";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Sent successfully!!")

    })
    .catch(err=>console.log(err));
}
// End of contact form section
