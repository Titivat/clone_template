
import React, { useState } from "react";
import * as API  from '../../api';
import * as Func from '../../function'
import { useHistory } from "react-router-dom";

import {
    Button,
    CardText,
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

// core components
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import FixedPlugin from "components/FixedPlugin/FixedPlugin"

function Main(props) {
  const style = {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
  };

  const buttonStyle = {
    margin:"2%",
    background: "#e14eca",
    backgroundImage: "linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca)",
    backgroundSize: "210% 210%",
    backgroundColor: "#e14eca",
    transition: "all 0.15s ease",
    boxShadow: "none",
    color: "#ffffff",
  }

  const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }
  const history = useHistory();

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
      "sent": false
    }

    try{
      const response = await API.post('/api/mail/', data);
      const responseStatus = response.status;

      if( responseStatus === 201 ){
        alert("Sucessfull uploade");
      }
    }catch (err) {
      alert("Error " + err.message);
    }

    loading(false);
  }

  return (
    <>
      <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div style={{margin:"7%"}} className="content">
            <Row style={style}>
              <Col md="7">
                <Card>
                <CardHeader>
                    <h2 style={{textAlign:"center"}} className="description">Try this out</h2>
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
                        <Col md="11">
                        <FormGroup>
                            <Input style={buttonStyle} color="primary" type="submit" value="Summit" />
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
              <Col md="5">
                <Card className="card-user">
                <CardBody>
                    <CardText />
                    <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <h3 className="title">Welcome to FutureFile.io</h3>
                    <p className="description">Share files, memories and documents any time in the future</p>
                    </div>
                    <div className="card-description">
                    <p>Try sending an email at a scheduled time on the left side of the homepage to see how our services work.</p>
                    </div>
                    <div className="card-description">
                    <p>Or join us by register or loing to be able to do more...</p>
                    </div>
                    <div style={{ margin:"30px",display:"flex",  justifyContent: "center", alignItems: "center",}}>
                        <Button onClick={ () => history.push("/login") }>Login</Button>
                        <Button onClick={ () => history.push("/register") } >Register</Button>
                    </div>
                </CardBody>
                </Card>
                </Col>
              </Row>
            </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
      </BackgroundColorContext.Consumer>
    </>
  );
}

export default Main;
