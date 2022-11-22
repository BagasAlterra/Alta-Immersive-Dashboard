import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { Button } from "components/Button";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  columns: ColumnDef<any>[];
  options?: ReactNode;
  page?: number;
  data?: any[];
  onClickPrev?: () => void;
  onClickNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
}

const Table: FC<Props> = ({
  data = [],
  columns,
  page = 1,
  options,
  onClickPrev,
  onClickNext,
  disabledPrev,
  disabledNext,
}) => {
  const table = useReactTable({
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    columns,
    data,
  });

  return (
    <div className="flex h-full w-full flex-col items-end gap-3">
      {options}
      <div className="w-full overflow-auto">
        <table className="table-zebra table w-full" data-theme="light">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className="!relative !z-0"
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="hover">
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === "id") {
                      return (
                        <th
                          className="!relative !z-0"
                          {...{
                            key: cell.id,
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </th>
                      );
                    } else {
                      return (
                        <td
                          {...{
                            key: cell.id,
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="btn-group">
        <Button
          id="button-prev"
          variant="secondary"
          label="«"
          onClick={onClickPrev}
          loading={disabledPrev}
        />
        <Button id="button-page" variant="secondary" label={`Page ${page}`} />
        <Button
          id="button-next"
          variant="secondary"
          label="»"
          onClick={onClickNext}
          loading={disabledNext}
        />
      </div>
    </div>
  );
};

export default Table;
