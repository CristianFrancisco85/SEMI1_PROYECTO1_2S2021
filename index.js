var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
const mysql = require('mysql');
var uuid = require('uuid');
const aws_keys = require('./creds_template');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
var port = 9000;
app.listen(port);
console.log('Listening on port', port);

const db_credentials = require('./db_creds_template');
var conn = mysql.createPool(db_credentials);


//instanciamos el sdk
var AWS = require('aws-sdk');
const { json } = require('body-parser');
//instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);


//--------------------------------------------------Prueba---------------------------------------

app.get('/', function (req, res) {

  res.json({ mensaje: 'Hola semi 1 - A'})

});


//--------------------------------------------------ALMACENAMIENTO---------------------------------------

//subir foto en s3  EN EL PROYECTO SOLO SE SUBIRAN IMAGENES (JPG,PNG) Y ARCHIVOS PDF
app.post('/subirfoto', function (req, res) {

  var id = req.body.id;
  var foto = req.body.foto;     //base64
  //carpeta y nombre que quieran darle a la imagen

  var nombrei = "fotos/" + id +uuid.v4()+ ".jpg";

  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64');


  
  const params = {
    Bucket: "archivos-13--p1",
    Key: nombrei,
    Body: buff,
    ContentType: "image",
    ACL: 'public-read'
  };



  
  const putResult = s3.putObject(params).promise();
  res.json({ mensaje: putResult })



});

//subir pdf en s3
app.post('/subirfile', function (req, res) {

  var nombre = req.body.nombre;
  var pdf = req.body.pdf;  //base 64
  //carpeta y nombre que quieran darle al pdf
  var nombrei = "files/" + nombre +uuid.v4()+ ".pdf";
  //se convierte la base64 a bytes
  let buff = new Buffer.from(pdf, 'base64');
  const params = {
    Bucket: "ejemplosemiarchivos",
    Key: nombrei,
    Body: buff,
    ACL: 'public-read'
  };

  s3.upload(params, function sync(err, data) {
     if (err) {
       res.status(500).send(err)
     } else {
      console.log(data.Location);  
      res.status(200).send(data);
                        
   }}); 


});

//NO ES NECESARIO PARA SU PROYECTO PERO PUEDEN USARLO obtener objeto en s3
app.post('/obtenerfoto', function (req, res) {
  var id = req.body.id;
  //direcccion donde esta el archivo a obtener
  var nombrei = "fotos/" + id + ".jpg";
  var getParams = {
    Bucket: 'archivos-13--p1',
    Key: nombrei
  }
  s3.getObject(getParams, function (err, data) {
    if (err)
      res.json({ mensaje: "error" })
    //de bytes a base64
    var dataBase64 = Buffer.from(data.Body).toString('base64');
    res.json({ mensaje: dataBase64 })

  });

});

/*Login , Registro , subir archivos , editar archivo , eliminar archivo , agregar amigos , buscar usuario , ver archivos de amigos , Ver mis archivos públicos y privados */

