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
import React, { useState } from "react";
import * as API  from '../api';
import * as Func from '../function'

// reactstrap components
import {
  Button,
  Card,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";


function NewEvent() {
  const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const [ files, setFiles ] = useState( null );
  const [ filesName, setFilesName ] = useState(null);
  const [shareTo, setshareTo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [day, setDay] = useState("Day ⬇");
  const [month, setMonth] = useState(new Date().getMonth() + 1 );
  const [year, setYear] = useState("Year ⬇");

  const [hour, setHour] = useState("Hour ⬇");
  const [minute, setMinute] = useState("Minute ⬇");
  const [secound, setSecound] = useState("Secound ⬇");

  const monthToDay = { 1: "31", 2: "28", 3: "31", 4: '30', 5: '31', 6: "30", 7: "31", 8: '31', 9: '30', 10: '31', 11: '30', 12: '31' }
  const days = range(1, monthToDay[month]);
  const months = range(1, 12);
  const nowYear = new Date().getFullYear();
  const years = range(nowYear, nowYear + 100);

  const hours = range(0, 23);
  const minutes = range(0, 59);
  const secounds = range(0, 59);

  const [isLoading, setIsLoading] = useState(false);

  const [dropdownOpenDay, setdropdownOpenDay] = useState(false);
  const toggleOpenDay = () => setdropdownOpenDay(prevState => !prevState);

  const [dropdownOpenMonth, setdropdownOpenMonth] = useState(false);
  const toggleOpenMonth = () => setdropdownOpenMonth(prevState => !prevState);

  const [dropdownOpenYear, setdropdownOpenYear] = useState(false);
  const toggleOpenYear = () => setdropdownOpenYear(prevState => !prevState);

  const [dropdownOpenHour, setdropdownOpenHour] = useState(false);
  const toggleOpenHour = () => setdropdownOpenHour(prevState => !prevState);

  const [dropdownOpenMin, setdropdownOpenMin] = useState(false);
  const toggleOpenMin = () => setdropdownOpenMin(prevState => !prevState);

  const [dropdownOpenSec, setdropdownOpenSec] = useState(false);
  const toggleOpenSec = () => setdropdownOpenSec(prevState => !prevState);

  const handleFileUploade = (e) => {
    const file = e.target.files

    if(files === null ){
        setFiles( [ file] )
        setFilesName( [file[0].name] )
    }else if( filesName.includes( file[0].name )  ){
        alert("This file name already uploaded")
    }else{
        //setFiles( [ ...files ,file] )
        //setFilesName( [ ...filesName, file[0].name] )
        setFiles( [ file ] )
        setFilesName( [ file[0].name] )
    }
  }

  const loading = ( isLoading ) => {
    if (isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }

  const handleSubmit = async ( evt ) => {
    evt.preventDefault();

    loading(true);

    if(isNaN(day) && isNaN( year ) ){
      alert("Your day is not selected");
      loading( false );
      return
    }

    if( isNaN(hour) && isNaN( minute) && isNaN( secounds ) ){
      setHour(0);
      setMinute(0);
      setSecound(0);
    }

    const data = {
      "owner": 1,
      "subject": title,
      "message": description,
      "send_on": Func.toIso(day, month, year, hour, minute, secound),
      "reciepient": shareTo,
      "sent": false,
      "file_list": []
    }

    try{
      const token = localStorage.getItem("token");
      const response = await API.postToken('/api/mail/', data, token);
      const responseStatus = response.status;

      if( files !== null ){
        const data = {
          "owner":1,
          "file_name": filesName[0],
          "file_upload_url":"a",
          "file_download_url":"a"
        }

        const response = await API.postToken('/api/file/', data, token);

        const responseUrl = response.data.file_upload_url;
        const dataFile = files[0][0];
        const responseFromDigital = await API.putToDigitalOcean( responseUrl, dataFile);

        if(responseFromDigital.status === 200){
          alert("Sucessfull uploade");
        }

      }else if( responseStatus === 201 ){
        alert("Sucessfull uploade");
      }

    }catch (err) {
      alert("Error " + err.message);
    }

    loading(false);
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
                <Form
                  onSubmit={handleSubmit}
                >
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Share To:</label>
                        <Input
                          type="text"
                          value={shareTo}
                          onChange={e => setshareTo(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Title:</label>
                        <Input
                          type="text"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          required
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
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="1.5">
                      <FormGroup style={{margin:"0 15px"}}>
                        <label>Days:</label>
                        <Dropdown isOpen={dropdownOpenDay } toggle={toggleOpenDay} required>
                          <DropdownToggle caret value="" required>{day}</DropdownToggle>
                          <DropdownMenu required>
                            <DropdownItem value="" onClick={() => setDay("null") }>null</DropdownItem>
                            {
                              days.map((value) => {
                                return <DropdownItem onClick={() => setDay(value) }>{value}</DropdownItem>
                              })
                            }
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="1.5">
                      <FormGroup>
                      <label>Month:</label>
                      <Dropdown isOpen={dropdownOpenMonth} toggle={toggleOpenMonth} >
                          <DropdownToggle caret>{month}</DropdownToggle>
                          <DropdownMenu>
                            {
                              months.map((value) => {
                                return <DropdownItem onClick={() => setMonth(value) }>{value}</DropdownItem>
                              })
                            }
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="2">
                      <FormGroup>
                      <label>Year:</label>
                      <Dropdown isOpen={dropdownOpenYear} toggle={toggleOpenYear}>
                          <DropdownToggle caret>{year}</DropdownToggle>
                          <DropdownMenu>
                            {
                              years.map((value) => {
                                return <DropdownItem onClick={() => setYear(value) }>{value}</DropdownItem>
                              })
                            }
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Hour:</label>
                      <Dropdown isOpen={dropdownOpenHour} toggle={toggleOpenHour}>
                          <DropdownToggle caret>{hour}</DropdownToggle>
                          <DropdownMenu>
                            {
                              hours.map((value) => {
                                return <DropdownItem onClick={() => setHour(value) }>{value}</DropdownItem>
                              })
                            }
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Minutes:</label>
                      <Dropdown isOpen={dropdownOpenMin} toggle={toggleOpenMin}>
                          <DropdownToggle caret>{minute}</DropdownToggle>
                          <DropdownMenu>
                            {
                              minutes.map((value) => {
                                return <DropdownItem onClick={() => setMinute(value) }>{value}</DropdownItem>
                              })
                            }
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="1.5">
                      <FormGroup>
                      <label>Secound:</label>
                      <Dropdown isOpen={dropdownOpenSec} toggle={toggleOpenSec}>
                          <DropdownToggle caret>{secound}</DropdownToggle>
                          <DropdownMenu>
                            {
                              secounds.map((value) => {
                                return <DropdownItem onClick={() => setSecound(value) }>{value}</DropdownItem>
                              })
                            }
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                      {
                        (files === null ) ? <p>{"no file uploade yet"}</p> :
                        files.map( (file) => {
                            return <p key={file[0].name }>{ file[0].name }</p>
                        })
                      }
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <FormGroup>
                          <label style={{margin:"10px"}}>Uploade file</label>
                          <Input type="file" onChange={ handleFileUploade } multiple/>
                        </FormGroup>
                        <Button className="btn-fill" color="primary" type="submit">Submit</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <Col>
                      <FormGroup>
                        {(isLoading) && <h4 style={{ textAlign: "center", color:"red"}}>Loading</h4>}
                      </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NewEvent;
