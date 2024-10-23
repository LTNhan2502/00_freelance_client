import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import depositImg from "../../assets/deposit.jpg";
import './Address.scss';
import { useNavigate } from 'react-router-dom';

const provinces = [
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
    'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
    'Bình Thuận', 'Cà Mau', 'Cần Thơ', 'Cao Bằng', 'Đà Nẵng',
    'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp',
    'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương',
    'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa',
    'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn',
    'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận',
    'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi',
    'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh',
    'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang',
    'TP Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc',
    'Yên Bái'
];

function Address() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState(null);
  
    const formik = useFormik({
        initialValues: {
            province: ''
        },
        validationSchema: Yup.object({
            province: Yup.string().required('Không được để trống')
        }),
        onSubmit: (values) => {
            setSelectedProvince(values.province);
            setIsSubmitted(true); 
        },
    });

    const handleGoToHome = () => {
        navigate("/home")
    };

    return (
        <Container className='group-report-container-main py-5'>
            <div className='d-flex align-items-center py-pl'>
                <span onClick={handleGoToHome}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </span>
                <h1 className="text-start">Địa chỉ</h1>
            </div>
            <div>
                <Col xs={12}>
                    <div className='address-container'>
                        {!isSubmitted ? (
                            <Form onSubmit={formik.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Chọn tỉnh thành</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="province"
                                    value={formik.values.province}
                                    onChange={formik.handleChange}
                                    className={`${formik.errors.province && formik.touched.province ? 'is-invalid' : ''}`}
                                    style={{ transition: 'all 0.3s ease-in-out' }}
                                >
                                    <option value="">Chọn tỉnh thành...</option>
                                    {provinces.map((province, index) => (
                                        <option key={index} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </Form.Control>
                                {formik.errors.province && formik.touched.province && (
                                <div className="invalid-feedback">
                                    {formik.errors.province}
                                </div>
                                )}
                            </Form.Group>

                            {/* Nút submit */}
                            <Button className='btn-login w-100 mt-3' type='submit' variant='primary'>
                                Xác nhận
                            </Button>
                            </Form>
                        ) : (
                            <Form>
                                <Form.Group>
                                    <Form.Label>Thông tin của bạn</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="province"
                                        value={selectedProvince}
                                        readOnly
                                        className="readonly-input"
                                        style={{ transition: 'all 0.3s ease-in-out' }}
                                    >
                                        <option value={selectedProvince}>{selectedProvince}</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        )}
                    </div>
                </Col>
            </div>
        </Container>
    );
}

export default Address;