//Login
/*
RECIBE:
{
    "username":"",
    "password":""
}

DEVUELVE:
{
        "idUsuario": 1,
        "image": "files/e10eabfc-1a2d-4299-8055-2da1cb8a275e.jpg"
        "username":
        "password"
}
*/
app.post("/login", async (req, res) => {
  let body = req.body;
  conn.query("SELECT idUsuario, image,username,password FROM Usuario WHERE username = ? AND password = ?",[body.username,body.password], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//Registro
/*
RECIBE:
{
    "username":"",
    "password":"",
    "image":"",
    "email":"",
    "ext":""
}

DEVUELVE:
{
  "ok":true
}
*/ 
app.post("/crearUsuario", async (req, res) => {
  let body = req.body;
  let nombrei = "files/" +uuid.v4()+ body.ext;
  let buff = new Buffer.from(body.image, 'base64');
  const params = {
    Bucket: "archivos-13--p1",
    Key: nombrei,
    Body: buff,
    ACL: 'public-read'
  };
  s3.upload(params, function sync(err, data) {}); 
  conn.query('INSERT INTO Usuario(email,username,password,image) VALUES(?,?,?,?)', [body.email, body.username, body.password,nombrei], function (err, result) {
    if (err) throw err;
    res.send({ok:true});
  });
  
});

//Subir Archivos
/*
RECIBE:
{
    "nombre":"",
    "usuario":,
    "visibilidad":,
    "data":"",
    "ext":""
}

DEVUELVE:
{
  "ok":true
}
*/
app.post("/subirArchivo", async (req, res) => {
  var data = req.body.data;
  var nombrei = "files/" + req.body.nombre +uuid.v4()+ req.body.ext;
  let buff = new Buffer.from(data, 'base64');
  const params = {
    Bucket: "archivos-13--p1",
    Key: nombrei,
    Body: buff,
    ACL: 'public-read'
  };
  s3.upload(params, function sync(err, data) {}); 
  let body = req.body;
  conn.query('INSERT INTO Archivo(Nombre, Ruta, Usuario_idUsuario, Visibilidad) VALUES(?,?,?,?)', [body.nombre+body.ext, nombrei, body.usuario, body.visibilidad], function (err, result) {
    if (err) throw err;
    res.send({ok:true});
  });
});

//Editar Archivo
/*
RECIBE:
{
    "nombre":"",
    "idArchivo":,
    "visibilidad":
}

DEVUELVE:
{
  "ok":true
}
*/
app.post("/editarArchivo", async (req, res) => {
  let body = req.body;
  conn.query('UPDATE Archivo SET nombre =?, visibilidad=? WHERE idArchivo=?', [body.nombre, body.visibilidad, body.idArchivo], function (err, result) {
    if (err) throw err;
    res.send({ok:true});
  });
});

//Eliminar Archivo
/*
RECIBE:
{
    "idArchivo":
}

DEVUELVE:
{
  "ok":true
}
*/
app.post("/eliminarArchivo", async (req, res) => {
  let body = req.body;
  conn.query('DELETE FROM Archivo WHERE idArchivo=?', [body.idArchivo], function (err, result) {
    if (err) throw err;
    res.send({ok:true});
  });
});

//Agregar Amigos
/*
RECIBE:
{
    "usuario1":,
    "usuario2":
}

DEVUELVE:
{
  "ok":true
}
*/
app.post("/agregarAmigos", async (req, res) => {
  let body = req.body;
  conn.query('INSERT INTO Amigos(Usuario_idUsuario, Usuario_idUsuario1) VALUES(?,?) ', [body.usuario1, body.usuario2], function (err, result) {
    if (err) throw err;
    res.send({ok:true});
  });
});


//Eliminar Amigos
/*
RECIBE:
{
    "usuario1":,
    "usuario2":
}

DEVUELVE:
{
  "ok":true
}
*/
app.post("/eliminarAmigos", async (req, res) => {
  let body = req.body;
  conn.query('DELETE FROM Amigos WHERE Usuario_idUsuario=? AND Usuario_idUsuario1 = ?', [body.usuario1, body.usuario2], function (err, result) {
    if (err) throw err;
    res.send({ok:true});
  });
});

//Buscar Usuario
/*
RECIBE:
{
    "username":""
}

DEVUELVE:
{
        "idUsuario": ,
        "username": "",
        "image": "",
        "archivos": 
    }
*/
app.post("/buscarUsuario", async (req, res) => {
  let body = req.body;
  conn.query("SELECT idUsuario, username, image, (SELECT COUNT(*) FROM Archivo WHERE Usuario_idUsuario = idUsuario) as archivos FROM Usuario WHERE username LIKE '%"+body.username+"%'", function (err, result) {
    
    if (err) throw err;
    res.send(result);
  });
});

//Get Usuarios
/*
DEVUELVE:
{
        "idUsuario": ,
        "username": "",
        "image": "",
        "archivos": 
    }
*/
app.get("/getUsuarios", async (req, res) => {
  let body = req.body;
  conn.query("SELECT idUsuario, username, image, (SELECT COUNT(*) FROM Archivo WHERE Usuario_idUsuario = idUsuario) as archivos FROM Usuario", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});


//Ver Archivos de todos mis Amigos
/*
RECIBE:
{
    "idUsuario":
}

DEVUELVE:
[
    {
        "Nombre": "",
        "Ruta": "",
        "propietario": "",
        "idUsuario": 
    }
]
*/
app.post("/verArchivos", async (req, res) => {
  let body = req.body;
  conn.query("SELECT Nombre, Ruta,  (SELECT username FROM Usuario WHERE idUsuario=Archivo.Usuario_idUsuario)  as propietario, Archivo.Usuario_idUsuario as idUsuario FROM Archivo WHERE Archivo.Visibilidad = 1 AND (  Archivo.Usuario_idUsuario IN (SELECT Usuario_idUsuario FROM Amigos WHERE USuario_idUsuario1= ? )  OR Archivo.Usuario_idUsuario IN (SELECT Usuario_idUsuario1 FROM Amigos WHERE Amigos.Usuario_idUsuario = ? ));",[body.idUsuario,body.idUsuario], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//Ver mis archivos
/*
RECIBE:
{
    "idUsuario":
}

DEVUELVE:
[
    {
        "idArchivo": ,
        "Nombre": "",
        "Ruta": "",
        "Visibilidad": 
    }
]
*/
app.post("/misArchivos", async (req, res) => {
  let body = req.body;
  conn.query("SELECT idArchivo, Nombre, Ruta, Visibilidad FROM Archivo WHERE Usuario_idUsuario = ?",[body.idUsuario], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
