import React, {useState} from 'react'
import { Card, Image,Row} from 'react-bootstrap'
import pdfIcon from '../images/pdfIcon.png'

const Item = (props) =>{

    const [icon,setIcon] = useState(pdfIcon)

    return (
        <React.Fragment >
            <Card style={{width:'10em',height:'10em',margin:'1em'}} border="secondary" >
                <Card.Body>
                    <Row className='justify-content-center'>
                        <Image style={{width:'5em',height:'5em'}}  src={icon}></Image>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <h6>prueba.pdf</h6>
                </Card.Footer>
            </Card>
        </React.Fragment>
        
    )

}

export default Item
