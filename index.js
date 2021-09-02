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
app.get("/login", async (req, res) => {
  let body = req.body;
  conn.query("SELECT username, password FROM Usuario WHERE username = ? AND password = ?",[body.username,body.password], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//Registro
app.post("/crearUsuario", async (req, res) => {
  let body = req.body;

  let nombrei = "files/" +uuid.v4()+ ".jpg";
  let buff = new Buffer.from(body.image, 'base64');
  const params = {
    Bucket: "ejemplosemiarchivos",
    Key: nombrei,
    Body: buff,
    ACL: 'public-read'
  };
  s3.upload(params, function sync(err, data) {}); 
  conn.query('INSERT INTO Usuario(email,username,password,image) VALUES(?,?,?,?)', [body.email, body.username, body.password,nombrei], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
  
});

//Subir Archivos
app.post("/subirArchivo", async (req, res) => {
  //S3
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

  //RDS
  let body = req.body;
  conn.query('INSERT INTO Archivo(Nombre, Ruta, Usuario_idUsuario, Visibilidad) VALUES(?,?,?,?)', [body.nombre, nombrei, body.usuario, body.visibilidad], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

//Subir Foto
app.post("/subirArchivo", async (req, res) => {
  //S3
  var id = req.body.id;
  var foto = req.body.foto;     //base64
  var ext = req.body.ext;     //base64
  //carpeta y nombre que quieran darle a la imagen

  var nombrei = "fotos/" + id +uuid.v4()+ ext;

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

  //RDS
  let body = req.body;
  conn.query('INSERT INTO Archivo(Nombre, Ruta, Usuario_idUsuario, Visibilidad) VALUES(?,?,?,-1)', [body.nombre, nombrei, body.usuario, body.visibilidad], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

//Editar Archivo
app.post("/editarArchivo", async (req, res) => {
  let body = req.body;
  conn.query('UPDATE Archivos SET nombre =?, visibilidad=? WHERE idArchivo=?', [body.nombre, body.visibilidad, body.idArchivo], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

//Eliminar Archivo
app.post("/eliminarArchivo", async (req, res) => {
  let body = req.body;
  conn.query('DELETE FROM Archivos WHERE idArchivo=?', [body.nombre, body.visibilidad, body.idArchivo], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

//Agregar Amigos
app.post("/agregarAmigos", async (req, res) => {
  let body = req.body;
  conn.query('INSERT INTO Amigos(Usuario_idUsuario, Usuario_idUsuario1) VALUES(?,?) ', [body.usuario1, body.usuario2], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});


//Agregar Amigos
app.post("/eliminarAmigos", async (req, res) => {
  let body = req.body;
  conn.query('DELETE FROM Amigos WHERE Usuario_idUsuario=? AND Usuario_idUsuario1 = ?', [body.usuario1, body.usuario2], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

//Buscar Usuario
app.get("/buscarUsuario", async (req, res) => {
  let body = req.body;
  conn.query("SELECT nombre, username FROM Usuario WHERE username LIKE \"%?%\"",[body.username,body.password], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//Ver Archivos de Amigos
app.get("/verArchivos", async (req, res) => {
  let body = req.body;
  conn.query("SELECT Nombre, Ruta FROM Archivo WHERE Usuario_idUsuario = ? AND Visibilidad=1",[body.username], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//Ver Archivos de Amigos
app.get("/misArchivos", async (req, res) => {
  let body = req.body;
  conn.query("SELECT idArchivo, Nombre, Ruta FROM Archivo WHERE Usuario_idUsuario = ?",[body.username], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//Agregar Amigos
app.post("/eliminarArchivo", async (req, res) => {
  let body = req.body;
  conn.query('DELETE FROM Archivo WHERE idArchivo=?', [body.archivo], function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});