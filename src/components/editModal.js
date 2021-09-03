import React, { useEffect } from 'react'
import { Modal,Form,Button,FormGroup,FormControl,FormCheck} from 'react-bootstrap'
import { useLoggedUser } from '../contexts/globalContext'
import { editFile } from '../dataService'
let md5 = require('md5');

const EditModal = (props) =>{

    const visibleProp= props.visible
    const setVisibleHandler = props.handler
    const myFiles = props.filesList?props.filesList:[]
    const [user,setUser] = useLoggedUser()

    const handleEdit = async (event) =>{
        
        event.preventDefault()
        let formData = new FormData(event.target);
        if(user.password!=md5(formData.get('password'))) {alert('Contraseña Incorrecta');return}

        let response = await editFile(formData.get('name'),formData.get('archivo'),formData.get('visibility'))

        if(response?.ok == true) alert('Archivo Editado')
        else alert('Error')

        setVisibleHandler(false)
        
    }

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Editar Archivo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleEdit(e)}>
                <Form.Group>
                    <Form.Label>Selecciona un Archivo</Form.Label>
                    <Form.Control as="select" name='archivo' custom>
                    {myFiles.map((item)=>{
                        return <option value={item.idArchivo} key={item.idArchivo} >{item.Nombre}</option>
                    })}
                    </Form.Control>
                </Form.Group>

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
                <Button variant="warning" type="submit">
                    Editar
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default EditModal