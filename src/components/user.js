import { Card, Image, Row, Button} from "react-bootstrap"
import userIcon from '../images/userIcon.png'

const User = () =>{

    const addFriend = ()=>{
        alert('Agregado')
    }

    return(
        <Card style={{width:'20em',height:'20em',margin:'1em'}} border="secondary">
            <Card.Header>
                <Card.Title>Usuario1</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row className='justify-content-center'>
                    <Image style={{width:'6em',height:'6em'}}  src={userIcon} roundedCircle ></Image>
                </Row>
                <br></br>
                <Card.Text>Tiene 10 archivos publicos</Card.Text>
                <Button variant='success' block onClick={addFriend}>Agregar a Amigos</Button>
            </Card.Body>
        </Card>

    )
}

export default User