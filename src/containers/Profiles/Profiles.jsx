import React, { useEffect, useState } from 'react';
import { Button, Card, Collapse, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profiles.scss';
import { getOneUserByUsername } from '../../utils/userAPI';
import { useNavigate } from 'react-router-dom';

export default function Profiles() {
    const [thisUser, setThisUser] = useState(null)
    const [userAmount, setUserAmount] = useState(0)
    const navigate = useNavigate()
    const defaultAmount = 0;
    const userName = localStorage.getItem("user_name")

    useEffect(() => {
        fetchUserAmount();
    }, [userName]);

    const fetchUserAmount = async () => {
        if (!userName) {
          setUserAmount(defaultAmount);
          return;
        }
    
        try {
          const res = await getOneUserByUsername(userName);
          const result = res.data.data

          setThisUser(result)
          setUserAmount(result.amount || defaultAmount);
        } catch (error) {
          console.error("Error fetching user amount:", error);
          setUserAmount(defaultAmount);
        }
    };

    const handleGoToDeposit = () => {
      navigate("/deposit")
    }

    const handleGoToCustomerService = () => {
      navigate("/customer-service")
    }
  
    const handleGoToWithraw = () => {
      navigate("/withraw")
    }
    
    const handleGoToDepositHistory = () => {
      navigate("/deposit-history")
    }
  
    const handleGoToBankAccount = () => {
      navigate("/bank-account")
    }
  
    const handleGoToWithrawHistory = () => {
      navigate("/withraw-history")
    }
  
    const handleGoToOrderHistory = () => {
      navigate("/order-history")
    }
  
    const handleGoToGroupReport = () => {
      navigate("/group-report")
    }
  
    const handleGoToAddress = () => {
      navigate("/address")
    }
  
    const onClickLogout = () => {
      localStorage.removeItem("user_name");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    };

    return (        
        <div className="warehouse-container">
            <div className="info-panel">
                <Card className="info-card">
                  <Card.Body>
                      {/* Username, ID */}
                      <div className="info-card-top">
                        <span>{thisUser?.userName}</span>
                        <span>ID: {thisUser?._id}</span>
                      </div>

                      {/* Card general info */}
                      <div className="info-card-mid p-4">
                        <div className="left-card-column">
                            <span>Số dư</span>
                            <span>{thisUser?.amount || 0} €</span>
                        </div>
                        <div className="right-card-column">
                            <span>Cấp thành viên</span>
                            <span className="text-center">{thisUser?.memberId?.packageName || "Không"}</span>
                        </div>
                      </div>

                      {/* List navigate */}
                      <ul className="list-unstyled">
                        <li><p onClick={() => handleGoToCustomerService()}>Nạp tiền</p></li>
                        <li><p onClick={() => handleGoToWithraw()}>Rút tiền</p></li>
                        <li><p onClick={() => handleGoToDepositHistory()}>Lịch sử nạp tiền</p></li>
                        <li><p onClick={() => handleGoToWithrawHistory()}>Lịch sử rút tiền</p></li>
                        <li><p onClick={() => handleGoToOrderHistory()}>Lịch sử đơn hàng</p></li>
                        <li><p onClick={() => alert("Lịch sử nhận thưởng")}>Lịch sử nhận thưởng</p></li>
                        <li><p onClick={() => handleGoToGroupReport()}>Báo cáo nhóm</p></li>
                        <li><p onClick={() => handleGoToBankAccount()}>Thông tin ngân hàng</p></li>
                        <li><p onClick={() => handleGoToAddress()}>Địa chỉ</p></li>
                        <li><p onClick={() => alert("Chuyển đổi ngôn ngữ")}>Chuyển đổi ngôn ngữ</p></li>
                        <li><p onClick={onClickLogout}>Đăng xuất</p></li>
                      </ul>
                  </Card.Body>
                </Card>
            </div>
        </div>        
    );
}
