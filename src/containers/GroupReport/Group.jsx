import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Group.scss';
import avtImg from '../../assets/icon-5355896_1920.png'

function Group() {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(1);

    const handleLevelClick = (level) => {
        setSelectedLevel(level); // Cập nhật cấp được chọn
    };
    const handleGoToHome = () => {
        navigate("/home")
    };

    return (
        <Container className='custom-container-bank-account py-5'>
            <Row className='my-4 justify-content-center custom-row'>
                <Card className="ct-bank-card address-card">
                    <Row>
                        <Col className='p-4 custom-bank-account-col'>
                            <Row className='backArrow'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span onClick={handleGoToHome}>
                                        <FontAwesomeIcon icon={faAngleLeft}/> Báo cáo nhóm
                                    </span>
                                </div>
                            </Row>
                            <Card className='ct-card' style={{ padding: "0" }}>
                                <Card.Body>
                                    <Row>
                                        <div className='top-group-card'>
                                            <div
                                                className={`tgc-element ${selectedLevel === 1 ? 'active' : ''}`}
                                                onClick={() => handleLevelClick(1)}
                                            >
                                                Cấp 1
                                            </div>
                                            <div 
                                                className={`tgc-element ${selectedLevel === 2 ? 'active' : ''}`}
                                                onClick={() => handleLevelClick(2)}
                                            >
                                                Cấp 2
                                            </div>
                                            <div
                                                className={`tgc-element ${selectedLevel === 3 ? 'active' : ''}`}
                                                onClick={() => handleLevelClick(3)}
                                            >
                                                Cấp 3
                                            </div>
                                            <div
                                                className={`tgc-element ${selectedLevel === 4 ? 'active' : ''}`}
                                                onClick={() => handleLevelClick(4)}
                                            >
                                                Cấp 4
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            {selectedLevel === 1 && (
                                                <div className='group-report-container'>
                                                    <Col>
                                                        <div className="user-info">
                                                        <img
                                                            src={avtImg}
                                                            alt="User Avatar"
                                                            className="avatar"
                                                        />
                                                        <div className="user-details">
                                                            <p className="username">phamdaivuong</p>
                                                            <p className="balance">Số dư: <span>0,00 €</span></p>
                                                        </div>
                                                        </div>
                                                    </Col>
                                                    <Col className="text-end">
                                                        <div className="user-meta">
                                                        <p>SDT: 0946******</p>
                                                        <p>Thời gian đăng ký: 2024-07-16</p>
                                                        </div>
                                                    </Col>
                                                </div>
                                            )}
                                            {selectedLevel === 2 && <p>Chưa có thông tin</p>}
                                            {selectedLevel === 3 && <p>Chưa có thông tin</p>}
                                            {selectedLevel === 4 && <p>Chưa có thông tin</p>}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* <Col xs={12} md={6} className="right-col">
                            <img
                                src={depositImg}
                                alt="Bank Info Image"
                                className="withraw-image"
                            />
                        </Col> */}
                    </Row>
                </Card>
            </Row>
        </Container>
    );
}

export default Group;
