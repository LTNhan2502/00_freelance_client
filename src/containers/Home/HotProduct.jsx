import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Big from 'big.js';
import { getOneUserByUsername } from '../../utils/userAPI';
import { getAllProduct, profitDistribution, updateUsernameToProduct } from '../../utils/product';
import { getImages } from '../../utils/getImage';
import businessImg from '../../assets/background-distribute.jpg';
import './HotProduct.scss';

function HotProduct({thisUser, setThisUser, userAmount, setUserAmount}) {
    const [distProduct, setDistProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isClickReceive, setIsClickReceive] = useState(null)
    // State này là để kiểm soát không cho thực hiện hành động 2 lần
    const [isProcessing, setIsProcessing] = useState(false); 
    const [updatedProfit, setUpdatedProfit] = useState(0);
    // const [updatedProfit, setUpdatedProfit] = useState(parseFloat(thisUser?.profit) || 0);
    const userName = localStorage.getItem("user_name");
    const maxDist = thisUser?.memberId?.distribution;

    useEffect(() => {
        if (userName) {
            fetchUserAmount(); 
            fetchProductsNoUsername();
        } 
    }, [userAmount]);  

    useEffect(() => {
        if (thisUser && thisUser.profit) {
            setUpdatedProfit(parseFloat(thisUser.profit));
        }
    }, [thisUser]);

    const fetchUserAmount = async () => {
        if (!userName) {
            setUserAmount(0);
            return;
        }
    
        try {
            const res = await getOneUserByUsername(userName);
            const userData = res.data.data || {};
    
            // Sử dụng phương pháp nhân chia để đảm bảo độ chính xác
            const rawAmount = userData.amount || 0;
            const fixedAmount = Math.round((rawAmount + Number.EPSILON) * 100) / 100;
    
            setUserAmount(fixedAmount);
            setThisUser(userData);
            console.log(thisUser);
    
        } catch (error) {
            console.error("Error fetching user amount:", error);
            setUserAmount(0);
        }
    };
        
    const fetchProductsNoUsername = async () => {
        try {
            const products = await getAllProduct();
            const result = products.data.data;
            setDistProduct(result);
        } catch (error) {
            console.error("Fetch thất bại:", error);
        }
    };
    
    const fetchImage = async (imageName) => {
        try {
            const result = await getImages(imageName);
            return URL.createObjectURL(result.data);
        } catch (error) {
            console.error("Lỗi khi lấy hình ảnh:", error);
            return null;
        }
    };

    // Kiểm tra xem user có thể nhận hàng tiếp được không
    const handleReceivable = async () => {  
        console.log(maxDist);
             
        const isCurrentDist = distProduct.filter(
            (product) => product.userName === userName && product.status === "waiting"
        );

        if (isCurrentDist.length !== 0 || isClickReceive === true) {
            toast.error("Có đơn hàng chưa thanh toán, vui lòng thanh toán trước!");
            return;
        }else{                        
            if (Number(thisUser.distributionTurn) >= maxDist) {
                toast.error("Đã hết lượt phân phối hôm nay");
                return;
            }else{
                handleClickReceive(); // Thực hiện nhận phân phối
            }
        }
    };

    // Khi nhấn vào Nhận thì thực hiện các hàng động sau
    const handleClickReceive = async () => {
        const productsCanDist = distProduct.filter(
            (product) => !product.userName && product.price <= userAmount
        );
    
        if (productsCanDist.length === 0) {
            toast.error("Không có sản phẩm nào phù hợp với số dư hiện tại");
            return;
        }
    
        // Lấy random 1 sản phẩm trong data
        const randomIndex = Math.floor(Math.random() * productsCanDist.length);
        const selectedProduct = productsCanDist[randomIndex];
    
        // Fetch api img
        const imageUrl = await fetchImage(selectedProduct.imageProduct);
    
        // Cập nhật selectedProduct và mở modal
        setSelectedProduct({ ...selectedProduct, imageUrl }); 
        setShowModal(true);
    };
    
    // Nhận sản phẩm, gán sở hữu cho user (nút huỷ trong modal)
    const handleCancelReceive = async () => {
        try {
            await updateUsernameToProduct(selectedProduct._id, userName);
            setIsClickReceive(thisUser.isDistribute)

            toast.success(`Nhận thành công sản phẩm: ${selectedProduct.productName}`);
            console.log(isClickReceive);
            
            setShowModal(false);
        } catch (error) {
            toast.error("Cập nhật sở hữu sản phẩm thất bại");
            console.error("Lỗi cập nhật sở hữu:", error);
        }
    };
    
    // Thực hiện phân phối (nút phân phối trong modal)
    const handleReceiveDist = async (productId) => {
        if (isProcessing) return;
        setIsProcessing(true);
      
        try {
            await updateUsernameToProduct(selectedProduct._id, userName);
        
            const totalDistribution = new Big(selectedProduct.price).times(selectedProduct.quantity);
            const profitAmount = new Big(selectedProduct.price).times(selectedProduct.quantity).times(0.0024).round(2);
            const refundAmount = totalDistribution.plus(profitAmount).round(2);
            const newUserAmount = new Big(userAmount).minus(totalDistribution).plus(refundAmount).round(2);
        
            // Cập nhật số dư với Big.js xử lý
            setUserAmount(newUserAmount.toString());  
            setUpdatedProfit((prevProfit) => new Big(prevProfit).plus(profitAmount).toFixed(2));
            handleSubmitDist(productId, refundAmount.toString(), profitAmount.toString());
      
        } catch (error) {
            toast.error("Cập nhật sở hữu sản phẩm thất bại");
            console.error("Lỗi cập nhật sở hữu:", error);
        } finally {
            setIsProcessing(false);
        }
    };
    
    // Phân phối sản phẩm (chuyển trạng thái sang success)
    const handleSubmitDist = async (productId, refund, profit) => {        
        try {
            const res = await profitDistribution(productId, userName, refund, profit);
            if (res?.data?.data === "Lợi nhuận phân phối thành công") {
                toast.success("Phân phối thành công");
            }
            handleCloseDistInfo();
        } catch (error) { 
            console.log("Error fetching: ", error);
            toast.error("Phân phối thất bại");
        }
    };    

    const handleReject = () => {
        toast.error("Bạn chưa mua gói");
    };

    // Hàm làm tròn với độ chính xác nhất định
    const roundToTwo = (num) => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const handleCloseDistInfo = () => setShowModal(false);

    return (
        <div className="text-center">
            <img className="distribution-img" src={businessImg} alt="Business" />

            <Button
                variant="primary"
                className="mt-3"
                onClick={() => !thisUser?.memberId ? handleReject() : handleReceivable()}
                style={{
                    backgroundColor: "#0262b0",
                    borderRadius: "0.325rem",
                    fontSize: "15px",
                    width: "150px"
                }} 
            >
                Nhận
            </Button>

            {selectedProduct && (
                <Modal show={showModal} onHide={handleCloseDistInfo} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="h-100 received-product-card"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                margin: "0",
                                border: "none",
                                backgroundColor: "transparent",
                                backdropFilter: "blur(6px)",
                            }}
                        >
                            <Card.Img
                                variant="left"
                                src={selectedProduct.imageUrl || ''}
                                style={{ width: '150px', height: '100%', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>
                                    <div>Mã: {selectedProduct._id}</div>
                                    <div className="mt-2">Tên: {selectedProduct.productName}</div>
                                </Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Text>{selectedProduct.price.toFixed(2)} €</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>X{selectedProduct.quantity}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='warehouse-info mt-2'>
                                    <Col>
                                        <Card.Text>Tổng phân phối</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>{(selectedProduct.price * selectedProduct.quantity).toFixed(2)} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='warehouse-info'>
                                    <Col>
                                        <Card.Text>Lợi nhuận</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text>{Number((selectedProduct.price * selectedProduct.quantity * 0.0024).toFixed(2))} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row className='warehouse-info'>
                                    <Col>
                                        <Card.Text>Hoàn nhập</Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Card.Text className='fs-4 text-red'>{(selectedProduct.price * selectedProduct.quantity * 0.0024 + selectedProduct.price * selectedProduct.quantity).toFixed(2)} €</Card.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="text-end">
                                        <Button variant="danger" className="mt-3" onClick={() => handleCancelReceive()}>
                                            Huỷ
                                        </Button>
                                        <Button variant="primary" className="mt-3 ms-2" 
                                            onClick={() => {
                                                
                                                handleReceiveDist(selectedProduct._id);
                                            }}
                                        >
                                            Phân phối
                                        </Button>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Modal.Body>                    
                </Modal>
            )}

            <Card className="mt-4 distribution-card">
                <Card.Body>
                    <Row>
                        <Col md={8} className="text-start"><strong>Số dư:</strong></Col>
                        <Col md={4} className="text-end">{`${userAmount} €`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className="text-start"><strong>Cấp hiện tại:</strong></Col>
                        <Col md={4} className="text-end">{thisUser?.memberId?.packageName || 'Không'}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.memberId?.discountFrom || 0}% - ${thisUser?.memberId?.discountTo || 0}%`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Đơn hàng đã phân phối:</strong></Col>
                        <Col md={4} className="text-end">{`${thisUser?.distributionTurn || 0}/${thisUser?.memberId?.distribution || 0}`}</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu hôm qua:</strong></Col>
                        <Col md={4} className="text-end">1.12 €</Col>
                    </Row>
                    <Row>
                        <Col md={8} className='text-start'><strong>Chiết khấu hôm nay:</strong></Col>
                        <Col md={4} className="text-end">{`${updatedProfit} €`}</Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="mt-4 app-rules-card">
                <Card.Body>
                    <Row>
                        <Col md={12} className="text-start">
                            <p>Khi bạn trở thành thành viên Mercado Libre, bạn sẽ nhận được các mã sản phẩm có liên quan về đơn đặt hàng , bao gồm thông tin sản phẩm chi tiết đơn hàng , giá trị sản phẩm , số lượng ...vv..</p>
                            <p>Thành viên của Mercado Libre sẽ là nhà trung gian giúp  xác nhận đơn hàng giữa các NHÀ SẢN XUẤT & QUÝ ĐỐI TÁC ( người đặt mua ).</p>
                            <p>Thành viên của Mercado Libre sẽ là nhà trung gian giúp  xác nhận đơn hàng giữa các NHÀ SẢN XUẤT & QUÝ ĐỐI TÁC ( người đặt mua ).</p>
                        </Col>
                    </Row>                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default HotProduct;
