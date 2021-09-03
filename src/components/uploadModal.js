import React,{useState}from 'react'
import { Modal,Form,Button,FormGroup,FormControl,FormCheck} from 'react-bootstrap'
import { useLoggedUser } from '../contexts/globalContext'
import { uploadFile,encodeBase64 } from '../dataService'
let md5 = require('md5');

const UploadModal = (props) =>{

    
    const visibleProp= props.visible
    const setVisibleHandler = props.handler
    const [user,setUser]= useLoggedUser()
    const [base64File,setBase64File] = useState(undefined)

    const handleUpload = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target);
        if(user.password!=md5(formData.get('password'))) {alert('Contraseña Incorrecta');return}

        let nombreArchivo = formData.get('name').split('.')[0]
        let extension = '.'+formData.get('name').split('.')[1]

        let response = await uploadFile(nombreArchivo,user.idUsuario,formData.get('visibility'),base64File,extension)

        if(response?.ok == true) alert('Archivo Subido')
        else alert('Error')

        setVisibleHandler(false)
    }

    const handleUploadFile = async (event) =>{
        let base64=await encodeBase64(event.target.files[0])
        base64 = base64.replace('data:image/png;base64,','')
        base64 = base64.replace('data:image/jpeg;base64,','')
        base64 = base64.replace('data:application/pdf;base64,','')
        setBase64File(base64)
    }

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Subir Archivo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleUpload(e)}>
                <FormGroup className="mb-3">
                    <FormControl type="file"  onChange={async (e)=> await handleUploadFile(e)}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Nombre de Archivo</Form.Label>
                    <FormControl required type="text" name="name"/>
                </FormGroup> 

                <FormGroup>
                    <Form.Label>Contraseña</Form.Label>
                    <FormControl required type="password" name="password"/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Visibilidad</Form.Label>
                    <br></br>
                    <FormCheck required inline type="radio" label='Publico' name='visibility' value='1'></FormCheck>
                    <FormCheck required inline type="radio" label='Privado' name='visibility'value='0'></FormCheck>
                </FormGroup>
                <hr></hr>
                <Button variant="primary" type="submit">
                    Subir
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default UploadModal