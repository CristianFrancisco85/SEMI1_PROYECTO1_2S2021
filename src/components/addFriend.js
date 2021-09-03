import { useEffect, useState } from "react"
import { Col, Row, Image, Button, Form, FormControl, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useLoggedUser } from "../contexts/globalContext"
import { BUCKET_URL, getUsuarios, searchUser } from "../dataService"
import userIcon from '../images/userIcon.png'
import User from "./user"

const AddFriend = () => {

    const [user,setUser] = useLoggedUser()
    const [userArr,setUserArr] = useState([])

    useEffect(async () =>{
        await getUsuarios().then(res => setUserArr(res))
        console.log(userArr);
    },[])

    const handleSearch = async (event)=>{

        event.preventDefault()
        let formData = new FormData(event.target)
        let response = await searchUser(formData.get('Username'))

        if(response.length==0){
            alert('No se encontro ningun usuario')
        }
        else{
            setUserArr(response)
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
            
            <Form inline className='mb-3' onSubmit={(e)=>handleSearch(e)} >
                <FormControl type="text" placeholder="Username" name="Username" className="mt-2 mr-2" style={{width:'50em'}}></FormControl>
                <Button type='submit' className='mt-2' > Buscar </Button>
            </Form>

            <Card>
                <Card.Header>
                    <Card.Title>Usuarios</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row className='justify-content-center'>
                    {userArr.map((item)=>{
                        if(item.idUsuario!=user.idUsuario){
                            return <User key={item.idUsuario} data={item}></User>
                        }
                    })}
                    </Row>
                </Card.Body>
                
            </Card>

            </Col>
        </Row>
        </Container>
    )
    

}

export default AddFriend