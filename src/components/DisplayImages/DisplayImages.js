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
import React, { useState, useEffect} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
} from "reactstrap";

//import * as API from '../../api'

function DisplayImages() {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState( false );

  useEffect( () => {
    handleChangedata();
  }, []);

  const handleChangedata = async () => {
    try{
      setIsLoading( true );
      setEventList(
          [
              {
                  url:"https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
                  name: "image1"
              },
              {
                url:"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
                name: "image2"
            },
            {
                url:"https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg",
                name: "image3"
            },
          ]
      )
      //const token = localStorage.getItem("token");
      //const response = await API.getWithToken('/api/mail/', token)
      //setEventList( response.data )
      setIsLoading( false );
    }catch (err) {
      alert("Error " + err.message);
    }
  }

  const onHover = ( id ) => {
    var mydisplay = document.getElementById( id );
    const value = mydisplay.style.display;
    if (value === 'block') {
      mydisplay.style.display = 'none';
      return;
    }
    mydisplay.style.display = 'block';
    //console.log("Am I here?")
    //inputEl.current.style.display = "";
    //inputEl.current.style.background = "red";
  }

  return (
    <>
      <div className="content">
        {(isLoading)&& <p style={{textAlign:"center", color:"red"}}>Loading</p>}
        <Row>
          <Col lg="12" md="12">
            <Card style={{height:"100vh"}} className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Files ({eventList.length}) </h6>
              </CardHeader>
              <CardBody>
                <div style={{ height: "80vh",overflowY: "scroll"}} className="table-responsive">
                  <Table>
                    <thead>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Last Modified</td>
                    </thead>
                    <tbody style={{ height: "200px",overflowY: "scroll"}}>
                      {
                        eventList.map( (event) => {
                          return (<><tr onClick={() => onHover( event.name) } key={ event.name }>
                                    <td>
                                        <a href={event.name} className="title"><i style={{margin:"0 10px"}} className="tim-icons icon-single-copy-04" />{ event.name }</a>
                                        <Button
                                          color="link"
                                          id="tooltip217595172"
                                          title=""
                                          type="button"
                                        >
                                          <i className="tim-icons" />
                                        </Button>
                                      </td>
                                      <td className="td-actions text-left">
                                        Type
                                      </td>
                                      <td className="td-actions text-left">
                                        Last Modified
                                      </td>
                                    </tr>
                                    <tr >
                                      <img id={ event.name } alt={ event.name } style={{display:"none",width: "400px"}} src={ event.url} ></img>
                                    </tr>
                                  </>
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

export default DisplayImages;
