/*----------- Slider -----------*/

var width = window.innerWidth
var height = window.innerHeight

function handleResize() {
  width = window.innerWidth
  height = window.innerHeight
  sliderController()
}

document.addEventListener("DOMContentLoaded", function(event) {
  window.addEventListener('resize', handleResize, { passive: true })
})

function sliderController(){
  let slider = document.querySelector(".fold-slider")
  if(slider) {
    let current = parseInt(slider.getAttribute('current'))
    slider.querySelectorAll(".fold-slide.w-slide").forEach(function(element) {
      element.setAttribute("style", "transform: translateX("+(-1*current*width)+"px);")
    })
  }
}

function right() {
  let slider = document.querySelector(".fold-slider")
  let current = parseInt(slider.getAttribute('current'))
  current = current + 1
  let total = parseInt(slider.getAttribute("total"))
  checkArrows(current, total)
  slider.setAttribute('current', current)
  slider.querySelectorAll(".fold-slide.w-slide").forEach(function(element) {
    element.setAttribute("style", "transform: translateX("+(-1*width*current)+"px);")
  })
}

function left() {
  let slider = document.querySelector(".fold-slider")
  let current = parseInt(slider.getAttribute('current'))
  current = current - 1
  let total = parseInt(slider.getAttribute("total"))
  checkArrows(current, total)
  slider.setAttribute('current', current)
  slider.querySelectorAll(".fold-slide.w-slide").forEach(function(element) {
    element.setAttribute("style", "transform: translateX("+(-1*width*current)+"px);")
  })
}

function checkArrows(current, total) {
  let der_element = document.querySelector("#a-right")
  let izq_element = document.querySelector("#a-left")
  if(current == total-1) {
    der_element.setAttribute("style", 'display: none;')
  }
  else {
    der_element.setAttribute("style", 'display: -webkit-flex;')
  }
  if(current == 0) {
    izq_element.setAttribute("style", 'display: none;')
  }
  else {
    izq_element.setAttribute("style", 'display: -webkit-flex;')
  }
}

/*----------- Slider -----------*/

/*----------- Form -----------*/


document.addEventListener("DOMContentLoaded", function(event) {
  $("#cpa-form").submit(function(e){
    e.preventDefault();
  });
});

function signup(){
  let email = document.getElementById('email2').value;
  let password = document.getElementById('password2').value;
  let answer = document.getElementById('success');
  axios.post('http://localhost:5000/api/signUp', {
    email,
    password
  }).then(response => {
    answer.textContent = 'User created successfully'
  }).catch(error => {
    answer.textContent = 'User created unsuccessful'
  })
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    $("#cpa-form1").submit(function(e){
      e.preventDefault();
    });
  });
  
  function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let answer = document.getElementById('success1');
    axios.post('http://localhost:5000/api/login', {
      email,
      password
    }).then(response => {
      answer.textContent = 'Iniciaste sesión correctamente'
  }).catch(error => {
    answer.textContent = 'Verifica que los datos ingresados sean correctos'
    })
    }

    document.addEventListener("DOMContentLoaded", function(event) {
      $("#cpa-form3").submit(function(e){
        e.preventDefault();
      });
    });

    function remove(){
      let email = document.getElementById('email3').value;
      let password = document.getElementById('password3').value;
      let answer = document.getElementById('success3');
      axios.post('http://localhost:5000/api/remove', {
        email,
        password
      }).then(response => {
        answer.textContent = 'Se eliminó la cuenta correctamente'
    }).catch(error => {
      answer.textContent = 'Error al eliminar la cuenta. Inténtalo más tarde'
      })
      }

      document.addEventListener("DOMContentLoaded", function(event) {
        $("#cpa-form4").submit(function(e){
          e.preventDefault();
        });
      });
  
      function update(){
        let email = document.getElementById('email4').value;
        let password = document.getElementById('password4').value;
        let password1 = document.getElementById('password5').value;
        let answer = document.getElementById('success4');
        axios.post('http://localhost:5000/api/update', {
          email,
          password,
          password1
        }).then(response => {
          answer.textContent = 'Se actualizó la contraseña correctamente'
      }).catch(error => {
        answer.textContent = 'Error al actualizar la contraseña. Inténtalo más tarde'
        })
        }


/*----------- Form -----------*/


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create gradient
var grd = ctx.createRadialGradient(75,50,5,90,60,100);
grd.addColorStop(0,"gray");
grd.addColorStop(1,"white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10,10,185,50);
var ctx1 = c.getContext("2d");
ctx1.font = "30px Arial";
ctx1.strokeText("Mexicomidas", 10, 50);