import {Container,Row,Col} from 'react-bootstrap'



const footer = () => {
    const currentYear=new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p>proshop {currentYear} </p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default footer