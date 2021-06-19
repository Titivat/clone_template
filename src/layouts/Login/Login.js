
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

// core components
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import FixedPlugin from "components/FixedPlugin/FixedPlugin"
import { Form } from "react-bootstrap";
import * as API from '../../api';

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonStyle = {
    background: "#e14eca",
    backgroundImage: "linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca)",
    backgroundSize: "210% 210%",
    backgroundColor: "#e14eca",
    transition: "all 0.15s ease",
    boxShadow: "none",
    color: "#ffffff",
  }
  const loading = ( isLoading ) => {
    if( isLoading ){
      setIsLoading( true )
    }else{
      setIsLoading( false );
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
      const data = {
          "username": userName,
          "password": password,
      }
    loading(true);

    try{
      const response = await API.post('/auth/jwt/create/', data);
      const responseStatus = response.status;

      if( responseStatus === 200 ){
        console.log(responseStatus)
        localStorage.setItem('token', response.data.access );
        history.push("/admin");
      }

    }catch (err) {
      alert("Error " + err.message);
    }

    loading(false);
  }

  const handleRegister = () => {
    history.push("/register");
  }

  return (
    <>
      <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div style={{margin:"7%"}} className="content">
            <Row style={style}>
              <Col md="6">
                <Card>
                  <CardHeader>
                    <h3 style={{textAlign:"center"}} className="title">Login  </h3>
                  </CardHeader>
                  <CardBody>
                    <Form
                      onSubmit={ handleSubmit }
                    >
                      <Row>
                      <Col md="12">
                          <FormGroup>
                            <label>Username:</label>
                            <Input
                              type="text"
                              value={userName}
                              onChange={e => setUserName(e.target.value)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <label>Password:</label>
                            <Input
                              type="text"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col  md="12" >
                          <FormGroup>
                            <Input style={buttonStyle} color="primary" type="submit" value="login" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    <Row>
                        <Col  md="12" >
                          <FormGroup>
                            <h4 onClick={ handleRegister } style={{textAlign:"center", margin:"10px"}} className="title">Register</h4>
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        {(isLoading) && <p style={{textAlign:"center", color:"red"}}>loading</p>}
                      </Col>
                    </Row>
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

export default Login;
