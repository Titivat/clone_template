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
  Input,
} from "reactstrap";

import * as API from '../../api'

function DisplayImages() {
  const [eventList, setEventList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [isLoading, setIsLoading] = useState( false );

  useEffect( () => {
    handleChangedata();
  }, []);

  const handleChangedata = async () => {
    try{
      setIsLoading( true );
      const token = localStorage.getItem("token");
      const reponse = await API.getWithToken('/api/file/', token )
      console.log("hello world")
      console.log(reponse.data)

      const data = reponse.data
      var setObj = new Set();
      var result = data.reduce((acc,item)=>{
        if(!setObj.has(item.file_name)){
          setObj.add(item.file_name)
          acc.push(item)
        }
        return acc;
      },[]);
      setTempList(result)
      setEventList(result)
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
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = eventList.filter((data) => {
      return data.file_name.search(value) != -1;
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
          <Col>
            <Card>
              <Input
                type="text"
                placeholder="search"
                onChange={ (event) => handleSearch(event)}
              />
            </Card>
          </Col>
        </Row>
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
                    </thead>
                    <tbody style={{ height: "200px",overflowY: "scroll"}}>
                      {
                        eventList.map( (event) => {
                          return (<><tr onClick={() => onHover( event.file_name) } key={ event.file_name }>
                                    <td>
                                        <a className="title" rel="noreferrer"><i style={{margin:"0 10px"}} className="tim-icons icon-single-copy-04" />{ event.file_name }</a>
                                        <Button
                                          color="link"
                                          id="tooltip217595172"
                                          title=""
                                          type="button"
                                        >
                                          <i className="tim-icons" />
                                        </Button>
                                      </td>
                                    </tr>
                                    <tr >
                                      <img id={ event.file_name } alt={ event.file_download_url } style={{display:"none",width: "400px"}} src={ event.file_download_url} ></img>
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
