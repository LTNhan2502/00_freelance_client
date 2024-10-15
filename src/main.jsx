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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>      
      <Routes>
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
          <Route 
            path="login" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Login />} 
          />
          <Route 
            path="register" 
            element={localStorage.getItem("access_token") ? <Navigate to="/home" /> : <Register />} 
          />
          <Route path='warehouse' element={
            <PrivateRoute>
              <Warehouse />
            </PrivateRoute>
          }/>

          <Route path='events' element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }/>

          <Route path='withraw-history' element={
            <PrivateRoute>
              <WithrawHistory />
            </PrivateRoute>
          }/>

          {/* Bank account */}
          <Route path='bank-account' element={<InfoBank/>}/>

          {/* Withraw */}
          <Route path='withraw' element={<Withraw/>}/>
        </Route>
      </Routes>      
    </BrowserRouter>
  </StrictMode>,
)
