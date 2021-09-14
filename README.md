# Manual de Usuario

## Objetivos
<ul>
  <li>Desarrollar una aplicación donde se peudan compartir archivos de manera fácil y que sea accesible desde cualquier dispositivo. </li>
  <li>Brindar un espacio seguro y privado en donde se puedan almacenar archivos y compartirlos solo con las personas que deseas.</li>
</ul>

## U-Storage

<p>
U-storage es una aplicación destinada al almacenamiento y a la distribución controlada de archivos. Brindando acceso desde cualquier dispositivo con conexión a internet, se tiene una plataforma la cual cuenta con una forma segura de acceso y se adapta a cualquier dispositivo en el que se desee visualizar ya que tiene un diseño sensible.

En U-Storage puedes subir los archivos que desees almacenar, estos pueden ser almacenados como archivos públicos y privados, pero no te preocupes ya que tus archivos no son públicos para todo el mundo. Los archivos úblicos solo serán visibles para los usuarios que se tengan agregados como amigos, mientras 6que los priavos solo serán visibles para el usuario que los subió.

Los archivos pueden ser renombrados, cambiados de nivel de privacidad y eliminados de la plataforma de firma sencilla, esto nos permite utilizar la plataforma como un almacen o solo como un método de difusión a un grupo controlado de personas.

Puedes ingresar a la plataforma desde el siguiente enlace:
<a href="http://appweb-13-p1-semi1.s3-website.us-east-2.amazonaws.com/#/login">U-storage</a>
</p>

## Tutorial con capturas

### Registro

<p>
  Para crear una cuenta se debe de llenar el siguiente formulario, en este se puede subir una foto de perfil la cual nos permite personalizar más nuestro perfil y que nos reconozcan más fácil.
</p>
<p align="center">
  <img src="./images/registro.png" width="350" heigth="350">
</p>

### Login

<p>
  En el login se debe de ingresar las credenciales de tu cuenta, de ser bien ingresadas se redireccionará al tablero en donde se puede manejar los archivos y a tus amigos.
</p>
<p align="center">
  <img src="./images/login.png" width="350" heigth="350">
</p>

### Tablero

<p>
  En el siguiente tablero podemos ver las diferentes opciones de lado izquierdo para poder administrar nuestro archivos y relaciones de amistad, así como de lado derecho podemos ver 2 paneles que se contraen en los cuales podemos visualizar nuestroa archivos divididos por su nivel de privacidad.
</p>
<table align="center" width="100%">
    <tr>
        <td>
            <img src="./images/tablero.png">
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/mis_archivos.png">
        </td>
    </tr>
</table>

### Subir Archivos

<p>
  Para subir un archivo se debe completar el siguiente formulario, en este se escoge el archivo que se cargará así como su nombre y su nivel de privacidad.
</p>
<table align="center" width="100%">
    <tr>
        <td>
            <img src="./images/subir.png" width="350" heigth="350">
        </td>
    </tr>
</table>

### Editar Archivos

<p>
  Se puede editar el nombre de los archivos y su nivel de privacidad desde el siguiente formulario, este tiene una lista de selección lo cual permite que se más fácil seleccionar al archivo que se le desean hacer lo cambios.
</p>
<table align="center" width="100%">
    <tr>
        <td>
            <img src="./images/editar.png" width="350" heigth="350">
        </td>
        <td>
            <img src="./images/editar_dd.png" width="350" heigth="350">
        </td>
    </tr>
</table>

### Eliminar Archivos

<p>
  Se pueden eliminar los archivos, este proceso así como los anteriores relacionados con el manejo de archivos utiliza la contraseña de la cuenta como mediad de seguridad. Se tiene una lista desplegable desdes la cual se debe de seleccionar el archivo a elminar.
</p>
<table align="center" width="100%">
    <tr>
        <td>
            <img src="./images/eliminar.png" width="350" heigth="350">
        </td>
        <td>
            <img src="./images/eliminar_dd.png" width="350" heigth="350">
        </td>
    </tr>
</table>

### Agregar Amigos

<p>
    En esta sección se pueden seleccionar se muestran los perfiles de los otros usuarios de la plataforma, desde esta vista podemos buscar usuarios o ver a los que se nos muestran y agrgarlos como amigos para poder ver y compartir archivos.
