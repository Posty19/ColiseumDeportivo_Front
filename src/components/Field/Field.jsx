const Field = ({ atrs, change, value }) => {
  const isFile = atrs.type === "file";
  return (
    <div className="formField">
      <label htmlFor={atrs.name}>{atrs.placeHolder}</label>
      <input
        type={atrs.type}
        id={atrs.name}
        placeholder={atrs.placeHolder}
        name={atrs.name}
        onChange={change}
        {...(!isFile && { value: value || "" })}
      />
    </div>
  );
};

export default Field;
