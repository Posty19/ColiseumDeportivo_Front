import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ id, img, title, subtitle, className }) => {
  return (
    <div className={className}>
      {img && (
        <Link to={`/${className}/${id}`}>
          <img
            src={`https://coliseumdeportivo-back.onrender.com/files/download/${img}`}
            crossOrigin="use-credentials"
            alt={title}
          />
        </Link>
      )}
      <div className="cardText">
        <Link to={`/${className}/${id}`}>
        <h3>{title}</h3>
      </Link>
      {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};
export default Card;
