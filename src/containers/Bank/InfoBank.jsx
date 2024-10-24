import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOneUserByUsername } from '../../utils/userAPI';
import { createBank, getBankByUserId } from '../../utils/bank';
import bankAccountImg from '../../assets/bank-account-img.jpg';
import './InfoBank.scss';
import { faAngleLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const banks = [
    'Agribank', 'BIDV', 'Vietcombank', 'Vietinbank', 'Techcombank',
    'ACB', 'VPBank', 'SHB', 'HDBank', 'Standard Chartered Bank',
    'HSBC', 'Citibank', 'ANZ Bank', 'ABBank', 'Bangkok Bank',
    'Barclays Lloyds', 'Banking Group', 'Royal Bank of Scotland (RBS)',
    'Santander UK', 'Société Générale', 'Crédit Agricole', 'Crédit Lyonnais (LCL)',
    'Mitsubishi UFJ (MUFG)', 'Sumitomo Mitsui Trust', 'Mizuho', 'Resona',
    'Shinsei', 'UniCredit', 'Cassa Depositi e Prestiti', 'Banco BPM',
    'NongHyup Bank', 'Shinhan', 'KB (Kookmin Bank)', 'Woori',
    'VBSP', 'NCB', 'Sacombank', 'Maritime Bank', 'TPBank',
    'OCB', 'LienVietPostBank', 'Vietnam Post', 'Viet A Bank', 'HPBank',
    'KienLong Bank', 'Nam A Bank', 'GPBank', 'PVcomBank', 'Bac A Bank',
    'Viet Capital Bank', 'Indovina Bank', 'VRB', 'UOB',
    'Hong Leong', 'Maybank', 'Eximbank', 'VIB', 'DongA Bank',
    'SGB', 'CBB', 'Cathay United', 'JP Morgan', 'Bank of Tokyo-Mitsubishi UFJ',
    'Shanghai Pudong Development Bank', 'Taiwan Cooperative Bank', 'Qatar National Bank',
    'Abu Dhabi Commercial Bank'
];
  
  

function InfoBank() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("user_name")
    const [thisUser, setThisUser] = useState(null)
    const [isHaveAccount, setIsHaveAccount] = useState(false)
    const [userBankAccount, setUserBankAccount] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const [filteredBanks, setFilteredBanks] = useState(banks); // Tạo danh sách gợi ý ban đầu
    const [isClick, setIsClick] = useState(false);

    // Hàm xử lý khi nhập vào ô input
    const handleInputChange = (event) => {
        const { value } = event.target;

        // Lọc danh sách ngân hàng dựa vào ký tự nhập
        const filtered = banks.filter((bank) =>
            bank.toLowerCase().includes(value.toLowerCase()) // Kiểm tra có chứa chuỗi nhập vào
        );
        setFilteredBanks(filtered); // Cập nhật danh sách ngân hàng
        formik.handleChange(event); // Giữ lại xử lý của formik
    };

    useEffect(() => {
        fetchThisUser()
    }, [isHaveAccount])

    
    const fetchThisUser = async() => {
        try {
            const res = await getOneUserByUsername(userName)
            const userData = res.data.data
            
            setThisUser(userData)
            console.log("User data: ",userData);
            
            fetchIsHaveAccount(userData._id);
        } catch (error) {
            console.log("Error fetching: ", error);       
        }
    }
    
    const fetchIsHaveAccount = async(userId) => {
        const res = await getBankByUserId(userId)
        const result = res.data.data
        console.log("User bank account: ",result);
        
        if(result === null){
            setIsHaveAccount(false)
            setUserBankAccount(null)
        }else{
            setIsHaveAccount(true)
            setUserBankAccount(result)
        }
    }

    const formik = useFormik({
        initialValues: {
            nameBank: "",
            userBank: "",
            numberBank: "",
            passwordBank: ""
        },

        validationSchema: Yup.object({
            nameBank: Yup.string()                
                .required("Không được để trống"),
            userBank: Yup.string()                
                .required("Không được để trống"),
            numberBank: Yup.string()
                .required("Không được để trống"),  
            passwordBank: Yup.string().required("Không được để trống"),  

        }),

        onSubmit: async(values) => {  
            // console.log(values);
            // return;

                                 
            const registerBankAPI = await createBank(
                values.nameBank, 
                values.userBank, 
                values.numberBank, 
                thisUser._id
            )

            if(registerBankAPI && registerBankAPI.data.EC === 0) {
                toast.success("Liên kết thành công")
                setIsHaveAccount(true)
            } else {
                console.log("Có lỗi xảy ra");
            }
        }
    })

    const handleShowOrHide = () => {
        setShowPassword(!showPassword);
    };

    const handleGoToHome = () => {
        navigate("/home")
    }

    // Format số tài khoản ngân hàng thành dạng 28****37
    const formatBankAccount = (accountNumber) => {
        if (!accountNumber) return 0;
        const accountStr = accountNumber.toString(); // Chuyển số tài khoản thành chuỗi
        const firstPart = accountStr.slice(0, 2); // lấy 2 số đầu
        const lastPart = accountStr.slice(-2); // lấy 2 số cuối
        const middlePart = '*'.repeat(4); // thay thế phần giữa bằng dấu *
        return `${firstPart}${middlePart}${lastPart}`;
    };

    return (
        <Container className='custom-container-bank-account'>
            <Row className='my-4 justify-content-center custom-row'>
                <Card className="ct-bank-card"> 
                    <Row>
                        <Col xs={12} md={6} className="left-col">
                            <img 
                                src={bankAccountImg}
                                alt="Bank Info Image" 
                                className="bank-image"
                            />
                        </Col>
                        <Col xs={12} md={6} className='p-4 custom-bank-account-col'>
                            <Row className='backArrow'>
                                <span onClick={handleGoToHome}>
                                    <FontAwesomeIcon icon={faAngleLeft}/> Thông tin ngân hàng
                                </span>
                            </Row>
                            <Card className='ct-card'>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12}>
                                            <div className='bank-linking-container'>
                                                <Form onSubmit={formik.handleSubmit}>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Tên ngân hàng</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="nameBank"
                                                            placeholder="Nhập tên ngân hàng"
                                                            value={isHaveAccount ? userBankAccount?.nameBank : formik.values.nameBank}
                                                            onChange={handleInputChange}
                                                            onFocus={() => setIsClick(true)} // Khi người dùng click vào input, hiển thị dropdown
                                                            onBlur={() => setTimeout(() => setIsClick(false), 100)} // Ẩn dropdown khi input mất focus, thêm độ trễ để xử lý chọn gợi ý
                                                            className={`${formik.errors.nameBank && formik.touched.nameBank ? 'is-invalid' : ''}`}
                                                            disabled={isHaveAccount}
                                                            autoComplete="off" // Tắt autoComplete mặc định của trình duyệt
                                                            style={{ transition: "all 0.3s ease-in-out" }}
                                                        />

                                                        {/* Hiển thị gợi ý tên ngân hàng */}
                                                        {!isHaveAccount && isClick && filteredBanks.length > 0 && (
                                                            <div className="autocomplete-dropdown">
                                                            {filteredBanks.map((nameBank, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="autocomplete-item"
                                                                    onClick={() => {
                                                                        formik.setFieldValue("nameBank", nameBank); // Cập nhật giá trị khi người dùng chọn
                                                                        setFilteredBanks([]); // Ẩn danh sách sau khi chọn
                                                                    }}
                                                                >
                                                                {nameBank}
                                                                </div>
                                                            ))}
                                                            </div>
                                                        )}
                                                        
                                                        <Form.Control.Feedback type="invalid"
                                                            style={{ minHeight: '1.25rem' }}
                                                        >
                                                            {formik.errors.nameBank}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Số tài khoản</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            name='numberBank'
                                                            placeholder='Số tài khoản'
                                                            value={ isHaveAccount ? formatBankAccount(userBankAccount.numberBank) : formik.values.numberBank}
                                                            onChange={formik.handleChange}
                                                            isInvalid={formik.touched.numberBank && formik.errors.numberBank}
                                                            disabled={isHaveAccount}
                                                        />
                                                        <Form.Control.Feedback type="invalid"
                                                            style={{ minHeight: '1.25rem' }}
                                                        >
                                                            {formik.errors.numberBank}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Tên chủ thẻ</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            name='userBank'
                                                            placeholder='Tên chủ thẻ'
                                                            value={ isHaveAccount ? userBankAccount.userBank : formik.values.userBank}
                                                            onChange={formik.handleChange}
                                                            isInvalid={formik.touched.userBank && formik.errors.userBank}
                                                            disabled={isHaveAccount}
                                                        />
                                                        <Form.Control.Feedback type="invalid"
                                                            style={{ minHeight: '1.25rem' }}
                                                        >
                                                            {formik.errors.userBank}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    {isHaveAccount ? <></> : (
                                                        <>
                                                            <Form.Group className='mb-3'>
                                                                <Form.Label>Mật khẩu rút tiền</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        name='passwordBank'
                                                                        placeholder='Mật khẩu'
                                                                        value={formik.values.passwordBank}
                                                                        onChange={formik.handleChange}
                                                                        isInvalid={formik.touched.passwordBank && formik.errors.passwordBank}
                                                                        
                                                                    />
                                                                    <InputGroup.Text onClick={handleShowOrHide} 
                                                                        style={{ 
                                                                            cursor: 'pointer', 
                                                                            borderTopRightRadius: "0.375rem", 
                                                                            borderBottomRightRadius: "0.375rem" 
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                                                    </InputGroup.Text>
                                                                    <Form.Control.Feedback type="invalid"
                                                                        style={{ minHeight: '1.25rem' }}
                                                                    >
                                                                        {formik.errors.passwordBank}
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Button className='btn-login w-100' type='submit' variant='primary'>
                                                                Liên kết
                                                            </Button>                                                        
                                                        </>

                                                    )}
                                                </Form>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>



    )
}

export default InfoBank;
