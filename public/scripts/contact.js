let nimeElement = document.getElementById('name');
let mailiElement = document.getElementById('email');
let textarea = document.getElementById('sonum');
let saada = document.getElementById('saada');
let andmed = [nimeElement.value, mailiElement.value, textarea.value];

saada.addEventListener("click", function () {
    if (nimeElement.value.length == 0 || mailiElement.value.length == 0 || textarea.value.length == 0) {
      alert("Palun täida kõik väljad")
    } else {
      alert("Sõnum saadetud!")
      console.log(andmed);
      nimeElement.value = '';
      mailiElement.value = '';
      textarea.value = '';
    }
  });


/*if (nimeElement.length == 0 || mailiElement.length == 0 || textarea.value == '') {
    saada.addEventListener("click", function () {
        alert("Palun täida kõik väljad")
    });
}

else {
    saada.addEventListener("click", function () {
        alert("Sõnum saadetud!")
    })
    console.log(Andmed);
    nimeElement.value = '';
    mailiElement.value = '';
    textarea.value = '';
}  */