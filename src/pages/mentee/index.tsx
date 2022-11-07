import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FC, useState } from "react";

import Dropdown from "components/Dropdown";
import Layout from "components/Layout";
import Button from "components/Button";
import Input from "components/Input";
import Table from "components/Table";
import Cards from "components/Cards";
import { useTitle } from "utils/useTitle";
import { makeData } from "utils/createData";

const Mentee: FC = () => {
  const columnHelper = createColumnHelper<any>();
  const [data] = useState(() => makeData(10));
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: 20,
    }),
    columnHelper.accessor("full_name", {
      header: () => "Full Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("class", {
      header: () => "Class Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("category", {
      header: () => "Category",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("gender", {
      header: () => "Gender",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("detail", {
      header: () => "Detail",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("action1", {
      header: "",
      cell: (info) => (
        <div className="flex justify-center">
          <Link to={`#`}>
            <PencilSquareIcon className="h-6 w-6" />
          </Link>
        </div>
      ),
      footer: (info) => info.column.id,
      size: 20,
    }),
    columnHelper.accessor("action2", {
      header: "",
      cell: (info) => (
        <div className="flex justify-center">
          <Link to={`#`}>
            <TrashIcon className="h-6 w-6" />
          </Link>
        </div>
      ),
      footer: (info) => info.column.id,
      size: 20,
    }),
  ];
  useTitle("Mentee List | Immersive Dashboard");

  return (
    <Layout subTitle="Mentee List">
      <Cards>
        <Table
          data={data}
          columns={columns}
          options={
            <div className="flex w-full flex-col items-end gap-2">
              <div className="flex gap-2">
                <Button type="short" title="Export" unfill />
                <Button type="short" title="Add New" fill />
              </div>
              <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
                <Input size="long" outline />
                <Dropdown title="Class" />
                <Dropdown title="Status" />
                <Dropdown title="Category" />
              </div>
            </div>
          }
        />
      </Cards>
    </Layout>
  );
};

export default Mentee;
