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
import { OnEventList } from '../../contexts/OnEventList';
import * as API from '../../api'

function EventList() {
  const { setSelectEvent } = useContext( SelectEvent );
  const { setOnEventList } = useContext( OnEventList );
  const [eventList, setEventList] = useState([]);

  useEffect( () => {
    try{
      const token = localStorage.getItem("token");
      API.getWithToken('/api/mail/', token).then(
        ( response ) => setEventList( response.data )
      );
      
    }catch (err) {
      //alert("Error " + err.message);
    }
  }, []);

  const handleSeletectedEvent = ( event ) => {
    setSelectEvent( event );
    setOnEventList( false );
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
