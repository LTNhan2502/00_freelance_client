import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Modal, Button, Card } from "react-bootstrap";
import {
  faArrowsDownToLine,
  faArrowsUpToLine,
  faBuilding,
  faEnvelopeOpenText,
  faGavel,
  faHeadset,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import avatar from '../../assets/icon-5355896_1920.png';
import "./Info.scss";
import { getOneUserByUsername } from "../../utils/userAPI";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { faBell, faCalendar, faHandshake } from "@fortawesome/free-regular-svg-icons";

export default function Info({ userAmount, setUserAmount, thisUser }) {
  const defaultAmount = 0;
  const userName = localStorage.getItem("user_name");
  const navigate = useNavigate()
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [showFoundationRules, setShowFoundationRules] = useState(false);
  const [showCoOp, setShowCoOp] = useState(false);
  const [openNoti, setOpenNoti] = useState(false)
  const [dataNoti, setDataNoti] = useState([
    {id: 1, noti: "Hệ thống đã thanh toán 100.00€ cho bạn!"},
    {id: 2, noti: "Bạn đã đặt lệnh rút 100.00€. Yêu cầu của bạn đang được xét duyệt"},
    {id: 3, noti: "Hệ thống đã thanh toán 61.00€ cho bạn!"},
    {id: 4, noti: "Bạn đã đặt lệnh rút 61.00€. Yêu cầu của bạn đang được xét duyệt"},
    {id: 5, noti: "Hệ thống đã thanh toán 62.00€ cho bạn!"},
    {id: 6, noti: "Bạn đã đặt lệnh rút 62.00€. Yêu cầu của bạn đang được xét duyệt"},
  ])


  const fetchUserAmount = async () => {
    if (!userName) {
      setUserAmount(defaultAmount);
      return;
    }

    try {
      const res = await getOneUserByUsername(userName);
      // console.log(res.data.data);
      setUserAmount(res.data.data.amount || defaultAmount);
    } catch (error) {
      console.error("Error fetching user amount:", error);
      setUserAmount(defaultAmount);
    }
  };

  useEffect(() => {
    fetchUserAmount();
  }, [userName, userAmount]);

  const handleGoToEvent = () => {
    navigate("/events")
  }

  const handleWithraw = () => {
    navigate("/withraw")
  }

  const handleDeposit = () => {
    navigate("/deposit")
  }

  const handleCustomerService = () => {
    navigate("/customer-service")
  }

  // Handle hồ sơ công ty
  const handleCloseCompanyInfo = () => setShowCompanyInfo(false);
  const handleShowCompanyInfo = () => setShowCompanyInfo(true);

  // Handle hợp tác phát triển
  const handleCloseCoOp = () => setShowCoOp(false);
  const handleShowCoOp = () => setShowCoOp(true);

  const toggleNoti = () => {
    setOpenNoti(!openNoti)
  }

  return (
    <Container className="p-0">
      <Row className="mb-3 mt-3 font-medium">
        <Col xs={12} className="mb-3">
          <div className="d-flex justify-content-between">
            <div className="avatar-div">
              <input type="file" id="file-input" className="d-none"/>
              <label for="file-input" style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}>
                <img src={avatar} alt="Avatar" className="avatar-img" />                
              </label>
              <div className="avatar-hello">
                <span style={{ 
                  color: "#cfd0d1", 
                  fontWeight: "500"
                }}>Xin chào</span>
                <span>{userName ? userName : "Username"}</span>
              </div>
            </div>
            <div>
              {/* Chuông thông báo */}
              <FontAwesomeIcon icon={faBell} 
                style={{
                  fontSize: "1.8rem",
                  color: "white",
                  paddingRight: "10px",
                  cursor: "pointer"
                }}
                onClick={() => toggleNoti()}
              />

              {/* Modal thông báo */}
              <Modal
                show={openNoti} 
                onHide={toggleNoti}
                size="lg"
                className="responsive-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Thư thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {dataNoti.map((noti) => (
                    <Card key={noti.id} className="mb-2"
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        border: "1px solid #7a797d"
                      }}
                    >
                      <Card.Body>
                        {noti.noti}
                      </Card.Body>
                    </Card>
                  ))}
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Col>

        {/* Info */}
        <div className="field-money">
          {/* Số dư */}
          <div className="left-field-money">
            <div className="box left-box">
              <div className="left-box-content">
                <FontAwesomeIcon icon={faWallet} size="2x" />
                <span className="p">Số dư khả dụng</span>
              </div>
              <div className="d-flex justify-content-start">{`${userAmount} €`}</div>
            </div>
          </div>

          {/* Nạp tiền, rút tiền */}
          <div className="right-field-money">

            <div className="box box-click" onClick={() => handleCustomerService()}>
              <div>
                <FontAwesomeIcon icon={faArrowsUpToLine} size="2x" />
              </div>
              <div>Nạp tiền</div>
            </div>
            
            <div className="box box-click" onClick={() => handleWithraw()}>
              <div>
                <FontAwesomeIcon icon={faArrowsDownToLine} size="2x" />
              </div>
              <div>Rút tiền</div>
            </div>
          </div>
        </div>
        
        <Col xs={12}>
          <h2 className="general-h2">Tổng quan Mercado Libre</h2>
          <div className="general-box">
            <Row className="general-content-box">
              {/* Hồ sơ công ty */}
              <Col xs={3}>
                <div onClick={handleShowCompanyInfo} className="box-click">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    size="2x"
                    className="company-info"
                  />
                </div>
                <div>Hồ sơ công ty</div>
              </Col>

              {/* Sự kiện */}
              <Col xs={3}>
                <div onClick={handleGoToEvent} className="box-click">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    size="2x"
                    className="company-info"
                  />
                </div>
                <div>Sự kiện</div>
              </Col>
              
              {/* Hợp tác phát triển */}
              <Col xs={3}>
                <div onClick={handleShowCoOp} className="box-click">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    size="2x"
                    className="noti-mail"
                  />
                </div>
                <div>Hợp tác phát triển</div>
              </Col>

              {/* Thư thông báo */}
              <Col xs={3}>
                <div>
                  <FontAwesomeIcon
                    icon={faEnvelopeOpenText}
                    size="2x"
                    className="noti-mail"
                    onClick={() => toggleNoti()}
                  />
                </div>
                <div>Thư thông báo</div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Modal hiển thị thông tin công ty */}
      <Modal show={showCompanyInfo} onHide={handleCloseCompanyInfo} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin công ty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Mercado Libre được thành lập bởi Marcos Galperín. Ông đã ý tưởng nền tảng này vào tháng 3 năm 1999, khi đang làm việc để có được bằng thạc sĩ quản trị kinh doanh tại trường kinh doanh Đại học Stanford, Hoa Kỳ. Ông được YPF tài trợ để thực hiện chương trình sau đại học này trong khi làm việc trong ngành tài chính của công ty. Tuy nhiên, trong thời gian ông học tại đại học, công ty Repsol đã mua lại YPF, và bộ phận mà Galperín làm việc đã đóng cửa. Đó là lúc Galperín bắt đầu quá trình nghiên cứu và tư vấn trong ba tháng với các giáo sư khác, trong đó ông phân tích khả năng tạo ra một thị trường trực tuyến tại Châu Mỹ Latinh. Giáo sư tài chính của ông, Jack McDonald, là người giúp ông có được nhà đầu tư đầu tiên: John Muse.
          </p>
          <p>
          Sau khi nhận được bằng cử nhân của mình, ông đã dành thời gian để thành lập công ty, được giới thiệu với công chúng vào ngày 2 tháng 8 năm 1999, mở rộng nhanh chóng đến các quốc gia sau đây: Argentina, Brasil, Colombia, Chile, Ecuador, México, Peru, Uruguay và Venezuela.
          </p>
          <p>
          Mercado Libre đã có hai vòng tài trợ, mặc dù không phải là không gặp khó khăn. Theo Galperin: “Không có các công ty mạo hiểm địa phương và các công ty quốc tế cũng không muốn nhìn về Châu Mỹ Latinh”. Vòng tài trợ đầu tiên diễn ra vào tháng 11 năm 1999 và thứ hai vào tháng 5 năm 2000. Các vòng này bao gồm các đối tác sau: JP Morgan Partners, Flatiron Fund, Hicks, John Muse, Tate & Furst, Goldman Sachs, Fondo CRI, Banco Santander Central Hispano và GE Equity. Theo lời của Galperin trên Tạp chí Time: “Chúng tôi đã phải tạo ra tất cả từ đầu. Logistics cho thương mại điện tử và cơ sở hạ tầng cho thanh toán kỹ thuật số: chúng tôi đã phải tạo ra tất cả. Một số đối thủ quốc tế của chúng tôi, như eBay và Amazon, đã phát triển từ đầu. Thú vị là, chúng tôi bắt đầu phát triển nhanh hơn nhiều sau kỷ niệm 21 năm của chúng tôi. Chúng tôi đang làm cho tài chính và thương mại ở Châu Mỹ Latinh trở nên dân chủ hơn. Đây là một câu chuyện thành công qua đêm mà đã mất hơn hai thập kỷ”.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCompanyInfo}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal hiển thị hợp tác phát triển */}
      <Modal show={showCoOp} onHide={handleCloseCoOp} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Hợp tác phát triển</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Chế độ đại lý nền tảng
          </p>
          <p>
            Thành viên Mercado Libre có thể trở thành đại lý của nền tảng thương mại điện tử
          </p>
          <p>
            Bằng cách giới thiệu người mới tham gia cùng trở thành thành viên Mercado Libre & các đại lý có thể nhận được phần thưởng bổ sung giá trị 00,01% . Khuyến mãi trực tiếp phần thưởng hoa hồng nhận được cho cấp bậc thành viên từ 0.25% & vốn đầu tư để tính lợi nhuận thu được từ các mã sản phẩm.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCoOp}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}