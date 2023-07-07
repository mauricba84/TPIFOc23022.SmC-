#Importacion de modulos
from flask import Flask ,jsonify ,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

#Configuracion de la Base de Datos / Db,usuario,contraseña

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://sergiocor23:SmC_*120#A@sergiocor23.mysql.pythonanywhere-services.com/sergiocor23$default'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False 

db= SQLAlchemy(app)
ma=Marshmallow(app)

#Producto
class Producto(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    marca=db.Column(db.String(50))
    modelo=db.Column(db.String(50))
    anio=db.Column(db.Integer)
    version=db.Column(db.String(50))
    color=db.Column(db.String(50))
    km=db.Column(db.Integer)
    transmision=db.Column(db.String(50))
    combustible=db.Column(db.String(50))
    precio_venta=db.Column(db.Float)
    precio_compra=db.Column(db.Float)
    contacto=db.Column(db.String(100))
    imagen=db.Column(db.String(200))
    ficha_tecnica=db.Column(db.String(200))

    def __init__(self,marca,modelo,anio,version,color,km,transmision,combustible,precio_venta,precio_compra,contacto,imagen,ficha_tecnica):
        self.marca=marca
        self.modelo=modelo
        self.anio=anio
        self.version=version
        self.color=color
        self.km=km
        self.transmision=transmision
        self.combustible=combustible
        self.precio_venta=precio_venta
        self.precio_compra=precio_compra
        self.contacto=contacto
        self.imagen=imagen
        self.ficha_tecnica=ficha_tecnica
#Usuario
class Usuario(db.Model):
    usuario=db.Column(db.String(50), primary_key=True,autoincrement=False)
    clave=db.Column(db.String(30))
    apellido=db.Column(db.String(50))
    nombre=db.Column(db.String(100))
    mail=db.Column(db.String(100))
    imagen=db.Column(db.String(150))

    def __init__(self,usuario,clave,apellido,nombre,mail,imagen):
        self.usuario=usuario
        self.clave=clave
        self.apellido=apellido
        self.nombre=nombre
        self.mail=mail
        self.imagen=imagen

with app.app_context():
    db.create_all()#Definicion de tablas a utilizar
#Producto
class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','marca','modelo','anio','version','color','km','transmision','combustible','precio_venta','precio_compra','contacto','imagen','ficha_tecnica')

producto_schema=ProductoSchema()
productos_schema=ProductoSchema(many=True)
#GET (Sin Parametro) Todos los Registros
@app.route('/productos',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all()
    result=productos_schema.dump(all_productos)
    return jsonify(result)                       #JSON con TODOS los registros de la tabla productos
#GET (Con Parametro) Unico Registro
@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)  #JSON con el registro de la tabla productos cuyo parametro se le suministro
#DELETE - Eliminacion de Registro
@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)   #JSON con el registro eliminado
#POST - Alta de Registro
@app.route('/productos', methods=['POST'])
def create_producto():
    marca=request.json['marca']
    modelo=request.json['modelo']
    anio=request.json['anio']
    version=request.json['version']
    color=request.json['color']
    km=request.json['km']
    transmision=request.json['transmision']
    combustible=request.json['combustible']
    precio_venta=request.json['precio_venta']
    precio_compra=request.json['precio_compra']
    contacto=request.json['contacto']
    imagen=request.json['imagen']
    ficha_tecnica=request.json['ficha_tecnica']

    new_producto=Producto(marca,modelo,anio,version,color,km,transmision,combustible,precio_venta,precio_compra,contacto,imagen,ficha_tecnica)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

#PUT - Modificar Registro
@app.route('/productos/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)

    marca=request.json['marca']
    modelo=request.json['modelo']
    anio=request.json['anio']
    version=request.json['version']
    color=request.json['color']
    km=request.json['km']
    transmision=request.json['transmision']
    combustible=request.json['combustible']
    precio_venta=request.json['precio_venta']
    precio_compra=request.json['precio_compra']
    contacto=request.json['contacto']
    imagen=request.json['imagen']
    ficha_tecnica=request.json['ficha_tecnica']

    producto.marca=marca
    producto.modelo=modelo
    producto.anio=anio
    producto.version=version
    producto.color=color
    producto.km=km
    producto.transmision=transmision
    producto.combustible=combustible
    producto.precio_venta=precio_venta
    producto.precio_compra=precio_compra
    producto.contacto=contacto
    producto.imagen=imagen
    producto.ficha_tecnica=ficha_tecnica

    db.session.commit()
    return producto_schema.jsonify(producto)

#Usuario
class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('usuario','clave','apellido','nombre','mail','imagen')
usuario_schema=UsuarioSchema()
usuarios_schema=UsuarioSchema(many=True)
#GET (Sin Parametro) Todos los Registros
@app.route('/usuarios',methods=['GET'])
def get_usuarios():
    all_usuarios=Usuario.query.all()
    result=usuarios_schema.dump(all_usuarios)
    return jsonify(result)                #JSON con TODOS los registros de la tabla usuarios
#GET (Con Parametro) Unico Registro
@app.route('/usuarios/<usuario>',methods=['GET'])
def get_usuario(usuario):
    usuario=Usuario.query.get(usuario)
    return usuario_schema.jsonify(usuario)  #JSON con el registro de la tabla usuarios cuyo parametro se le suministro
#DELETE - Eliminacion de Registro
@app.route('/usuarios/<usuario>',methods=['DELETE'])
def delete_usuario(usuario):
    usuario=Usuario.query.get(usuario)
    db.session.delete(usuario)
    db.session.commit()
    return usuario_schema.jsonify(usuario)   #JSON con el registro eliminado
#POST - Alta de Registro
@app.route('/usuarios', methods=['POST'])
def create_usuario():
    usuario=request.json['usuario']
    clave=request.json['clave']
    apellido=request.json['apellido']
    nombre=request.json['nombre']
    mail=request.json['mail']
    imagen=request.json['imagen']

    new_usuario=Usuario(usuario,clave,apellido,nombre,mail,imagen)
    db.session.add(new_usuario)
    db.session.commit()
    return usuario_schema.jsonify(new_usuario)

#PUT - Modificar Registro
@app.route('/usuarios/<usuario>' ,methods=['PUT'])
def update_usuario(usuario):
    usuario=Usuario.query.get(usuario)
    clave=request.json['clave']
    apellido=request.json['apellido']
    nombre=request.json['nombre']
    mail=request.json['mail']
    imagen=request.json['imagen']

    usuario.clave=clave
    usuario.apellido=apellido
    usuario.nombre=nombre
    usuario.mail=mail
    usuario.imagen=imagen
    db.session.commit()
    return usuario_schema.jsonify(usuario)

# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000