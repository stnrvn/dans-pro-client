import { useState } from 'react';
import { 
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal
} from 'react-bootstrap'
import { login } from '../../helpers/api/auth'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [payloadLogin, setPayloadLogin] = useState({
    email: '',
    password: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const onChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newVal = type === "checkbox" ? checked : value;

    setPayloadLogin({
      ...payloadLogin,
      [name]: newVal
    })
  }

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await login(payloadLogin)

      if (!response.error) {
        localStorage.setItem("authUser", JSON.stringify(response.message))
        navigate("/")
      }
    } catch (error) {
      setShowModal(true)
      setModalMessage(error.response.data.message)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return(
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center mt-5">
          <Col lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body>
                <Form onSubmit={handleSubmitLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => onChange(e)}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onChange(e)} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton className='border-0'/>
        <Modal.Body className="mt-3 mb-5 text-center text-danger fw-bold">{modalMessage}</Modal.Body>
      </Modal>
    </>
  )
}

export default Login