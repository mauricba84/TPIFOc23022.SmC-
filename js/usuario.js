const { createApp } = Vue
createApp({
  data() {
    return {
      url: "https://sergiocor23.pythonanywhere.com/usuarios",
      usuario: [],

    }
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.usuario = data;
        })
        .catch(error => alert("Ups... se produjo un error: " + error))
    },
    login() {
      user = document.getElementById("usuario").value
      pass = document.getElementById("clave").value
      localStorage.setItem("estado", "No Validado")
      localStorage.setItem("usuario", "")
      for (elemento of this.usuario) {
        if (elemento.usuario == user && elemento.clave == pass) {
          localStorage.setItem("estado", "validado")
          localStorage.setItem("usuario", elemento)
          localStorage.user= JSON.stringify(elemento);
        }
      }
      if (localStorage.getItem("estado") == "validado") {
        let user = JSON.parse(localStorage.user);
        alert("---Automotores Avenida---\nBienvenido/a " + user.nombre + " " + user.apellido);
        window.location.href='crudVehiculos.html'
      }else{
        alert("---Automotores Avenida---\nUsuario y/o Contraseña Incorrectos");
      }
    },
  },
  created() {
    this.fetchData(this.url)
  }
}).mount('#app')
