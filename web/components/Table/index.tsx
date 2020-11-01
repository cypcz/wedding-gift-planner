import { Column, useTable } from "react-table";

interface Props {
  columns: Column[];
  data: any;
}

const Table: React.FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead className="bg-secondary border-b-1 border-input">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="pl-2 h-12">
                {column.render("header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="border-b-1 border-gray-500 hover:bg-bg">
              {row.cells.map((cell) => (
                <td className="w-40 h-10 pl-2" {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
