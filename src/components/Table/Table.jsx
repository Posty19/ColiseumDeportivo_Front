import TableRow from "../TableRow/TableRow";

const Table = ({ children, rows, dataType, fns}) => {
  return (
    <table>
      <tbody>
        {rows.map((row) => {
          return (
            <TableRow
              row={row}
              key={row.id || row._id}
              dataType={dataType}
              fns={fns}
            >
              {children}
            </TableRow>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
