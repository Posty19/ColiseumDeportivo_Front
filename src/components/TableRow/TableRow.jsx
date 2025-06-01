import { useEffect, useState } from "react";

import TableData from "../TableData/TableData";
import Button from "../Button/Button";

const TableRow = ({ row, dataType, fns, children }) => {
  const [view, setview] = useState(false);

  useEffect(() => {
    if (row.role && row.role === "admin") {
      setview(true);
    } else () => setview(false);
  }, [row.role]);

  const fields = [
    "name",
    "lastName",
    "email",
    "role",
    "status",
    "title",
    "subTitle",
  ];
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
        <Button
          type={"update"}
          txt="Actualizar"
          dataType={dataType}
          fn={() => fns.update(row._id || row.id)}
        />
      </td>
      <td>
        <Button
          type={"delete"}
          txt="Eliminar"
          dataType={dataType}
          disabled={view}
          fn={() => fns.delete.mutate(row.id || row._id)}
        />
      </td>
    </tr>
  );
};
export default TableRow;
