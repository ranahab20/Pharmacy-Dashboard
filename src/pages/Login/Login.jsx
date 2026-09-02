import React from "react";
import Title from "../../components/Title/Title";
import logo from "../../assets/logo.png";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./Login.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import api from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const inputHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    validateField(e.target.name, e.target.value);
    console.log(e.target.value);
    setServerError("");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setServerError("");
      const response = await api.post("/auth/login", {
        email: user.email,
        password: user.password,
      });
      console.log("Login response:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success(response.data.message);
      navigate("/Pharmacy/home");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response?.status === 401) {
        setServerError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        toast.error(
          error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
        );
      } else {
        setServerError(
          error.response.data?.message || "حدث خطأ أثناء تسجيل الدخول",
        );
      }
    } finally {
      setLoading(false);
    }
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
          password: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
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
      <div className="login-page">
        <div className="login-left">
          <img src={logo} alt="logo" className="login-logo" />
          <p className="login-welcome">مرحباً بك في نظام إدارة صيدلية دواءك</p>
        </div>
        <div className="login-right">
          <form className="login-form" onSubmit={submitHandler}>
            <Title classname={"login-title"}>تسجيل الدخول</Title>
            <div className="login-field">
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
            <div className="login-field">
              <label htmlFor="password">كلمة المرور</label>
              <div className="login-password-wrapper">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  id="password"
                  name="password"
                  onChange={inputHandler}
                  value={user.password}
                  minLength={8}
                  required
                />
                <span className="login-eye" onClick={toggleHandler}>
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && <p className="login-error">{errors.password}</p>}
              {serverError && <p className="login-error">{serverError}</p>}
            </div>
            <Button
              type="submit"
              className="login-button"
              disabled={
                !user.email.trim() ||
                !user.password.trim() ||
                errors.password ||
                loading
              }
            >
              تسجيل دخول{" "}
              <span className="login-chevron">
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
