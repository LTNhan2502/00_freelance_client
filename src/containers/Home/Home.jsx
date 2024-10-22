import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Level_Member from './Level_Member';
import Info from './Info.jsx'
import Recipients from "./Recipients";
import HotProduct from "./HotProduct";
import videoSrc from '../../assets/video.mp4';
import './Home.scss';

const Home = () => {
  const [userAmount, setUserAmount] = useState(0)
  const [thisUser, setThisUser] = useState(null);

  return (
    <Container className="custom-container">
      <Row className="my-4 justify-content-center">
        <Col xs={12} className="h-100">
          {/* Info */}
          <Info userAmount={userAmount} setUserAmount={setUserAmount} thisUser={thisUser}/>
        </Col>

        {/* Video */}
        <Col xs={12}>
          <Row>
            <video width="100%" controls autoPlay loop muted>
                <source src={videoSrc} type="video/mp4" />
            </video>
          </Row>
        </Col>

        <Col xs={12}>
          {/* Cấp thành viên */}
          <Level_Member userAmount={userAmount}/>
        </Col>

        <Col xs={12}>
          <Row className="h-100">
            {/* Cột chứa Recipients */}
            <Col xs={12} className="d-flex flex-column">
              <div>
                <Recipients />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
