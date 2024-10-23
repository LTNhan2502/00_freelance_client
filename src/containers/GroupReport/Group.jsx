import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import avtImg from '../../assets/icon-5355896_1920.png'
import './Group.scss';

function Group() {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(1);

    const handleLevelClick = (level) => {
        setSelectedLevel(level);
    };
    const handleGoToHome = () => {
        navigate("/home")
    };

    return (
        <Container className='group-report-container-main py-5'>
            <div className='d-flex align-items-center py-pl'>
                <span onClick={handleGoToHome}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </span>
                <h1 className="text-start">Báo cáo nhóm</h1>
            </div>
            <div>
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
            </div>
            <Col xs={12} className='group-report-content'>
                {selectedLevel === 1 && (
                    <Row>
                        <Col className="text-start">
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
                    </Row>
                )}
                {selectedLevel === 2 && <p>Chưa có thông tin</p>}
                {selectedLevel === 3 && <p>Chưa có thông tin</p>}
                {selectedLevel === 4 && <p>Chưa có thông tin</p>}
            </Col>            
        </Container>
    );
}

export default Group;
