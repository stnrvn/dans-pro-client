import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Navbar,
  Form,
  Button,
  Card
} from 'react-bootstrap'
import { getJob } from '../../helpers/api/job'
import moment from 'moment/moment'
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [param, setParam] = useState({})
  const [page, setPage] = useState(1)

  const fetchJobs = async() => {
    let payloadParam = ''
    if (param) {
      Object.entries(param).forEach(([key, value], index) => {
        if(value !== '') {
          payloadParam += `${index === 0 ? '?' : '&'}${key}=${value}`
        }
      });
    }
    const response = await getJob(payloadParam)

    if (!response.error) {
      setJobs(response.data)
    }
  }

  const onChange = (e) => {
    const { name, value, checked, type } = e.target;

    const newVal = type === "checkbox" ? checked : value;
    
    if (newVal === '' || newVal === false) {
      let paramResult = {...param}
      delete paramResult[name]

      setParam(paramResult)
    } else {
      setParam({
        ...param,
        [name]: newVal
      })
    }
  
  }

  const handleSubmitParam = async (e) => {
    try {
      e.preventDefault();
      let payloadParam = ''
      if (param) {
        Object.entries(param).forEach(([key, value], index) => {
          if(value !== '') {
            payloadParam += `${index === 0 ? '?' : '&'}${key}=${value}`
          }
        });
      }

      await fetchJobs(payloadParam)
    } catch (error) {
      // setShowModal(true)
      // setModalMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchJobs()
  },[])

  return(
    <>
      <Navbar bg="primary">
        <Container fluid>
          <Navbar.Brand href="#home" className="text-white">
            <span className="fw-bold">Github</span> Jobs
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <Row className="mt-3">
          <Form onSubmit={handleSubmitParam}>
            <Row>
              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Job Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by title, benefits, companies, expertise"
                    name="description"
                    className="shadow"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by city, state, zip, or code country"
                    name="location"
                    className="shadow"
                    onChange={(e) => onChange(e)}
                  />
                </Form.Group>
              </Col>

              <Col lg={2} className="d-flex align-items-center mt-4">
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Full time only" name="full_time" onChange={(e) => onChange(e)} />
                </Form.Group>
              </Col>

              <Col lg={2} className="d-flex align-items-center mt-2">
                <Button variant="primary" type="submit" className="btn-block w-75">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row className="mb-4">
          <Container>
            <Card className="border-0 shadow-lg">
              <Card.Body>
                <h3>Job List</h3>
                <div className="border-bottom mt-3"/>
                {jobs.filter(item => item !== null).map(item => (
                  <>
                  <Row className="mt-3" key={item.id}>
                    <Col lg={6}>
                      <Link to={`job/${item.id}`} className="text-decoration-none">
                        <p className="text-primary fw-bold">{item.title}</p>
                      </Link>
                      <p className="text-muted">{item.company} - <span className="text-success fw-bold">{item.type}</span></p>
                    </Col>
                    <Col lg={6} className="text-end">
                      <p>{item.location}</p>
                      <p className="text-muted">{moment(item.created_at).fromNow()}</p>
                    </Col>
                  </Row>
                  <div className="border-bottom mt-3"/>
                </>
                ))}
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-block w-100 mt-3"
                  onClick={() => {
                    let currentPage = page
                    currentPage++
                    setPage(currentPage)
                    let result = {...param}
                    param.page = currentPage
                    setParam(result)
                    fetchJobs()
                  }}
                >
                  More Jobs
                </Button>
              </Card.Body>
            </Card>
          </Container>
        </Row>
      </Container>
    </>
  )
}

export default Home