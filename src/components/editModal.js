import React from 'react'
import { Modal,Form,Button,FormGroup,FormControl,FormCheck} from 'react-bootstrap'

const EditModal = (props) =>{

    const visibleProp= props.visible
    const setVisibleHandler = props.handler

    const handleUpload = (event) =>{

    }

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Editar Archivo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleUpload(e)}>
                <Form.Group>
                    <Form.Label>Selecciona un Archivo</Form.Label>
                    <Form.Control as="select" name='archivo' custom>
                    <option>prueba1.pdf</option>
                    <option>prueba2.pdf</option>
                    <option>prueba3.pdf</option>
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
                    <FormCheck required inline type="radio" label='Publico' name='visibility' value='0'></FormCheck>
                    <FormCheck required inline type="radio" label='Privado' name='visibility'value='1'></FormCheck>
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