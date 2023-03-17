import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Navbar,
    Card
  } from 'react-bootstrap'
import { getJobById } from '../../../helpers/api/job'
import purify from 'dompurify'

const JobDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [jobData, setJobData] = useState({})

  const fetchJobById = async() => {
    const response = await getJobById(id)

    if (!response.error) {
      setJobData(response.data)
    }
  }

  useEffect(() => {
    fetchJobById()
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

      <Container fluid className="mt-3">
        <p role="button" className="text-primary" onClick={() => navigate(-1)}>back</p>
      </Container>

      <Container fluid>
        <Card className="border-0 shadow-lg mt-3">
          <Card.Body>
            <h6 className="text-muted">{jobData.type} / {jobData.location}</h6>
            <h3>{jobData.title}</h3>
            <div className="border-bottom mt-3"/>
            <Row className="mt-3">
              <Col lg={8}>
                <div
                  dangerouslySetInnerHTML={{__html: purify.sanitize(jobData.description)}}
                />
              </Col>
              <Col lg={4}>
                <Row>
                  <Card className="border-0 shadow-lg mt-3">
                    <Card.Body>
                      <p>{jobData.company}</p>
                      <div className="border-bottom mt-3"/>
                      <img src={jobData.company_logo} className="mt-3" />
                      <a href="https://www.mandarin-medien.de/">https://www.mandarin-medien.de/</a>
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="border-0 shadow-lg mt-3">
                    <Card.Body>
                      <p>How to apply</p>
                      <div className="border-bottom mt-3"/>
                      <div
                        className="mt-3"
                        dangerouslySetInnerHTML={{__html: purify.sanitize(jobData.how_to_apply)}}
                      />
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default JobDetail
