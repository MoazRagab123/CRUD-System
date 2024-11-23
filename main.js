const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');
console.log(title,price,taxes,ads,discount,total,count,category,submit)
//get total
function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else
    {
      total.innerHTML = '';
      total.style.background = '#a00d02'   
    }
}
//create product
let dataPro;
if(localStorage.product!=null)
{
    // reverse stringify to array
   dataPro = JSON.parse(localStorage.product);
}
else{
    let dataPro = [];
}
submit.onclick = function(){
 let newPro ={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
 }   
 dataPro.push(newPro);
 //save localstorage
 localStorage.setItem('product',JSON.stringify(dataPro));
 clearData();
}
//clear inputs 
function clearData()
{
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  category.value = '';
  title.value = '';
  total.innerHTML = '';
  
}
//read
//count
//delete
//update
//clean data

