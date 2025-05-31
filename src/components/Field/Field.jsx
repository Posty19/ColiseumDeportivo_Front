const Field = ({ atrs, change, value }) => {
  return (
    <div className="formField">
      <label htmlFor={atrs.name}>{atrs.placeHolder}</label>
      <input
        type={atrs.type}
        id={atrs.name}
        placeholder={atrs.placeHolder}
        name={atrs.name}
        onChange={change}
        value={value?value:''}
      />
    </div>
  );
};

export default Field;
