import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Splash.css";

function Splash() {
  // const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash">
      <img src={logo} alt="logo" className="logo" />
      <h4>مرحباً بك في نظام إدارة صيدلية دواءك</h4>
    </div>
  );
}

export default Splash;
