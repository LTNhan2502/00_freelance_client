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
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />

          {/* Login */}
          <Route 
            path="login" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Login />} 
          />

          {/* Register */}
          <Route 
            path="register" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Register />} 
          />

          {/* Events */}
          <Route path='events' element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }/>

          {/* Warehouse */}
          <Route path='warehouse' element={
            <PrivateRoute>
              <Warehouse />
            </PrivateRoute>
          }/>

          {/* Customer service */}
          <Route path='customer-service' element={
            <PrivateRoute>
              <CustomerService/>
            </PrivateRoute>
          }/>

          {/* Deposit */}
          <Route path="deposit" element={
            <PrivateRoute>
              <Deposit/>
            </PrivateRoute>
          }/>

          {/* Withraw */}
          <Route path='withraw' element={
            <PrivateRoute>
              <Withraw/>
            </PrivateRoute>
          }/>

          {/* Withraw history */}
          <Route path='withraw-history' element={
            <PrivateRoute>
              <WithrawHistory />
            </PrivateRoute>
          }/>

          {/* Deposit history */}
          <Route path='deposit-history' element={
            <PrivateRoute>
              <DepositHistory />
            </PrivateRoute>
          }/>

          {/* Bank account */}
          <Route path='bank-account' element={
            <PrivateRoute>
              <InfoBank/>
            </PrivateRoute>
          }/>

        </Route>
      </Routes>      
    </BrowserRouter>
  </StrictMode>,
)
