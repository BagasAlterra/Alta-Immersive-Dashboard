import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import { FC, useState } from "react";

import Layout from "components/Layout";
import { Button, ButtonLabel } from "components/Button";
import Input from "components/Input";
import Table from "components/Table";
import Cards from "components/Cards";
import Modal from "components/Modal";
import { useTitle } from "utils/useTitle";
import { makeData } from "utils/createData";

const columnHelper = createColumnHelper<any>();

const Class: FC = () => {
  useTitle("Class List | Immersive Dashboard");
  const [data] = useState(() => makeData(10));
  const [selected, setSelected] = useState(null);
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
        <label
          className="flex cursor-pointer justify-center"
          htmlFor="modal-edit-class"
        >
          <PencilSquareIcon className="h-6 w-6" />
        </label>
      ),
      footer: (info) => info.column.id,
      size: 20,
    }),
    columnHelper.accessor("action2", {
      header: "",
      cell: (info) => (
        <label
          className="flex cursor-pointer justify-center"
          htmlFor="modal-delete-class"
          onClick={() => console.log(info.row.original.id)}
        >
          <TrashIcon className="h-6 w-6" />
        </label>
      ),
      footer: (info) => info.column.id,
      size: 20,
    }),
  ];

  return (
    <Layout subTitle="Class List">
      <Cards>
        <Table
          data={data}
          columns={columns}
          options={
            <div className="flex items-center gap-2">
              <Input id="input-search" name="search" placeholder="Search" />
              <ButtonLabel
                htmlFor="modal-add-class"
                id="button-add"
                label="Add New"
              />
            </div>
          }
        />
      </Cards>
      <Modal
        id="modal-add-class"
        title="Add New Class"
        content={
          <div className="flex flex-col gap-3">
            <Input
              id="input-class-name"
              name="class-name"
              placeholder="Class Name"
            />
            <div className="modal-action gap-3">
              <ButtonLabel
                htmlFor="modal-add-class"
                id="button-cancel"
                variant="secondary"
                label="Cancel"
              />
              <Button id="button-save" type="submit" label="Save" />
            </div>
          </div>
        }
      />
      <Modal
        id="modal-edit-class"
        title="Edit Class"
        content={
          <div className="flex flex-col gap-3">
            <Input
              id="input-class-name"
              name="class-name"
              placeholder="Class Name"
            />
            <div className="modal-action gap-3">
              <ButtonLabel
                htmlFor="modal-edit-class"
                id="button-cancel"
                variant="secondary"
                label="Cancel"
              />
              <Button id="button-save" type="submit" label="Save" />
            </div>
          </div>
        }
      />
      <Modal
        id="modal-delete-class"
        title="Delete Class"
        content={
          <div className="flex flex-col gap-3">
            <p className="py-4">Are you sure to delete this data?</p>
            <div className="modal-action gap-3">
              <ButtonLabel
                htmlFor="modal-delete-class"
                id="button-no"
                variant="secondary"
                label="No"
                onClick={() => setSelected(null)}
              />
              <Button id="button-yes" type="submit" label="Yes" />
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export default Class;
