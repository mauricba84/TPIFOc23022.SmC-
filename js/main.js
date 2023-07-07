/*Validacion de Datos Ingresados*/
function validarContacto(){
  var nombre,correo,telefono,consulta,resultado;
  nombre=document.getElementById("nombre").value;
  correo=document.getElementById("email").value;
  telefono=document.getElementById("telefono").value;
  consulta=document.getElementById("consulta").value;
  resultado;
  
  if(nombre==="" || correo===""|| telefono==="" || consulta===""){
      resultado="Todos los datos son requeridos!";
      alert(resultado);
      return false;
  }else if(!validarMail){
    alert('Correo Incorrecto');
    return false;
  }else if(!validarTelefono){
    alert('Telefono Incorrecto');
    return false;
  }else{
    return true;
  }
}

function validarMail(){
  
	var emailIngresado = document.getElementById('email');
	var emailValido =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	if( emailValido.test(emailIngresado.value) ){
		return true;
	}else{
		return false;
	}
} 

function validarTelefono(){
  
  var telIngresado = document.getElementById('telefono');
  var telValido =  /^[0-9]+$/;

	if( telValido.test(telIngresado.value) ){
		return true;
	}else{
		return false;
	}
}

/*Manejo del DOM*/
let cadena=`
        <a href="index.html">
            <img id="logo" src="./img/logo.png" alt="logoEmpresa">
        </a>
        <nav>
            <a class="aheader" href="index.html">Inicio</a>
            <a class="aheader" href="producto.html">Productos</a>
            <a class="aheader" href="sucursales.html">Sucursales</a>
            <a class="aheader" href="contacto.html">Contacto</a>
            <a class="aheader" href="login.html">Administración</a>
        </nav>
`
document.getElementById("idheader").innerHTML=cadena;
cadena=`
  <a href="index.html">
    <div class="logo-footer">
      <img id="logo" src="./img/logo.png" alt="logoAutomotores" width="200">
    </div>
    <div class="logo-footer">
      <p style="color:black;">
        <img src="./img/ubicacion.png" alt="ubicacion" width="20">
        Av. Colón 3950, Córdoba Ciudad<br>
        <img src="./img/correo.png" alt="ubicacion" width="20">
        info@automotoresavenida.com.ar<br>
        <img src="./img/telefono.png" alt="ubicacion" width="20">
        0351 4111111<br>
        <img src="./img/whatsappBN.png" alt="ubicacion" width="20">
        +5493512222222<br>
        <img src="./img/horario.png" alt="ubicacion" width="20">
        Lunes a Viernes: 10 a 18hs<br>
        Sabados: 10 a 14hs
    </p>
  </div>
  </a>
  <nav>
    <a href="http://api.whatsapp.com/send?phone=5493512222222&text=Automotores%20Avenida,%20En%20que%20podemos%20ayudarte?" target="_blank">
      <img src="./img/whatsapp.png" alt="whatsapp" width="30">
    </a>
    <a id="redes" href="https://www.instagram.com/" target="_blank">
      <img src="./img/instagram.png" alt="instagram" width="30">
    </a>
    <a id="redes" href="https://es-la.facebook.com/" target="_blank">
      <img src="./img/facebook.png" alt="facebook" width="30">
    </a>
    <a id="redes" href="https://twitter.com/?lang=es" target="_blank">
      <img src="./img/twitter.png" alt="twitter" width="30">
    </a>
  </nav>
  <p>Sitio desarrollado en CodoACodo - Comision 23022</p>
  <p>©Copyright 2023</p>
`
document.getElementById("idfooter").innerHTML=cadena;

/*const sesion=sessionStorage.getItem("estado")
console.log(sessionStorage.getItem("estado"))
console.log(sesion)
if (sesion==null)
  alert("No esta logeado")
else
  alert("Esta logeado")*/

/*if (sesion==null)
  if(sesion!="No Validado" )
    window.location.href='login.html'*/

    

