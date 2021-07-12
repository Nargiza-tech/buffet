const URL = 'http://localhost:3000/baffet';
let addBtns = document.querySelector('#submit-product');
let editBtns = document.querySelector('#edit-button');
let deleteBtn = document.querySelector('.delete');
let data = {};
let id;


addBtns.onclick = () => {

    let formElements = document.querySelectorAll('.add-form input');
    formElements.forEach(item => {
        data[item.name] = item.value;
    })

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(URL, options)
        .then(response => response.json())
        .then(data => getProducts())

}

editBtns.onclick = () => {
    console.log(id);
    let editUrl = `${URL}/${id}`;
    let editElements = document.querySelectorAll('#edit-form input');
    let data = {};


    editElements.forEach((elem) => {
        data[elem.name] = elem.value;
    })
    console.log(data);
    let options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(editUrl, options)
        .then(response => response.json())
        .then(data => getProducts())
}

deleteBtn.onclick = () => {
    const url = `${URL}/${id}`;
    let options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            showProducts();
            location.reload();
        })
}


let edit = () => {
    id = event.target.dataset.id;
    const url = `${URL}/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#edit-name').value = data.name;
            document.querySelector('#edit-img').value = data.img;
            document.querySelector('#edit-price').value = data.price;
        })
}



getProductById = (id) => {
    const url = `${URL}/${id}`;
    let buffetData;

    fetch(url)
        .then(response => response.json())
        .then(data => buffetData = data)
    return buffetData;

}

function getProducts() {
    fetch(URL)
        .then(response => response.json())
        .then(data => showProducts(data))
}



function showProducts(data) {
    let template = document.querySelector('#product-card').innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let finishTemplate = compiledTemplate(data);

    document.querySelector("#root").innerHTML = finishTemplate;

    let editButton = document.querySelectorAll('.editBtn');
    let deleteBtn = document.querySelectorAll('.delete-btn');
    editButton.forEach((item) => {
        item.onclick = edit;
    });

    deleteBtn.forEach((item) => {
        item.onclick = delModel;
    })



}

let delModel = () => {
    id = event.target.dataset.id;
    console.log(id);
}


getProducts();