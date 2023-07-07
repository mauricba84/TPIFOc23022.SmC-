console.log(location.search) 
var id = location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'https://sergiocor23.pythonanywhere.com/productos/' + id,
            error: false,
            cargando: true,
            id: 0,
            marca:"",
            modelo:"",
            anio:"",
            version:"",
            color:"",
            km:"",
            transmision:"",
            combustible:"",
            precio_venta:"",
            precio_compra:"",
            contacto:"",
            imagen:"",
            ficha_tecnica:"",
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.marca = data.marca;
                    this.modelo = data.modelo
                    this.anio = data.anio
                    this.version = data.version
                    this.color = data.color
                    this.km = data.km
                    this.transmision = data.transmision
                    this.combustible = data.combustible
                    this.precio_venta = data.precio_venta
                    this.precio_compra = data.precio_compra
                    this.contacto = data.contacto
                    this.imagen = data.imagen
                    this.ficha_tecnica = data.ficha_tecnica
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                marca:this.marca,
                modelo:this.modelo,
                anio:this.anio,
                version:this.version,
                color:this.color,
                km:this.km,
                transmision:this.transmision,
                combustible:this.combustible,
                precio_venta:this.precio_venta,
                precio_compra:this.precio_compra,
                contacto:this.contacto,
                imagen:this.imagen,
                ficha_tecnica:this.ficha_tecnica
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro Modificado Correctamente")
                    window.location.href = "./crudVehiculos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
