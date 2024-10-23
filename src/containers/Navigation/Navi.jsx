import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import logo from '../../assets/logo.jpg';
import avatar from '../../assets/icon-5355896_1920.png';
import home_img from '../../assets/home-icon.png';
import home_img_active from '../../assets/home-icon-active.png';
import warehouse_img from '../../assets/warehouse-icon.png';
import warehouse_img_active from '../../assets/warehouse-icon-active.png';
import customer_service_img from '../../assets/customer-service.png';
import me_img from '../../assets/me-icon.png';
import me_img_active from '../../assets/me-icon-active.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { getOneUserByUsername } from "../../utils/userAPI";
import "./Navi.scss";
import { faHeadset, faHome, faWarehouse } from "@fortawesome/free-solid-svg-icons";

const Navi = () => {
  const userName = localStorage.getItem("user_name")
  const isAuthenticated = !!localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [thisUser, setThisUser] = useState(null)

  useEffect(() => {
    fetchThisUser()
  }, [])

  const fetchThisUser = async() => {
    try {
      const res = await getOneUserByUsername(userName)
      const result = res.data.data
  
      setThisUser(result)      
    } catch (error) {
      console.log("Error fetching: ", error);
      
    }
  }

  const toggleCard = () => {
    setOpen(!open);
  };

  const handleGoToOrderDetail = () => {
    navigate("/order-detail")
  }

  
  const handleGoToDeposit = () => {
    navigate("/deposit")
    toggleCard()
  }

  const handleGoToWithraw = () => {
    navigate("/withraw")
    toggleCard()
  }
  
  const handleGoToDepositHistory = () => {
    navigate("/deposit-history")
    toggleCard()
  }

  const handleGoToBankAccount = () => {
    navigate("/bank-account")
    toggleCard()
  }

  const handleGoToWithrawHistory = () => {
    navigate("/withraw-history")
    toggleCard()
  }

  const handleGoToOrderHistory = () => {
    navigate("/order-history")
    toggleCard()
  }

  const handleGoToGroupReport = () => {
    navigate("/group-report")
    toggleCard()
  }

  const handleGoToAddress = () => {
    navigate("/address")
    toggleCard()
  }

  const onClickLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="topnav">
          <ul className="list-nav">
            {/* Trang chủ */}
            <li className="flex-1">
              <NavLink 
                to="/home" 
                className="flex-col"
              >
                {({ isActive }) => (
                  <>
                    <img 
                      src={isActive ? home_img_active : home_img} 
                      alt="home" 
                      className="img-nav-element"
                    />
                    <span className={isActive ? 'active-text' : ''}>Trang chủ</span> 
                  </>
                )}
              </NavLink>
            </li>

            {/* Kho */}
            <li className="flex-1">
              <NavLink to="/warehouse" className="flex-col" style={{ marginRight: "24px" }}>
                {({isActive}) => (
                  <>
                    <img 
                      src={isActive ? warehouse_img_active : warehouse_img} 
                      alt="home" 
                      className="img-nav-element"
                    />
                    <span className={isActive ? 'active-text' : ''}>Kho</span>
                  </>
                )}
              </NavLink>
            </li>

            {/* CSKH */}
            <li className="flex-1">
              <NavLink to="/customer-service" className="flex-col" style={{ marginLeft: "24px" }}>
                <img src={customer_service_img} alt="home" className="img-nav-element"/>
                <span>CSKH</span>
              </NavLink>
            </li>

            {/* Tôi */}
            <li className="flex-1 profiles-container">    
              {/* Profile Avatar Container */}
              <NavLink to="/profiles" className="flex-col" style={{ marginRight: "24px" }}>
                {({isActive}) => (
                  <>
                    <img 
                      src={isActive ? me_img_active : me_img} 
                      alt="home" 
                      className="img-nav-element"
                    />
                    <span className={isActive ? 'active-text' : ''}>Tôi</span>
                  </>
                )}
              </NavLink>

              {/* Slide-In Panel */}
              <div className={`info-panel ${open ? 'open' : ''}`}>
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
                      <li><p onClick={() => handleGoToDeposit()}>Nạp tiền</p></li>
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

              {/* Overlay */}
              {open && <div className="overlay" onClick={toggleCard}></div>}
            </li>
          </ul>

          {/* Nhận phân phối */}
          <button className="receive-btn-nav" onClick={handleGoToOrderDetail}></button>   
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navi;
