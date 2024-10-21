import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navi from "../containers/Navigation/Navi";

function App() {
  return (
    <>
        <div className="main-container-image"></div>
        <div className="main-container">
          <div className="content-container">            
            <div className="content">
              <Outlet/>
            </div>
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
