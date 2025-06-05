
import './Field.css'

const Field = ({ atrs, register, error }) => {
  //const isFile = atrs.type === "file";
  return (
    <div className="formField">
      <label htmlFor={atrs.name}>{atrs.placeHolder}</label>
      <input
        type={atrs.type}
        id={atrs.name}
        placeholder={atrs.placeHolder}
        name={atrs.name}
        {...register(atrs.name)}
      />
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default Field;
