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
  const [secound, setSecound] = useState("Second ⬇");

  const [instagramId, setInstragramId] = useState("");
  const [twitterId, setTwitterId] = useState("");

  const [delaySendDate, setDelaySendDate] = useState("send when I'm gone ⬇");

  const monthToDay = { 1: "31", 2: "28", 3: "31", 4: '30', 5: '31', 6: "30", 7: "31", 8: '31', 9: '30', 10: '31', 11: '30', 12: '31' }
  const days = range(1, monthToDay[month]);
  const months = range(1, 12);
  const nowYear = new Date().getFullYear();
  const years = range(nowYear, nowYear + 100);

  const hours = range(0, 23);
  const minutes = range(0, 59);
  const secounds = range(0, 59);
  const  tempYear = new Date().getFullYear()
  const  tempMonth = new Date().getMonth() + 1
  const  tempDay = new Date().getDate()

  //const [comboBoxData, setComboBoxData] = useState(["Specify inactive by period", "Specify by date"]);

  const [isLoading, setIsLoading] = useState(false);

  const [switchStage, setSwitchStage] = useState(false);

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

  const [dropdownOpenPick, setdropdownOpenPick] = useState(false);
  const toggleDropdownOpenPick = () => setdropdownOpenPick(prevState => !prevState);

  const droupDownStyle = { height: "200px",overflowY: "scroll"}

  const handleFileUploade = (e) => {
    const file = e.target.files

    if(files === null ){
        setFiles( [ file] )
        setFilesName( [file[0].name] )
    }else if( filesName.includes( file[0].name )  ){
        alert("This file name already uploaded")
    }else{
        setFiles( [ ...files ,file] )
        setFilesName( [ ...filesName, file[0].name] )
        //setFiles( [ file ] )
        //setFilesName( [ file[0].name] )
    }
  }

  const checkTime = () => {
    if( isNaN(hour) || isNaN( minute) || isNaN( secounds ) ){
      setHour(0);
      setMinute(0);
      setSecound(0);
    }
  }

  const loading = ( isLoading ) => {
    if (isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }

  const uploadeFile = async ( token ) => {
    const dataResponse = []

    await Promise.all(files.map( async ( item ) => {
      const data = {
        "owner":1,
        "file_name": item[0].name,
        "file_upload_url":"a",
        "file_download_url":"a"
      }

      const response = await API.postToken('/api/file/', data, token);
      const responseUrl = response.data.file_upload_url;

      const dataFile = item[0];
      const responseFromDigital = await API.putToDigitalOcean( responseUrl, dataFile);

      if( responseFromDigital.status === 200){
        dataResponse.push( response.data );
      }
    }))

    return dataResponse;
  }

  const uploadedFileWithDelay = async () =>{

    if(isNaN(day) || isNaN( year ) ){
      //alert("Your day or year is not selected");
      loading( false );
      return
    }

    checkTime();

    const data = {
      "owner": 1,
      "subject": title,
      "message": description,
      "send_on": Func.toIso(day, month, year, hour, minute, secound),
      "reciepient": shareTo,
      "sent": false,
      "file_list": [],
      "update_date": true,
      "login_date": Func.toIso(day, month, year, hour, minute, secound),
      "update_twitter": twitterId ? true : false,
      "twitter_id": !twitterId ? "no_twitter_id" :twitterId,
      "update_instagram": instagramId ? true : false,
      "instagram_id": !instagramId ? "no_instragram_id" :instagramId,
    }

    try{
      if( files !== null ){
        const token = localStorage.getItem("token");

        const dataResponse = await uploadeFile( token );

        data.file_list =  dataResponse

        console.log( dataResponse[0] )
        await  handleSendMail( data );
      }

      if( files === null ){
        console.log("No file");
        await handleSendMail( data );
      }

    }catch (err) {
      //alert("Error " + err.message);
    }
  }

  const uploadeByDeath = async () => {
    setDay( tempDay )
    setMonth( tempMonth )
    setYear( tempYear )
    await uploadedFileWithDelay();
  }

  const handleSubmit = async ( evt ) => {
    evt.preventDefault();

    loading(true);
    if( !switchStage ){
      console.log("hello switchStage uploadeByDeath")
      await uploadeByDeath();
    }else if(switchStage){
      console.log("hello switchStage uploadedFileWithDelay")
      await uploadedFileWithDelay();
    }

    loading(false);
  }

  const handleSendMail = async ( data ) => {
    console.log("This is a data from handleSendMail");
    console.log( data );

    const token = localStorage.getItem("token");
    const response = await API.postToken('/api/mail/', data, token);
    const responseStatus = response.status;

    if( responseStatus === 200 || responseStatus === 201 ){
      alert("Uploade sucesfull");
    }else{
      alert("please press upload again");
    }

  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h2 style={{textAlign:"center"}} className="description">Create new capsule</h2>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={handleSubmit}
                >
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Recipient(s):</label>
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
                        <label>Subject:</label>
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
                        <label>Body:</label>
                        <Input
                          type="textarea"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{display:"flex"}}>
                  <h3 style={{margin:"0 10px 0 0"}}>Time</h3>
                    <FormGroup>
                    <Dropdown  isOpen={dropdownOpenPick} toggle={toggleDropdownOpenPick} >
                        <DropdownToggle caret>{  delaySendDate }</DropdownToggle>
                        <DropdownMenu style={{height:"200%"}} >
                            <DropdownItem style={{color: "black"}} onClick={() => {
                              setSwitchStage( false )
                              setDelaySendDate("send when I'm gone")
                              }
                            }>
                              send when I'm gone
                            </DropdownItem>
                            <DropdownItem style={{color: "black"}} onClick={() => {
                              setSwitchStage( true )
                              setDelaySendDate("send on date")
                              }}>
                              send on date
                            </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </FormGroup>
                  </div>
                  { (switchStage)?
                    <Row>
                      <Col className="pr-md-1" md="1.5">
                        <FormGroup style={{margin:"0 15px"}}>
                          <label>Day:</label>
                          <Dropdown isOpen={dropdownOpenDay } toggle={toggleOpenDay} required>
                            <DropdownToggle caret value="" required>{day}</DropdownToggle>
                            <DropdownMenu style={ droupDownStyle }>
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
                            <DropdownMenu style={ droupDownStyle }>
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
                            <DropdownMenu  style={ droupDownStyle }>
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
                            <DropdownMenu style={ droupDownStyle }>
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
                        <label>Minute:</label>
                        <Dropdown isOpen={dropdownOpenMin} toggle={toggleOpenMin}>
                            <DropdownToggle caret>{minute}</DropdownToggle>
                            <DropdownMenu style={ droupDownStyle }>
                              {
                                minutes.map((value) => {
                                  return <DropdownItem onClick={() => setMinute(value) }>{value}</DropdownItem>
                                })
                              }
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    : <Row>
                        <Col className="pr-md-1" md="12">
                          <FormGroup style={{margin:"0 15px 10px"}}>
                            <label>Instragram id:</label>
                            <Input
                              type="text"
                              value={instagramId}
                              onChange={e => setInstragramId(e.target.value)}
                            />
                            <label>Twitter id:</label>
                            <Input
                              type="text"
                              value={twitterId}
                              onChange={e => setTwitterId(e.target.value)}
                            />
                            <label>Login</label>
                            <input style={{margin:"10px 0 10px 10px"}} type="checkbox" />
                          </FormGroup>
                        </Col>
                      </Row>
                    }
                  <Row>
                    <Col>
                      <FormGroup>
                      {
                        (files === null ) ? <p style={{margin: "20px 0 10px 10px"}}>{"No file selected."}</p> :
                        files.map( (file) => {
                            return <p style={{margin: "20px 0 10px 10px"}} key={file[0].name }>{ file[0].name }</p>
                        })
                      }
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Button className="btn-fill" color="primary" type="submit">Submit</Button>
                        <Button onChange={ handleFileUploade }><Input type="file" multiple></Input>Choose file</Button>
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
