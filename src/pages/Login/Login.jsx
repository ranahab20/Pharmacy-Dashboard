import React from "react";
import Title from "../../components/Title/Title";
import logo from "../../assets/logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./Login.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    validateField(e.target.name, e.target.value);
    console.log(user);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
  };
  const [visible, setVisiblity] = useState(false);
  const toggleHandler = (e) => {
    setVisiblity(!visible);
  };
  const [errors, setError] = useState({ email: "", password: "" });
  const validateField = (name, value) => {
    if (name === "password") {
      if (value.length < 8) {
        setError({
          ...errors,
          password:"يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"
        });
      } else {
        setError({
          ...errors,
          password: "",
        });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="left-sec">
          <img src={logo} alt="logo" className="logo" />
          <p>مرحباً بك في نظام إدارة صيدلية دواءك</p>
        </div>
        <div className="right-sec">
          <form className="login" onSubmit={submitHandler}>
            <Title classname={"log-title"}>تسجيل الدخول</Title>
            <div className="email-sec">
              <label htmlFor="email">الحساب الالكتروني</label>
              <Input
                type="email"
                placeholder="أدخل الحساب الالكتروني"
                id="email"
                name="email"
                onChange={inputHandler}
                value={user.email}
                required
              />
            </div>
            <div className="pass-sec">
              <label htmlFor="password">كلمة المرور</label>
              <div className="flex-icon">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  id="password"
                  name="password"
                  onChange={inputHandler}
                  value={user.password}
                  required
                />
                <span className="eye-icon" onClick={toggleHandler}>
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <Button
              type="submit"
              classname={"log-btn"}
              disabled={
                !user.email.trim() || !user.password.trim() || errors.password
              }
            >
              تسجيل دخول{" "}
              <span className="chevron-icon">
                <FaChevronLeft />
              </span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
