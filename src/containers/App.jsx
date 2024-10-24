import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";
import Navi from "../containers/Navigation/Navi";

function App() {
  const location = useLocation()
  const isEventPage = location.pathname.includes("/events")
  const isLoginPage = location.pathname.includes("/login")
  const isRegisterPage = location.pathname.includes("/register")

  const targetBackground = isEventPage ? "event-background" : (isLoginPage ||  isRegisterPage) ? "auth-background" : "default-background"
  return (
    <>
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
      </>
  )
}

export default App
