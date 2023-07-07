const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'https://sergiocor23.pythonanywhere.com/productos',
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
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(producto) {
            respuesta=confirm("Esta seguro que desea eliminar el vehículo seleccionado?")
            if (respuesta){
                const url = this.url + '/' + producto;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text())
                    .then(res => {
                        location.reload();   
                    })
            }else{
                location.reload();
            }

                   
        },
        grabar() {
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro Creado Correctamente")
                    window.location.href = "./crudVehiculos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
        },
        ordenar(id){
            if (id==1)
                this.productos.sort((a,b)=>{return (a.marca > b.marca ? 1:-1)})
            if (id==2)   
                this.productos.sort((a,b)=>{return (a.precio_venta > b.precio_venta ? 1:-1)})
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')