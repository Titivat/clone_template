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
  Input
} from "reactstrap";

import { SelectEvent } from '../../contexts/SeletedEvent';
import { OnEventList } from '../../contexts/OnEventList';
import * as API from '../../api'

function EventList() {
  const { setSelectEvent } = useContext( SelectEvent );
  const { setOnEventList } = useContext( OnEventList );
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState( false );
  const [tempList, setTempLisat] = useState();

  useEffect( () => {
    handleChangedata();
  }, []);

  const handleChangedata = async () => {
    try{
      setIsLoading( true );
      const token = localStorage.getItem("token");
      const response = await API.getWithToken('/api/mail/', token)
      const tempValue = response.data.reverse()
      setTempLisat( tempValue )
      setEventList( tempValue )
      setIsLoading( false );
    }catch (err) {
      alert("Error " + err.message);
    }
  }
  const handleSeletectedEvent = ( event ) => {
    console.log( event );
    setSelectEvent( event );
    setOnEventList( false );
  }

  const handleDelete = async ( key ) => {
    const token = localStorage.getItem("token");
    await API.deleteWithToken(`/api/mail/${key}/`, token);
    await handleChangedata();
  }

  const handleSeach = (event) => {
    let value = event.toLowerCase();
    let result = [];
    console.log(value);
    result = eventList.filter((data) => {
      return data.subject.search(value) != -1;
    });
    setEventList(result);
    if(eventList.length === 0 | value === ""){
      setEventList(tempList);
    }
  }

  return (
    <>
      <div className="content">
        {(isLoading)&& <p style={{textAlign:"center", color:"red"}}>Loading</p>}
        <Row>
          <Col lg="12" md="12">
            <Card>
              <Input
                style={{height:"50px"}}
                type="text"
                placeholder="search"
                onChange={(event)=> handleSeach(event.target.value)}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <Card style={{height:"100vh"}} className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">CAPSULE({eventList.length})</h6>
              </CardHeader>
              <CardBody>
                <div style={{ height: "80vh",overflowY: "scroll"}} className="table-responsive">
                  <Table>
                    <tbody style={{ height: "200px",overflowY: "scroll"}}>
                      {
                        eventList.map( (event) => {
                          return (<tr key={ event.subject }>
                                    <td  onClick={ () => handleSeletectedEvent( event )}>
                                      <p className="title">{ event.subject }</p>
                                      <p className="text-muted">{ event.message }</p>
                                    </td>
                                    <td className="td-actions text-right">
                                      <Button
                                        color="link"
                                        id="tooltip217595172"
                                        title=""
                                        type="button"
                                        onClick={ () => handleDelete( event.id ) }
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
