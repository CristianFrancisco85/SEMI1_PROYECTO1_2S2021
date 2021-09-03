import { Card, Image, Row, Button} from "react-bootstrap"
import { BUCKET_URL } from "../dataService"
import pdfIcon from '../images/pdfIcon.png'
import imageIcon from '../images/imageIcon.png'
import { useEffect, useState } from "react"

const File = (props) =>{

    const itemData=props.data
    const [icon,setIcon] = useState(undefined)

    useEffect(()=>{
        let aux = itemData.Nombre.split('.')
        if(aux[1]=='pdf'){
            setIcon(pdfIcon)
        }
        else{
            setIcon(imageIcon)
        }
    },[])

    return(
        <Card style={{width:'18em',height:'20em',margin:'1em'}} border="secondary">
            <Card.Header>
                <Card.Title>{itemData.Nombre}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row className='justify-content-center'>
                    <Image style={{width:'5em',height:'5em'}}  src={icon} ></Image>
                </Row>
                <br></br>
                <Card.Text>Propietario : {itemData.propietario} </Card.Text>
                <a href={`${BUCKET_URL}${itemData.Ruta}`}>
                <Button variant='warning' block>Ver</Button>
                </a>
            </Card.Body>
        </Card>

    )
}

export default File