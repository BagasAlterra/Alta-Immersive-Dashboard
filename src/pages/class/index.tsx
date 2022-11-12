import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FC, useState } from "react";

import Layout from "components/Layout";
import Button from "components/Button";
import Input from "components/Input";
import Table from "components/Table";
import Cards from "components/Cards";
import Modal from "components/Modal";
import { useTitle } from "utils/useTitle";
import { makeData } from "utils/createData";

const Class: FC = () => {
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
      header: () => "Class Name",
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
  useTitle("Class List | Immersive Dashboard");

  return (
    <Layout subTitle="Class List">
      <Cards>
        <label htmlFor="modal-add-class" className="btn">
          open modal
        </label>
        <Table
          data={data}
          columns={columns}
          options={
            <div className="flex items-center gap-2">
              <Input size="long" outline />
              <Button type="short" title="Add New" fill />
            </div>
          }
        />
      </Cards>
      <Modal
        id="modal-add-class"
        title="Add New Class"
        content={
          <div className="flex flex-col gap-3">
            <Input size="long" outline />
            <div className="flex justify-end">
              <Button type="short" title="Cancel" />
              <Button type="short" title="Save" fill />
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export default Class;
