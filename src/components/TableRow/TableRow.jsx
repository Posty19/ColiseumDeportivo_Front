import TableData from "../TableData/TableData";
import Button from "../Button/Button";

const TableRow = ({ children, row, dataType }) => {
  console.log(row);
  const fields = ["name", "lastName", "email", "role", "status"];
  return (
    <tr>
      {Object.entries(row).map(([key, value]) => {
        return fields.includes(key) ? (
          <TableData key={`${row._id || row.id}:${key}`} data={value}>
            {children}
          </TableData>
        ) : null;
      })}
      <td>
        <Button id={row.id || row._id} type={"update"} dataType={dataType} />
      </td>
      <td>
        <Button id={row.id || row._id} type={"delete"} dataType={dataType} />
      </td>
    </tr>
  );
};
export default TableRow;
