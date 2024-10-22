import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './styles/global.scss';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './routes/PrivateRoute';
import Home from './containers/Home/Home';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Warehouse from './containers/Warehouse/Warehouse';
import InfoBank from './containers/Bank/InfoBank';
import Withraw from './containers/Withraw/Withraw';
import Events from './containers/Events/Events';
import WithrawHistory from './containers/WithrawHistory/WithrawHistory';
import DepositHistory from './containers/DepositHistory/DepositeHistory';
import Deposit from './containers/Deposit/Deposit';
import CustomerService from './containers/CustomerService/CustomerService';
import Address from './containers/Address/Address';
import Group from './containers/GroupReport/Group';
import OrderHistory from './containers/OrderHistory/OrdeHistory';
import HotProduct from './containers/Home/HotProduct';
import Profiles from './containers/Profiles/Profiles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/" element={<App />} >
          <Route 
            index
            path="home" 
            element={
              <Home/>
            } 
          />

          {/* Login */}
          {/* <Route 
            path="login" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Login />} 
          /> */}

          {/* Register */}
          {/* <Route 
            path="register" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Register />} 
          /> */}

          {/* Order detail */}
          <Route path='order-detail' element={
            
            <HotProduct/>

          }/>

          {/* Events */}
          <Route path='events' element={
          
              <Events />
          
          }/>

          {/* Warehouse */}
          <Route path='warehouse' element={
          
              <Warehouse />
          
          }/>

          {/* Customer service */}
          <Route path='customer-service' element={
          
              <CustomerService/>
          
          }/>

          <Route path='profiles' element={

            <Profiles/>

          }/>

          {/* Deposit */}
          <Route path="deposit" element={
          
              <Deposit/>
          
          }/>

          {/* Withraw */}
          <Route path='withraw' element={
          
              <Withraw/>
          
          }/>

          {/* Withraw history */}
          <Route path='withraw-history' element={
          
              <WithrawHistory />
          
          }/>

          {/* Deposit history */}
          <Route path='deposit-history' element={
          
              <DepositHistory />
          
          }/>

          {/* Order history */}
          <Route path='order-history' element={
            
              <OrderHistory/>
          
          }/>

          {/* Group report */}
          <Route path='group-report' element={
          
              <Group/>
          
          }/>

          {/* Bank account */}
          <Route path='bank-account' element={
          
              <InfoBank/>
          
          }/>

          {/* Address */}
          <Route path='address' element={
          
              <Address/>
          
          }/>
        </Route>
      </Routes>      
    </BrowserRouter>
  </StrictMode>,
)
