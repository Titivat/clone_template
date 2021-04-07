/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useContext } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import { SelectEvent } from '../../contexts/SeletedEvent';
import * as API from '../../api'

function EventList() {
  const { setSelectEvent } = useContext( SelectEvent );
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const data = null
    const response = API.get( '',data );

    if( Object.prototype.toString.call(response) === "[object Error]" ){
      alert("Error " + response.message);

    }else{
      setEventList( [{
          "subject": "Update the Documentation",
          "message": "Dwuamish Head, Seattle, WA 8:47 AM",
          "send_on": "2021-04-06T11:34:19+0000",
          "reciepient": "hanaegypti@dikitin.com",
          "file": [],
        },{
          "subject": "GDPR Compliance",
          "message": "The GDPR is a regulation that requires businesses to protect the personal data and privacy of Europe citizens for transactions that occur within EU member states.",
          "send_on": "2023-04-06T00:00:00+0000",
          "reciepient": "xgleizer.carvalh@roofter.com",
          "file": [],
        },
      ]);
    }
  }, []);

  const handleSeletectedEvent = ( event ) => {
    setSelectEvent( event )
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Event({eventList.length})</h6>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      {
                        eventList.map( (event) => {
                          return (<tr key={ event.subject } onClick={ () => handleSeletectedEvent( event )}>
                                    <td>
                                      <p className="title">{ event.subject }</p>
                                      <p className="text-muted">{ event.message }</p>
                                    </td>
                                    <td className="td-actions text-right">
                                      <Button
                                        color="link"
                                        id="tooltip217595172"
                                        title=""
                                        type="button"
                                      >
                                        <i className="tim-icons icon-trash-simple" />
                                      </Button>
                                      <UncontrolledTooltip
                                        delay={0}
                                        target="tooltip217595172"
                                        placement="right"
                                      >
                                        Delete Event
                                      </UncontrolledTooltip>
                                    </td>
                                  </tr>
                          )
                      })
                      }
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EventList;
