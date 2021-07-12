const URL = 'http://localhost:3000/admin';
let addAdmin = document.querySelector('#add-btn');
let formElements = document.querySelectorAll('#add-modal input');
let editAdmin = document.querySelector('#edit-btn');
let deleteAdmin = document.querySelector('#delete-btn');
let id;

addAdmin.onclick = () => {
   let lastnameForm = document.querySelector('#lastname');
   let nameForm = document.querySelector('#name');
   let courseForm = document.querySelector('#course');
   let loginForm = document.querySelector('#login');
   let pinForm = document.querySelector('#pin');
   let data = {};

   if (!lastnameForm.value || !nameForm.value || !courseForm.value || !loginForm.value || !pinForm.value) {
      alert('Заполните поле ввода!');
      return;
   }

   if (lastnameForm) {
      formElements.forEach((item) => {
         data[item.id] = item.value;
      })
   }

   let options = {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   }

   fetch(URL, options)
   .then(response => response.json())
   .then(data => getAdmin());
}

editAdmin.onclick = function () {
   let editUrl = `${URL}/${id}`;
   let editElements = document.querySelectorAll('#edit-form input');
   let data = {};

   editElements.forEach((elem) => {
      data[elem.name] = elem.value;
   })

   let options = {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   }

   fetch(editUrl, options)
   .then(response => response.json())
   .then(data => getAdmin())
}

let edit = () => {
   id = event.target.dataset.id;
   const url = `${URL}/${id}`;
   
   fetch(url)
   .then(response => response.json())
   .then(data => {
      document.querySelector('#edit-name').value = data.name;
      document.querySelector('#edit-lastname').value = data.lastname;
      document.querySelector('#edit-course').value = data.course;
      document.querySelector('#edit-pin').value = data.pin;
      document.querySelector('#edit-login').value = data.login;
   })
}

deleteAdmin.onclick = () => {
	const url = `${URL}/${id}`;
	id = event.target.dataset.id;

	let options = {
		method:"DELETE",
		headers: {
			"Content-type": "application/json"
		}
	}

	fetch(url, options)
	.then(response => response.json())
	.then(data => getAdmin())
}

let del = () => {
	id = event.target.dataset.id;
	const url = `${URL}/${id}`;
	
	fetch(url)
	.then(response => response.json())
	.then(data => {
		return
	})
}

let getAdminById = (id) => {
   const url = `${URL}/${id}`;
   let adminData;

   fetch(url)
   .then(response => response.json())
   .then(data => adminData = data)
   return adminData;
}

function getAdmin () {

   fetch(URL)
   .then(response => response.json())
   .then(data => showAdmin(data))
}

function showAdmin (data) {
   let template = document.querySelector('#admin-card').innerHTML;
   let compiledTemplate = Handlebars.compile(template);
   let finishTemplate = compiledTemplate(data);

   document.querySelector('#root').innerHTML = finishTemplate;

   let editBtn = document.querySelectorAll('.edit-btn');
   let deleteBtn = document.querySelectorAll('.delete');

   editBtn.forEach((item) => {
      item.onclick = edit;
   })

   deleteBtn.forEach((item) => {
      item.onclick = del;
   })
}

getAdmin();