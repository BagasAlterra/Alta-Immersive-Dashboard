import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { FC, useState, useEffect } from "react";

import Layout from "components/Layout";
import Input from "components/Input";
import Table from "components/Table";
import { useTitle } from "utils/useTitle";
import Swal from "utils/Swal";

import api from "services/api";

const User: FC = () => {
  const columnHelper = createColumnHelper<any>();
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState([])
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

  const getUsers = async () => {
    await api.all_users()
      .then((response) => {
        setUser(response.data.data)
      })
      .catch((error) => {
        MySwal.fire({
          title: "Error",
          text: error.toString(),
          showCancelButton: false,
        });
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout subTitle="User List">
      <Table
        data={user}
        columns={columns}
        options={<Input name="user_table" id="user_table" />}
      />
    </Layout>
  );
};

export default User;
