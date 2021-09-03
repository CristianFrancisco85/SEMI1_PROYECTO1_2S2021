import { Card, Image, Row, Button} from "react-bootstrap"
import { useLoggedUser } from "../contexts/globalContext"
import { BUCKET_URL, makeFriend } from "../dataService"
import userIcon from '../images/userIcon.png'

const User = (props) =>{

    const userData= props.data
    const [user,setUser] = useLoggedUser()

    const addFriend = async ()=>{

        let response = await makeFriend(user.idUsuario,userData.idUsuario)

        if(response?.ok == true) alert('Amigo Agregado')
        else alert('Error')

    }

    return(
        <Card style={{width:'20em',height:'20em',margin:'1em'}} border="secondary">
            <Card.Header>
                <Card.Title>{userData.username}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row className='justify-content-center'>
                    <Image style={{width:'6em',height:'6em'}}  src={`${BUCKET_URL}${userData.image}`} roundedCircle ></Image>
                </Row>
                <br></br>
                <Card.Text>Tiene {userData.archivos} archivos publicos</Card.Text>
                <Button variant='success' block onClick={addFriend}>Agregar a Amigos</Button>
            </Card.Body>
        </Card>

    )
}

export default User