
import React, { useState, useContext } from "react";

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

function EventDisplay() {
    const { selectEvent } = useContext( SelectEvent );

    const [title, setTitle] = useState();
    const [description, setDescription ] = useState();

    const [day , setDay ] = useState();
    const [month, setMonth ] = useState();
    const [year, setYear ] = useState();

    const [hour, setHour ] = useState();
    const [minute, setMin ] = useState();
    const [secound, setSec ] = useState();

    const [shareTo, setShareto ] = useState();
    const [ files , setFiles ] = useState();

    if( selectEvent === null){
      setTitle("No Title");
      setDescription("No Description");
      setDay("0");
      setMonth("0");
      setYear("0");
      setHour("0");
      setMin("0");
      setSec( "0");
      setShareto("No person to share to");
      setFiles( [] );
    }else{
      const {subject, message, send_on, reciepient, file } = selectEvent;
      setTitle( subject );
      setDescription( message );

      const date = new Date(send_on);
      setDay( date.getDate() );
      setMonth( date.getMonth() + 1 );
      setYear(date.get);
      setHour( date.getHours() );
      setMin( date.getMinutes() );
      setSec( date.get);

      setShareto( reciepient );
      setFiles( file );
    }


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h2 style={{textAlign:"center"}} className="description">Create new event</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Share To:</label>
                        <Input
                          type="text"
                          defaultValue={shareTo}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Title:</label>
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
                        <label>Description:</label>
                        <Input
                          type="textarea"
                          defaultValue={description}
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
                      <label>Minutes:</label>
                      <Input
                          type="text"
                          defaultValue={minute}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Secound:</label>
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
                        (files === null ||files === undefined || files.length === 0) ? <p>{"no file uploade"}</p> :
                        files.map( (file) => {
                            return <p key={file[0].name }>{ file[0].name }</p>
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
