
import React, { useContext } from "react";

// reactstrap components
import {
  // Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { SelectEvent } from '../../contexts/SeletedEvent';
import { OnEventList } from '../../contexts/OnEventList';

function EventDisplay() {
  const { selectEvent } = useContext( SelectEvent );
  const { setOnEventList } = useContext( OnEventList );

  const {subject, message, send_on, reciepient, file_list , instagram_id, twitter_id} = selectEvent;
  console.log("Event display");
  console.log(file_list);

  const title = subject;
  const description = message;
  const shareTo = reciepient;

  const date = new Date(send_on);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();;
  const hour = date.getHours();
  const minute = date.getMinutes();
  const secound = date.getSeconds();

  const handleChagePage = () => {
    setOnEventList( true );
  }

  return (
    <>
        <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <i onClick={() => handleChagePage() } className="tim-icons icon-double-left" />
                <h2 style={{textAlign:"center"}} className="description">Display event</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Correspondent:</label>
                        <Input
                          type="text"
                          defaultValue={shareTo}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Subject:</label>
                        <Input
                          type="text"
                          defaultValue={title}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Body:</label>
                        <Input
                          type="textarea"
                          defaultValue={description}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-2" md="6">
                      <FormGroup style={{margin:"0 15px"}}>
                          <label>instagram id:</label>
                          <Input
                            type="text"
                            defaultValue={instagram_id}
                            disabled
                          />
                        </FormGroup>
                    </Col>
                    <Col className="pr-md-2" md="6">
                      <FormGroup style={{margin:"0 15px"}}>
                        <label>twitter id:</label>
                        <Input
                          type="text"
                          defaultValue={twitter_id}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="1.5">
                      <FormGroup style={{margin:"0 15px"}}>
                        <label>Day:</label>
                        <Input
                          type="text"
                          defaultValue={day}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="1.5">
                      <FormGroup>
                      <label>Month:</label>
                      <Input
                          type="text"
                          defaultValue={month}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="2">
                      <FormGroup>
                      <label>Year:</label>
                      <Input
                          type="text"
                          defaultValue={year}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Hour:</label>
                      <Input
                          type="text"
                          defaultValue={hour}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Minute:</label>
                      <Input
                          type="text"
                          defaultValue={minute}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Second:</label>
                      <Input
                          type="text"
                          defaultValue={secound}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                      {
                        (file_list === null ||file_list === undefined || file_list.length === 0) ? <p>{"No file attached."}</p> :
                        file_list.map( (file) => {
                            return <>
                              <a style={{fontSize: "15px"}} target="_blank" href={file.file_download_url} key={file.file_name } rel="noreferrer">{file.file_name }</a>
                              <br/>
                              <br/>
                            </>
                        })
                      }
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EventDisplay;
