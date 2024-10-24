import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Collapse, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getOneUserByUsername } from '../../utils/userAPI';
import logo_profile from '../../assets/logo-me.png';
import { toast } from "react-toastify";
import './Profiles.scss';
import { CurrencyContext } from '../App';

export default function Profiles() {
  const {formatCurrency} = useContext(CurrencyContext)
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
  
    // const onClickLogout = () => {
    //   toast.info(
    //     <div>
    //       <p>Bạn có chắc chắn muốn đăng xuất không?</p>
    //       <button onClick={handleConfirmLogout} style={{ marginRight: "10px" }}>
    //         Có
    //       </button>
    //       <button onClick={toast.dismiss}>Không</button>
    //     </div>,
    //     {
    //       position: "top-center",
    //       autoClose: false,
    //     }
    //   );
    // };
    
    // const handleConfirmLogout = () => {
    //   localStorage.removeItem("user_name");
    //   localStorage.removeItem("access_token");
    //   toast.dismiss();
    //   window.location.href = "/login";
    // };

    const onClickLogout = () => {
      localStorage.removeItem("user_name");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    };

    return (        
        <Container className="profile-container">
            <div className="info-panel">
                <Card className="info-card">
                  <Card.Body>
                      {/* Username, ID */}
                      <div className="info-card-top">
                        <div className='card-top-left'>
                          <img src={logo_profile} alt="logo" />
                        </div>
                        <div className='card-top-right'>
                          <span>{thisUser?.userName}</span>
                          <span>ID: {thisUser?._id}</span>
                        </div>
                      </div>

                      {/* Card general info */}
                      <div className="info-card-mid p-4">
                        <div className="left-card-column">
                            <span>Số dư</span>
                            <span>{formatCurrency(thisUser?.amount || 0)} €</span>
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
        </Container>        
    );
}
