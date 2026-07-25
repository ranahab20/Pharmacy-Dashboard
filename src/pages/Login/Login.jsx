import React from "react";
import Title from "../../components/Title/Title";
import logo from "../../assets/logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./Login.css"

const Login = () => {
  return (
    // <>
    // //   <img src={logo} alt="logo" className="logo" />
    // //   <form className="card">
    // //     <Title>تسجيل الدخول</Title>
    // //     <div className="card-input">
    // //       <div className="input1">
    // //         <label htmlFor="email">رقم الهاتف أو الحساب الالكتروني</label>
    // //         <input type="text" placeholder="أدخل رقم الهاتف/ الحساب الالكتروني" />
    // //       </div>
    // //       <div className="input2">
    // //         <label htmlFor="password">كلمة المرور</label>
    // //         <input type="password" placeholder="أدخل كلمة المرور" />
    // //       </div>
    // //     </div>
    // //     <Button>تسجيل الدخول</Button>
    // //   </form>
    //</>
    <>
    <div className="container">
      <div className="left-sec">
        <img src={logo} alt="logo" className="logo" />
        <p>مرحباً بك في نظام إدارة صيدلية دواءك</p>
      </div>
      <div className="right-sec">
        <form className="login">
          <Title classname={"log-title"}>تسجيل الدخول</Title>
          <div className="email-sec">
            <label htmlFor="email">الحساب الالكتروني</label>
            <Input 
            type="email"
            placeholder="أدخل الحساب الالكتروني"
            id="email"
            name="email"
            />
          </div>
          <div className="pass-sec">
            <label htmlFor="password">كلمة المرور</label>
            <Input 
            type="password"
            placeholder="أدخل كلمة المرور"
            id="password"
            name="password"
            />
          </div>
          <Button classname={"log-btn"}>تسجيل دخول <span></span></Button>
          
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
