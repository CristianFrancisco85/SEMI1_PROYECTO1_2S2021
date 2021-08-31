import { Col, Row, Image, Button, Form, FormControl, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import userIcon from '../images/userIcon.png'
import File from "./file"
import User from "./user"

const ViewFiles = () => {

    return (
        <Container fluid>
        <Row>
            <Col md={3} className='mt-4'>
                <Row className='mt-3 justify-content-center'>
                    <Image src={userIcon} style={{height:'8em',width:'8em'}} roundedCircle></Image>
                </Row>
                <Row className='mt-3 justify-content-center'>
                    <h3> username </h3>
                </Row>
                <Row className='mt-3 p-3'>
                    <Button block variant='outline-primary' as={Link} to='/dashboard'>Regresar</Button>
                </Row>
            </Col>

            <Col  className='mt-4'>
            
            <Form inline className='mb-3'>
                <FormControl type="text" placeholder="Nombre Archivo" className="mt-2 mr-2" style={{width:'50em'}}></FormControl>
                <Button type='submit' className='mt-2'> Buscar </Button>
            </Form>

            <Card>
                <Card.Header>
                    <Card.Title>Archivos Publicos</Card.Title>
                </Card.Header>
                <Card.Body>
                    <File></File>
                </Card.Body>
                
            </Card>

            </Col>
        </Row>
        </Container>
    )
    

}

export default ViewFiles