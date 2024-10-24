import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faIcons } from '@fortawesome/free-solid-svg-icons';
import cskh from '../../assets/customer-service-img.jpg';
import './CustomerService.scss';

function CustomerService() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Logic để gửi tin nhắn
    console.log("Message sent:", message);
    setMessage(""); // Clear message sau khi gửi
  };

  return (
    <div className='ct-cs-div'>
         <div className="customer-service-container">
            {/* Header */}
            <div className="header">
                <img 
                    src={cskh} 
                    alt="Avatar" 
                    className="avatar"
                />
                <span className="header-title">MERCADO</span>
            </div>

            {/* Content */}
            <div className="content-cs">
                <p className="load-history">Tải thêm thông tin lịch sử</p>
                <div className="message-container">
                <span className="message-time">MERCADO</span>
                <div className="message-box">
                    KÍNH CHÀO QUÝ KHÁCH - QUÝ KHÁCH CẦN HỖ TRỢ GÌ TỪ MERCADO LIBRE !
                </div>
                </div>
            </div>

            {/* Input */}
            <div className="input-container-cs">
                <FontAwesomeIcon icon={faIcons}/>
                <FontAwesomeIcon icon={faImage} style={{ padding: "0 6px" }}/>
                <input 
                    type="text" 
                    placeholder="Vui lòng nhập" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button className="send-btn" onClick={handleSendMessage}>Gửi đi</button>
            </div>
        </div>
    </div>
  );
}

export default CustomerService;
