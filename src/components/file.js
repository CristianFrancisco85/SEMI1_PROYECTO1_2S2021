import { Card, Image, Row, Button} from "react-bootstrap"
import pdfIcon from '../images/pdfIcon.png'

const File = () =>{

    const addFriend = ()=>{
        alert('Agregado')
    }

    return(
        <Card style={{width:'18em',height:'20em',margin:'1em'}} border="secondary">
            <Card.Header>
                <Card.Title>Archivo.pdf</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row className='justify-content-center'>
                    <Image style={{width:'5em',height:'5em'}}  src={pdfIcon} roundedCircle ></Image>
                </Row>
                <br></br>
                <Card.Text>Propietario : username </Card.Text>
                <Card.Text>Fecha : 29/07/2000</Card.Text>
                <Button variant='warning' block onClick={addFriend}>Ver</Button>
            </Card.Body>
        </Card>

    )
}

export default File