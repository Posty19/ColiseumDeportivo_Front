import TableRow from "../TableRow/TableRow";

const Table = ({ children, rows, dataType }) => {
  return (
    <table>
      <tbody>
        {rows.map((row) => {
          return (
            <TableRow row={row} key={row.id || row._id} dataType={dataType}>
              {children}
            </TableRow>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
