
import "./Loading.css";

const Loading = ({ text = "جاري التحميل..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Loading;
