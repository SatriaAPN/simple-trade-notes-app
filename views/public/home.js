const forms = document.querySelector(".form");
const namaForm = document.querySelector("#nama");
const hargaForm = document.querySelector("#harga");
const submitbtn = document.querySelector(".btn-submit");
const renderData = document.querySelector(".render-data");
let data = []
let storage = "item storage"
let indexdata = document.querySelectorAll(".index-data");


document.addEventListener("DOMContentLoaded",function(){
    let dataFromStorage = localStorage.getItem(storage)
    let dataParsed = JSON.parse(dataFromStorage)
    console.log(dataParsed)
    if(dataParsed == null){
        renderData.innerHTML = "<p class='text-center mx-auto font-weight-bold mt-2'>no data found</p>"
    }else{
        if(dataParsed.length <= 0 ){
            renderData.innerHTML = "<p class='text-center mx-auto font-weight-bold mt-2'>no data found</p>"
        }else{
            for(dataFroms of dataParsed) {
                renderData.innerHTML += ` <tr class="index-data" data-id="${dataFroms.id}">
        <td class="nama">${dataFroms.nama}</td>
        <td  class="harga">${dataFroms.harga}</td>
        <td><button class="btn btn-primary" onclick="deleteData(${dataFroms.id})" >delete</button></td>
      </tr>`
            }
            indexdata = document.querySelectorAll(".index-data");
        }
    }

})




submitbtn.addEventListener('click',function(e){
    indexdata = document.querySelectorAll(".index-data");
    e.preventDefault()
    console.log(indexdata)
    if(indexdata.length > 1){
  
        renderData.innerHTML = ` <tr class="index-data" data-id="${indexdata.length}">
        <td>${namaForm.value}</td>
        <td>${hargaForm.value}</td>
        <td><button class="btn btn-primary" onclick="deleteData(${indexdata.length})">delete</button></td>
      </tr>`
      data.push({id: indexdata.length ,nama: namaForm.value, harga: hargaForm.value})
      localStorage.setItem(storage, JSON.stringify(data))
      console.log(data)
      return ;
    }else{
        renderData.innerHTML += `<tr class="index-data" data-id="${indexdata.length}">
        <td class="nama">${namaForm.value}</td>
        <td  class="harga">${hargaForm.value}</td>
        <td><button class="btn btn-primary" onclick="deleteData(${indexdata.length})" >delete</button></td>
      </tr>`

      indexdata = document.querySelectorAll(".index-data");
      console.log(indexdata)
      data.slice(0 , data.length)
      console.log(data)
      indexdata.forEach(dataEl => {
        console.log(dataEl.querySelector(".harga").textContent)
          let id = dataEl.getAttribute("data-id")
          let nama = dataEl.querySelector(".nama").textContent
          let harga = dataEl.querySelector(".harga").textContent
        console.log(id)

          data.push({id: id, nama :nama, harga: parseInt(harga)})
      })

        localStorage.setItem(storage, JSON.stringify(data))
        console.log(data)
    }
   

})

function getData(){
    localStorage.getItem(storage)
    return storage
}

function deleteData(id) {
    data.splice(id, 1)
    localStorage.removeItem(storage)
    localStorage.setItem(storage, JSON.stringify(data))
    event.target.parentElement.parentElement.remove()
    console.log(data)
}