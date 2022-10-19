import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FC, useState } from "react";

import Layout from "components/Layout";
import Input from "components/Input";
import Table from "components/Table";
import { useTitle } from "utils/useTitle";
import { makeData } from "utils/createData";

const User: FC = () => {
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
    columnHelper.accessor("email", {
      header: () => "Email",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("team", {
      header: () => "Team",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("role", {
      header: () => "Role",
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
  useTitle("User List | Immersive Dashboard");

  return (
    <Layout subTitle="User List">
      <Table
        data={data}
        columns={columns}
        options={<Input size="long" outline />}
      />
    </Layout>
  );
};

export default User;
