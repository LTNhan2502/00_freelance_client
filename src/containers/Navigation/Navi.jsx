import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Modal } from "react-bootstrap";
import logo from '../../assets/logo.jpg';
import avatar from '../../assets/icon-5355896_1920.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import { getOneUserByUsername } from "../../utils/userAPI";
import "./Navi.scss";
import { faHome, faWarehouse } from "@fortawesome/free-solid-svg-icons";

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
          {/* Logo Section */}
          {/* <div className="text-white p-2 media-logo">
            <Link to="/home">
              <img src={logo} className="logo-img" alt="Logo" />
            </Link>
          </div> */}

          {/* Navigation Links */}
          <NavLink to="/home" className="custom-nav-link">
            <FontAwesomeIcon icon={faHome}/>
            <span>Trang chủ</span>
          </NavLink>
          <NavLink to="/events" className="custom-nav-link" style={{ marginRight: "26px" }}>
            <FontAwesomeIcon icon={faCalendar}/>
            <span>Sự kiện</span>
          </NavLink>
          <NavLink to="/warehouse" className="custom-nav-link" style={{ marginLeft: "26px" }}>
            <FontAwesomeIcon icon={faWarehouse}/>
            <span>Kho</span>
          </NavLink>
          <NavLink to="/warehouse" className="custom-nav-link">
            <FontAwesomeIcon icon={faUser}/>
            <span>Tôi</span>
          </NavLink>
      
          
          
          <button className="receive-btn-nav"></button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navi;
