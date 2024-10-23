import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function DepositHistory() {
    // Giả lập lịch sử rút tiền
    const [DepositHistory, setDepositHistory] = useState([])

    useEffect(() => {
        fetchData()
    })
    
    // Giả lập fetch apit lịch sử rút tiền
    const fetchData = () => {
        setTimeout(() => {
            setDepositHistory([
                { id: 1, deposit: '80', amount: 418, status: "pending", depositTime: "12:00" },
                { id: 2, deposit: '200', amount: 620, status: "success", depositTime: "11:34" },
                { id: 3, deposit: '500', amount: 1321, status: "success", depositTime: "8:46" },
                { id: 4, deposit: '1000', amount: 221, status: "success", depositTime: "10:02" },
                { id: 5, deposit: '100', amount: 705, status: "success", depositTime: "17:32" },
                { id: 6, deposit: '400', amount: 498, status: "success", depositTime: "13:20" },
                { id: 7, deposit: '300', amount: 936, status: "success", depositTime: "12:47" },
                { id: 8, deposit: '600', amount: 595, status: "success", depositTime: "05:59" },
            ])
        }, 1000)
    }

    const handleGoToHome = () => {
        navigate("/home")
    }

    return (
        <Container className="withdraw-history-container" style={{ marginBottom: "20px" }}>
            <div className='d-flex align-items-center py-pl'>
                <span onClick={handleGoToHome}>
                    <FontAwesomeIcon icon={faAngleLeft}/> 
                </span>
                <h1 className="text-start">Lịch sử nạp tiền</h1>
            </div>
            <Row className="g-2 withraw-history-row">
                {DepositHistory.length > 0 ? (
                    DepositHistory.map((history) => {
                        return (
                            <Col xs={12} key={history.id}>
                                <Card className="h-100 withdraw-history-card">
                                    <Card.Body>
                                        <Card.Title>
                                            <div className='mt-2' style={{ fontSize: "14px" }}>
                                                Thời gian: {history.depositTime}
                                            </div>                                          
                                        </Card.Title>
                                        <Row className='warehouse-general'>
                                            <Col>
                                                <Card.Text>
                                                    <p style={{ marginBottom: "0", fontSize: "14px" }}>Số tiền: +{history.deposit} €</p>
                                                    <p style={{ marginBottom: "0", fontSize: "14px" }}>Số dư: {history.amount} €</p>                                                    
                                                </Card.Text>
                                            </Col>
                                            <Col className="text-end">
                                                <Card.Text>{history.status === "pending" ? "Đang chờ xử lí" : "Thành công"}</Card.Text>
                                            </Col>
                                        </Row>                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <h5 className="text-start">Chưa có lịch sử nạp tiền</h5>
                )}
            </Row>
        </Container>
    )
}

export default DepositHistory