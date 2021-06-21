
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
        alignItems: "center",
        width:"50%",
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
          <div style={{display: "flex", justifyContent: "center" ,margin:"7%"}} className="content">
          {/* <img src="https://cdn.discordapp.com/attachments/721230800141549568/856057074366677002/project_presentation__1_-removebg-preview.png"></img> */}
            <Row style={style}>
              <Col md="12">
                <Card className="card-user">
                <CardBody>
                    <CardText />
                    <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <h3 className="title">Welcome to TimeCapsule.io</h3>
                    <p className="description">Share files, memories and documents any time in the future</p>
                    </div>
                    <div className="card-description">
                    </div>
                    <div className="card-description">
                    <p className="description" style={{textAlign: "center"}}>Join us by register or loing</p>
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
