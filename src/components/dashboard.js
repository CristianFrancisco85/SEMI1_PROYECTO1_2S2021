import React, { useState,useEffect } from "react"
import { Col, Container, Image, Row, Card, Accordion } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import userIcon from '../images/userIcon.png'
import Item from './item'
import UploadModal from "./uploadModal"
import EditModal from "./editModal"
import DeleteModal from "./deleteModal"
import { Link } from "react-router-dom"
import { useLoggedUser } from "../contexts/globalContext"
import { BUCKET_URL, getMyFiles } from "../dataService"

const Dashboard = () =>{

    const [user,setUser] = useLoggedUser()
    const [myFiles,setMyFiles] = useState([])

    const [uploadModal,setUploadModal] = useState(false)
    const [editModal,setEditModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)

    useEffect(async () => {
        await getMyFiles(user.idUsuario).then(res=>setMyFiles(res))
        console.log(myFiles);
    },[])

    return(
        <Container fluid>
            <Row>
            <Col md={3} className='mt-4'>
                <Row className='mt-3 justify-content-center'>
                    <Image src={`${BUCKET_URL}${user.image}`} style={{height:'8em',width:'8em'}} roundedCircle></Image>
                </Row>
                <Row className='mt-3 justify-content-center'>
                    <h3>{user.username}</h3>
                </Row>
                <Row className='mt-3 pl-2 pr-2'>
                    <Button block variant='primary' onClick={()=>setUploadModal(true)}>Subir Archivo</Button>
                    <UploadModal visible={uploadModal} handler={setUploadModal}></UploadModal>
                </Row>
                <Row className='mt-3 pl-2 pr-2'>
                    <Button block variant='warning' onClick={()=>setEditModal(true)}>Editar Archivo</Button>
                    <EditModal visible={editModal} filesList={myFiles} handler={setEditModal}></EditModal>
                </Row>
                <Row className='mt-3 pl-2 pr-2'>
                    <Button block variant='danger' onClick={()=>setDeleteModal(true)}>Eliminar Archivo</Button>
                    <DeleteModal visible={deleteModal} filesList={myFiles} handler={setDeleteModal}></DeleteModal>
                </Row>
                <Row className='mt-3 pl-2 pr-2'>
                    <Button block variant='success' as={Link} to='/addfriend'>Agregar Amigo</Button>
                </Row>
                <Row className='mt-3 pl-2 pr-2'>
                    <Button block variant='info' as={Link} to='/viewfiles'>Ver Archivos Publicos</Button>
                </Row>
            </Col>
            <Col className='mt-5'>

                <Accordion>
                    <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Card.Title>Publicos</Card.Title>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0" className='overflow-auto mt-1' style={{maxHeight:'26rem'}}>
                    <Card.Body >
                        <Row className='justify-content-center'>
                            {myFiles.map((item)=>{
                                if(item.Visibilidad==1){
                                    return <Item key={item.idArchivo} data={item}></Item>
                                }
                            })}
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                    
                </Card>
                </Accordion>

                <Accordion>
                    <Card>

                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Card.Title>Privados</Card.Title>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0" className='overflow-auto mt-1' style={{maxHeight:'26rem'}}>
                    <Card.Body >
                        <Row className='justify-content-center'>
                            {myFiles.map((item)=>{
                                if(item.Visibilidad==0){
                                    return <Item key={item.idArchivo} data={item}></Item>
                                }
                            })}               
                        </Row>
                    </Card.Body>
                    </Accordion.Collapse>
                    
                    </Card>
                </Accordion>
            </Col>
            </Row>
        </Container>
    )
}




export default Dashboard