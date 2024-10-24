import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import depositImg from "../../assets/deposit.jpg";
import './Address.scss';
import { useNavigate } from 'react-router-dom';

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
        <div className='address-container-main py-5'>
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
                                    <Form.Label>Chọn địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="province"
                                        placeholder='Nhập địa chỉ'
                                        value={formik.values.province}
                                        onChange={formik.handleChange}
                                        className={`${formik.errors.province && formik.touched.province ? 'is-invalid' : ''}`}
                                        style={{ transition: 'all 0.3s ease-in-out' }}
                                    />
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
                                        type="text"
                                        name="province"
                                        value={selectedProvince}
                                        readOnly
                                        className="readonly-input"
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default Address;