</p>
<table align="center" width="100%">
    <tr>
        <td>
            <img src="./images/amigos.png">
        </td>
    </tr>
</table>

### Archivos Públicos

<p>
  En esta vista se pueden ver los distintos archivos públicos de todas las cuentas que tenemos agregadas como amigas, también se puede realizar una búsqueda de archivos por nombre para que sea más fácil encontrar el archivo deseado.
</p>
<table align="center" width="100%">
    <tr>
        <td>
            <img src="./images/publicos.png">
        </td>
    </tr>
</table>

# Manual Técnico

## Objetivos

<ul>
    <li>
        Dar a entender la composición del proyecto U-storage desde sus bases y los servicios que lo componen.
    </li>
    <li>
        Explicar cómo se configuraron los distintos servicios de AWS que están implementados en el proyecto.
    </li>
</ul>

## Arquitectura
<p>Toda la plataforma está montada sobre servicios que nos proporciona AWS en la cobertura de su capa gratuita.</p>

### Base de Datos
<p>La base de datos Mysql está montada en una RDS la cual se encuntra dentro de una VPC privada a la que solo se puede acceder desde una EC2 que comaprte esta VPC.</p>

### Almacenamiento de archivos
<p> El almacenamiento de archivos en la nube se hace por medio de S3 con buckets, estos están configurados para que se puedan enviar los archivos desde el backend y que se puedan visualizar desde cualquier parte. </p>

### Front-End
<p>El front-end fue desarrollado con React y este está almacenado en un bucket de S3.</p>

### Back-End
<p>El back-end de NodeJs está montado en 2 EC2 las cuales se dividen la carga con ayuda de un Load Balancer.</p>

## Usuarios IAM

<ul>
    <li>
        Se utiliza un usuario de administración para controlar los servicios de AWS pero mantenernos seguros.
    </li>
    <li>
        Se creó un usuario IAM para el acceso a los buckets de S3.
    </li>
</ul>

## Configuración de los servicios
<p>
A continuación se muestra la configuración de los distintos servicios.
</p>

### S3

<table>
    <tr>
        <td>
            <img src="./images/s3_1.png" heigth="350">
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/s3_2.png">
        </td>
    </tr>
</table>

### VPC

<table>
    <tr>
        <td>
            <h3>Subnets</h3>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/vpc_1.jpeg" heigth="350">
        </td>
    </tr>
    <tr>
        <td>
            <h3>Rout Tables VPC Privada</h3>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/vpc_2.jpeg" heigth="350">
        </td>
    </tr>
    <tr>
        <td>
            <h3>Rout Tables VPC Pública</h3>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/vpc_3.jpeg" heigth="350">
        </td>
    </tr>
</table>

### RDS


<table>
    <tr>
        <td>
            <img src="./images/rds_1.jpeg" heigth="350">
        </td>
    </tr>
</table>

### EC2


<table>
    <tr>
        <td>
            <img src="./images/ec2_1.jpeg" heigth="350">
        </td>
    </tr>
    <tr>
        <td>
            <h3>EC2 1</h3>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/ec2_2.jpeg" heigth="350">
        </td>
    </tr>
    <tr>
        <td>
            <h3>EC2 2</h3>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/ec2_3.jpeg" heigth="350">
        </td>
    </tr>
</table>


### Load Balancer


<table>
    <tr>
        <td>
            <img src="./images/load_1.jpeg" heigth="350">
        </td>
    </tr>
    <tr>
        <td>
            <h3>Registered Targets</h3>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./images/load_2.jpeg" heigth="350">
        </td>
    </tr>
</table>

## Conclusiones

<ul>
    <li>
        AWS no proporciona distintos servicios dentro de su capa gratuita lo cual nos permite realizar plataformas como U-storage. Esto nos permite practicar con estos servicios y poder aprender más a cómo utilizarlos y realizar más proyectos en la nube.
    </li>
    <li>
        Poder realizar proyectos como U-Storage nos permite expetimentar con las implementaciones en la nube, lo cual nos brinda experiencias que son realmente útiles para poder comprender e incursionarnos en este nuevo ámbito.
    </li>
</ul>
