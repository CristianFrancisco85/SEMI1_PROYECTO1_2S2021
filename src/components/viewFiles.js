import { useEffect, useState } from "react"
import { Col, Row, Image, Button, Form, FormControl, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useLoggedUser } from "../contexts/globalContext"
import { BUCKET_URL, searchFiles, viewFiles } from "../dataService"
import userIcon from '../images/userIcon.png'
import File from "./file"
import User from "./user"

const ViewFiles = () => {

    const [user,setUser] = useLoggedUser()
    const [filesList,setFileslist] = useState([])

    useEffect(async ()=>{ 
        await viewFiles(user.idUsuario).then(res =>setFileslist(res))
    },[])

    const handleSearch = async (event)=>{
        event.preventDefault()
        let formData = new FormData(event.target)
        let response = await searchFiles(user.idUsuario,formData.get('Nombre'))
        console.log(response);
        if(response.length==0){
            alert('No se encontro ningun archivo')
        }
        else{
            setFileslist(response)
        }
    }

    return (
        <Container fluid>
        <Row>
            <Col md={3} className='mt-4'>
                <Row className='mt-3 justify-content-center'>
                    <Image src={`${BUCKET_URL}${user.image}`} style={{height:'8em',width:'8em'}} roundedCircle></Image>
                </Row>
                <Row className='mt-3 justify-content-center'>
                    <h3> {user.username} </h3>
                </Row>
                <Row className='mt-3 p-3'>
                    <Button block variant='outline-primary' as={Link} to='/dashboard'>Regresar</Button>
                </Row>
            </Col>

            <Col  className='mt-4'>
            
            <Form inline className='mb-3' onSubmit={(e)=>handleSearch(e)}>
                <FormControl type="text" name="Nombre" placeholder="Nombre Archivo" className="mt-2 mr-2" style={{width:'50em'}}></FormControl>
                <Button type='submit' className='mt-2'> Buscar </Button>
            </Form>

            <Card>
                <Card.Header>
                    <Card.Title>Archivos Publicos</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row className='justify-content-center'>
                    {filesList.map((item)=>{
                        return <File key={item.Ruta} data={item}></File>
                    })}
                    </Row>
                </Card.Body>
                
            </Card>

            </Col>
        </Row>
        </Container>
    )
    

}

export default ViewFiles