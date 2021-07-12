const URL = 'http://localhost:3000/course';
let addCourse = document.querySelector('#add-btn');
let formElements = document.querySelectorAll('#add-modal input');
let editCourse = document.querySelector('#edit-btn');
let deleteCourse = document.querySelector('#delete-btn');
let id;

addCourse.onclick = () => {
   let lastnameForm = document.querySelector('#lastname');
   let nameForm = document.querySelector('#name');
   let startForm = document.querySelector('#start');
   let endForm = document.querySelector('#end');
   let courseForm = document.querySelector('#course');
   let priceForm = document.querySelector('#price');
   let roomForm = document.querySelector('#room');
   let timeForm = document.querySelector('#time');
   let data = {};

   if (!lastnameForm.value || !nameForm.value || !startForm.value || !endForm.value || !courseForm.value || !priceForm.value || !roomForm.value || !timeForm.value) {
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
   .then(data => getCourse());
}

editCourse.onclick = function () {
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
   .then(data => getCourse())
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
      document.querySelector('#edit-start').value = data.start;
      document.querySelector('#edit-end').value = data.end;
      document.querySelector('#edit-price').value = data.price;
      document.querySelector('#edit-room').value = data.room;
      document.querySelector('#edit-time').value = data.time;
   })
}

deleteCourse.onclick = () => {
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
	.then(data => getCourse())
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

let getCourseById = (id) => {
   const url = `${URL}/${id}`;
   let courseData;

   fetch(url)
   .then(response => response.json())
   .then(data => courseData = data)
   return courseData;
}

function getCourse () {

   fetch(URL)
   .then(response => response.json())
   .then(data => showCourse(data))
}

function showCourse(data) {
   let template = document.querySelector('#course-card').innerHTML;
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

getCourse();