import React from 'react'
import { Modal,Form,Button,FormGroup,FormControl,FormCheck} from 'react-bootstrap'
import { useLoggedUser } from '../contexts/globalContext'
import { deleteFile } from '../dataService'
let md5 = require('md5');

const DeleteModal = (props) =>{

    const visibleProp= props.visible
    const setVisibleHandler = props.handler

    const myFiles = props.filesList?props.filesList:[]
    const [user,setUser] = useLoggedUser()

    const handleDelete = async (event) =>{
        
        event.preventDefault()
        let formData = new FormData(event.target);
        if(user.password!=md5(formData.get('password'))) {alert('Contraseña Incorrecta');return}

        let response = await deleteFile(formData.get('archivo'))

        if(response?.ok == true) alert('Archivo Eliminado')
        else alert('Error')

        setVisibleHandler(false)
    }

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Eliminar Archivo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleDelete(e)}>
                <Form.Group>
                    <Form.Label>Selecciona un Archivo</Form.Label>
                    <Form.Control as="select" name='archivo' custom>
                    {myFiles.map((item)=>{
                        return <option value={item.idArchivo} key={item.idArchivo} >{item.Nombre}</option>
                    })}
                    </Form.Control>
                </Form.Group>

                <FormGroup>
                    <Form.Label>Contraseña</Form.Label>
                    <FormControl required type="password" name="password"/>
                </FormGroup> 

                <hr></hr>
                <Button variant="danger" type="submit">
                    Eliminar
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default DeleteModal