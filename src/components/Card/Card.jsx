import { Link } from "react-router-dom";

const Card = ({ id,img, title, subtitle, className }) => {
  return (
    <div className={className}>
      {img && (
        <img
          src={`http://localhost:3000/files/download/${img}`}
          crossOrigin="use-credentials"
          alt={title}
        />
      )}
      <Link to={`/${className}/${id}`} >
        <h3>{title}</h3>
      </Link>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
export default Card;
