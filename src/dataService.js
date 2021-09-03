
let md5 = require('md5');
let API_URL = 'http://localhost:9000'
export const BUCKET_URL = 'https://archivos-13--p1.s3.us-east-2.amazonaws.com/'


export let createUser = async (email,username,password,image) => {
    let response;
    let data={email,username,password:md5(password),image,ext:'.jpg'}
    await fetch(`${API_URL}/crearUsuario`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let loginUser = async (username,password) => {
    let response;
    let data={username,password:md5(password)}
    await fetch(`${API_URL}/login`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let getMyFiles = async (idUsuario) => {
    let response;
    let data={idUsuario}
    await fetch(`${API_URL}/misArchivos`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}


export let uploadFile = async (nombre,idUsuario,visibilidad,data,ext) => {
    let response;
    let Data={nombre,usuario:idUsuario,visibilidad,data,ext}
    await fetch(`${API_URL}/subirArchivo`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let editFile = async (nombre,idArchivo,visibilidad) => {
    let response;
    let Data={nombre,idArchivo,visibilidad}
    await fetch(`${API_URL}/editarArchivo`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let deleteFile = async (idArchivo) => {
    let response;
    let Data={idArchivo}
    await fetch(`${API_URL}/eliminarArchivo`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let getUsuarios = async () => {
    let response;
    await fetch(`${API_URL}/getUsuarios`,{
        method: 'GET',
    }).then((res)=>response=res.json())
    return response
}

export let makeFriend = async (usuario1,usuario2) => {
    let response;
    let Data={usuario1,usuario2}
    await fetch(`${API_URL}/agregarAmigos`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let searchUser = async (username) => {
    let response;
    let Data={username}
    await fetch(`${API_URL}/buscarUsuario`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let viewFiles = async (idUsuario) => {
    let response;
    let Data={idUsuario}
    await fetch(`${API_URL}/verArchivos`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}

export let searchFiles = async (idUsuario,nombre) => {
    let response;
    let Data={idUsuario,nombre}
    console.log(Data);
    await fetch(`${API_URL}/buscarArchivo`,{
        method: 'POST',
        body: JSON.stringify(Data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>response=res.json())
    return response
}


export let encodeBase64 = async (myblob) =>{

    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(myblob);
    });
}

