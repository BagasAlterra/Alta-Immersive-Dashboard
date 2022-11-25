import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import axios from 'axios';

import Dropdown from 'components/Dropdown';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Input from 'components/Input';
import Table from 'components/Table';
import Cards from 'components/Cards';
import Modal from 'components/Modal';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';

const columnHelper = createColumnHelper<any>();

const Mentee: FC = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  useTitle('Mentee List | Immersive Dashboard');
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    const res = await axios.get('mentees?key=' + page);
    const { data } = res.data;
    return data;
  };

  const { isLoading, isFetching, data, isPreviousData, refetch } = useQuery({
    queryKey: ['menteeList', page],
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
      cell: (info) => (
        <Link to={`/mentees/${info.row.original.id}`}>
          <p>{info.getValue()}</p>
        </Link>
      ),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('nick_name', {
      header: () => 'Nickname',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('class', {
      header: () => 'Class Name',
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
    columnHelper.accessor('education_type', {
      header: () => 'Education Background',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('gender', {
      header: () => 'Gender',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('action1', {
      header: '',
      cell: (info) => (
        <div className="flex justify-center">
          <Link to={`/mentees/${info.row.original.id}/edit`}>
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

  const onDeleteHandler = () => {
    setLoadingProcess(true);
    axios
      .delete(`mentees/${selected}`)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        });
        setModalDelete(false);
        refetch();
      })
      .catch((err) => {
        const { data, status } = err.response;
        MySwal.fire({
          title: `Failed ${status}`,
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoadingProcess(false);
      });
  };

  return (
    <Layout subTitle="Mentee List">
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
              <div className="flex gap-2">
                {/* TODO: Add functionality for export data */}
                <Button id="button-export" label="Export" variant="secondary" />
                <Button
                  id="button-add-new"
                  label="Add New"
                  onClick={() => navigate('/add-mentee')}
                />
              </div>
              <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
                <Input id="input-search" name="search" placeholder="Search" />
                {/* TODO: Add functionality for filter (Class, Status, & Category) */}
                <Dropdown id="filter-class" name="class" placeholder="Class" />
                <Dropdown
                  id="filter-status"
                  name="status"
                  placeholder="Status"
                />
                <Dropdown
                  id="filter-category"
                  name="category"
                  placeholder="Category"
                />
              </div>
            </div>
          }
        />
      </Cards>
      <Modal
        isOpen={modalDelete}
        onClose={() => {
          setModalDelete(false);
          setSelected(null);
        }}
        id="modal-delete-class"
        title="Delete Class"
        content={
          <div className="flex flex-col gap-3">
            <p className="text-black">Are you sure to delete this data?</p>
            <div className="modal-action gap-3">
              <Button
                id="button-no"
                variant="secondary"
                label="No"
                onClick={() => setModalDelete(false)}
                loading={loadingProcess}
              />
              <Button
                id="button-yes"
                label="Yes"
                onClick={() => onDeleteHandler()}
                loading={loadingProcess}
              />
            </div>
          </div>
        }
      />
    </Layout>
  );
};

export default Mentee;
