import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import withReactContent from 'sweetalert2-react-content';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FC, useState } from 'react';
import axios from 'axios';

import Layout from 'components/Layout';
import Input from 'components/Input';
import Table from 'components/Table';
import Cards from 'components/Cards';
import Modal from 'components/Modal';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';

import api from 'services/api';

const User: FC = () => {
  const columnHelper = createColumnHelper<any>();
  const MySwal = withReactContent(Swal);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  useTitle('User List | Immersive Dashboard');

  const fetchData = async (page = 1) => {
    const res = await axios.get('users?key=' + page);
    const { data } = res.data;
    return data;
  };

  // MySwal.fire({
  //   title: "Error",
  //   text: error.toString(),
  //   showCancelButton: false,
  // });

  const { isLoading, isFetching, data, isPreviousData, refetch } = useQuery({
    queryKey: ['userList', page],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
  });

  const columns = [
    columnHelper.accessor('id', {
      header: () => 'No',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: 20,
    }),
    columnHelper.accessor('full_name', {
      header: () => 'Full Name',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('team', {
      header: () => 'Team',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('role', {
      header: () => 'Role',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('action1', {
      header: '',
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
    columnHelper.accessor('action2', {
      header: '',
      cell: (info) => (
        <label
          className="flex cursor-pointer justify-center"
          onClick={() => {
            setModalDelete(true);
            setSelected(info.row.original.id);
          }}
        >
          <TrashIcon className="h-6 w-6" />
        </label>
      ),
      footer: (info) => info.column.id,
      size: 20,
    }),
  ];

  return (
    <Layout subTitle="User List">
      <Cards>
        <Table
          data={data}
          columns={columns}
          page={page}
          isLoading={isLoading}
          disabledPrev={page === 1 || isFetching}
          disabledNext={isFetching}
          onClickPrev={() => setPage((old) => Math.max(old - 1, 0))}
          onClickNext={() => {
            if (!isPreviousData) {
              setPage((old) => old + 1);
            }
          }}
          options={
            <div className="flex w-full flex-col items-end gap-2">
              {/* TODO: Add functionality to input search */}
              <Input id="input-search" name="search" placeholder="Search" />
            </div>
          }
        />
      </Cards>
    </Layout>
  );
};

export default User;
