const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submit = document.getElementById('submit');

let mood = 'create';
let tmp;

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
     dataPro = [];
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
 if(mood==='create')
 {
  //  add number of new pro object based on count 
  if(newPro.count>1)
    {
      for(let i =0; i<newPro.count;i++)
        {
         dataPro.push(newPro);
        }
    }
    else{
        dataPro.push(newPro);
    }
 }
 else{
    dataPro[tmp] = newPro;
    mood='create';
    submit.innerHTML='create';
    count.style.display = 'block';
 }


 //save localstorage
 localStorage.setItem('product',JSON.stringify(dataPro));
 clearData();
 showData();
 
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
function showData()
{
  getTotal();
  let table = '';  
  for(let i =0 ; i<dataPro.length ; i++)
  {
    table += 
    `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        
        <td>phone</td>
        <td ><button onclick='updateData(${i})' class='bg-violet-950  my-2  p-1.5 w-full rounded-lg duration-300  hover:scale-110 hover:bg-violet-900' id="update">update</button></td>
        <td><button onclick='deleteData(${i})' class='bg-violet-950  my-2  p-1.5 w-full rounded-lg duration-300  hover:scale-110 hover:bg-violet-900' id="delete">delete</button></td>
    </tr>
  `
  }
  document.getElementById("tbody").innerHTML=table;
  let divDeleteAll = document.getElementById("divDeleteAll");  

  if(dataPro.length >0)
  {
    divDeleteAll.innerHTML =
    `
    <button onclick="deleteAll()" id="btnDeleteAll" class="bg-violet-950 my-2 p-1.5 w-full rounded-lg duration-300 hover:tracking-wider hover:scale-110 hover:bg-violet-900" >Delete All (${dataPro.length}) </button>
    `
  }
  else
  {
    divDeleteAll.innerHTML = null;
  }
}
showData();
//delete
function deleteData(i)
{
  
   dataPro.splice(i,1);
   localStorage.product = JSON.stringify(dataPro);
  showData();
  
}

//delete all
function deleteAll()
{
  localStorage.clear();
  dataPro.splice(0);
  
  showData();
}


//update
function updateData(i)
{
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = 'update';
  tmp=i;
  scroll(
    {
      top:0,
      behavior:'smooth',
    }
  )
 
}
//clean data

