import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";
import Navi from "../containers/Navigation/Navi";
import { createContext } from "react";

export const CurrencyContext = createContext()
const formatCurrency = (amount) => {
  const num = parseFloat(amount);

  if (isNaN(num)) {
    return '0,00'; 
  }

  return num
    .toFixed(2) // Đảm bảo có 2 chữ số thập phân
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // Thêm dấu khoảng trắng giữa các nhóm 3 số
    .replace('.', ','); // Đổi dấu chấm thập phân thành dấu phẩy
};

function App({ children }) {
  const location = useLocation()
  const isEventPage = location.pathname.includes("/events")
  const isLoginPage = location.pathname.includes("/login")
  const isRegisterPage = location.pathname.includes("/register")

  const targetBackground = isEventPage ? "event-background" : (isLoginPage ||  isRegisterPage) ? "auth-background" : "default-background"

  return (
    <CurrencyContext.Provider value={{ formatCurrency  }}>
      <div className="main-container-image"></div>
      <div className={`main-container ${targetBackground}`}>
        <div className="content-container">            
          {/* <div className="content"> */}
            <Outlet/>
          {/* </div> */}
          <div className="navigation">
            <Navi/>
          </div>
        </div>
      </div>

      {/* Toastify dùng để hiển thị thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CurrencyContext.Provider>
  )
}

export default App
