import { useNavigate } from "react-router-dom";
import "./IndexPage.scss";

function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="index-container">
        <div className="overlay"></div>
        <div className="index-header">
            <div className="header-brand">mercado libre</div>
            <div className="header-element">E-commerce shopping center</div>
            <div className="paragraph">
                We are 21 years old since the beginning of that adventure in a garage in the Saavedra neighborhood, in the city of Buenos Aires. We have come a long way, but we are convinced that the best is yet to come.
            </div>
            <div className="button-container">
                <div className="button-content">
                    <button className="go-to-login-btn" onClick={() => navigate("/login")}>Login</button>
                    <button className="go-to-register-btn" onClick={() => navigate("/register")}>Register</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default IndexPage;
