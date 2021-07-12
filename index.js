const URL = 'http://localhost:3000/authorization';
let go = document.querySelector('#go');
let form = document.querySelectorAll('#form input');

go.onclick = () => {
	let tel = document.querySelector('#tel');
	let pin1 = document.querySelector('#pin1');
	let pin2 = document.querySelector('#pin2');
	let pin3 = document.querySelector('#pin3');
	let pin4 = document.querySelector('#pin4');
	let data = {};

	if (!tel.value || !pin1.value || !pin2.value || !pin3.value || !pin4.value) {
		alert('Заполните поле ввода!');
		return;
	}

    // data["telephone"] = tel.value;
    // data["pin"] = `${pin1.value}${pin2.value}${pin3.value}${pin4.value}`;

    window.location.href = 'menu.html';

   let options = {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   }

   fetch(URL, options)
   .then(response => response.json())
   .then(data => {return})
}