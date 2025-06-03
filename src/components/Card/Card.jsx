const Card = ({ img, title, subtitle, className }) => {
  return (
    <div className={className}>
      <img
        src={`http://localhost:3000/files/download/${img}`}
        crossOrigin="use-credentials"
        alt={title}
      />
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};
export default Card;
