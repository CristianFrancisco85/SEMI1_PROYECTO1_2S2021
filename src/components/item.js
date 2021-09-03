import React, {useEffect, useState} from 'react'
import { Card, Image,Row} from 'react-bootstrap'
import pdfIcon from '../images/pdfIcon.png'
import imageIcon from '../images/imageIcon.png'
import { BUCKET_URL } from '../dataService'

const Item = (props) =>{

    const [icon,setIcon] = useState(undefined)
    const itemData = props.data

    useEffect(()=>{
        let aux = itemData.Nombre.split('.')
        if(aux[1]=='pdf'){
            setIcon(pdfIcon)
        }
        else{
            setIcon(imageIcon)
        }
    },[])

    return (
        <React.Fragment >
            <Card style={{width:'10em',height:'10em',margin:'1em'}} border="secondary" >
                <Card.Body>
                    <Row className='justify-content-center'>
                        <a href={BUCKET_URL+itemData.Ruta}>
                        <Image style={{width:'5em',height:'5em'}}  src={icon}></Image>
                        </a>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <h6>{itemData.Nombre}</h6>
                </Card.Footer>
            </Card>
        </React.Fragment>
        
    )

}

export default Item
