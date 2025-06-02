import "./ShowMessage.css";

const ShowMessage = ({ txt, clas }) => {
  return <div className={clas}>{txt}</div>;
};
export default ShowMessage;
