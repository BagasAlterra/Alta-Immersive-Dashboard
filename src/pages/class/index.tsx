import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FC, useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import axios from 'axios';

import { Button } from 'components/Button';
import Layout from 'components/Layout';
import Input from 'components/Input';
import Table from 'components/Table';
import Cards from 'components/Cards';
import Modal from 'components/Modal';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';

interface Inputs {
  name: string;
  pic: number;
}

interface Inputs2 extends Inputs {
  start_date: string;
  graduate_date: string;
}

const columnHelper = createColumnHelper<any>();
const shape = {
  name: yup.string().required('Class name is required'),
  // TODO: Change default value, get from API (login)
  pic: yup.number().default(7),
};
const shape2 = {
  ...shape,
  start_date: yup.string().required('Start date is required'),
  graduate_date: yup.string().required('Graduate date is required'),
};
const schema = yup.object().shape(shape);
const schema2 = yup.object().shape(shape2);

const Class: FC = () => {
  const MySwal = withReactContent(Swal);
  useTitle('Class List | Immersive Dashboard');
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    const res = await axios.get('classes?key=' + page);
    const { data } = res.data;
    return data;
  };

  const { isLoading, isFetching, data, isPreviousData, refetch } = useQuery({
    queryKey: ['classList', page],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
  });
  const {
    reset: resetAdd,
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const {
    reset: resetEdit,
    setValue: setValueEdit,
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
  } = useForm<Inputs2>({
    resolver: yupResolver(schema2),
  });

  const columns = [
    columnHelper.accessor('id', {
      header: () => 'No',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: 20,
    }),
    columnHelper.accessor('name', {
      header: () => 'Class Name',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('start_date', {
      header: () => 'Start Date',
      cell: (info) => moment(info.getValue()).format('DD MMMM YYYY'),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('graduate_date', {
      header: () => 'Graduate Date',
      cell: (info) => moment(info.getValue()).format('DD MMMM YYYY'),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor('action1', {
      header: '',
      cell: (info) => (
        <label
          className="flex cursor-pointer justify-center"
          onClick={() => {
            setModalEdit(true);
            setSelected(info.row.original.id);
            setValueEdit('name', info.row.original.name);
            setValueEdit('start_date', info.row.original.start_date);
            setValueEdit('graduate_date', info.row.original.graduate_date);
          }}
        >
          <PencilSquareIcon className="h-6 w-6" />
        </label>
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

  const onSubmitHandler = (data: Inputs) => {
    setLoadingProcess(true);
    axios
      .post('classes', data)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        });
        refetch();
        setModalAdd(false);
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

  const onEditHandler = (data: Inputs2) => {
    setLoadingProcess(true);
    axios
      .put(`classes/${selected}`, data)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        });
        refetch();
        setModalEdit(false);
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

  const onDeleteHandler = () => {
    setLoadingProcess(true);
    axios
      .delete(`classes/${selected}`)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        });
        refetch();
        setModalDelete(false);
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
    <Layout subTitle="Class List">
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
            <div className="flex items-center gap-2">
              <Input id="input-search" name="search" placeholder="Search" />
              <Button
                id="button-add"
                label="Add New"
                onClick={() => setModalAdd(true)}
              />
            </div>
          }
        />
      </Cards>
      <Modal
        isOpen={modalAdd}
        onClose={() => {
          setModalAdd(false);
          resetAdd();
        }}
        id="modal-add-class"
        title="Add New Class"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmitAdd(onSubmitHandler)}
          >
            <Input
              register={registerAdd}
              id="input-name"
              name="name"
              placeholder="Class Name"
              error={errorsAdd.name?.message}
            />
            <div className="modal-action gap-3">
              <Button
                id="button-cancel"
                variant="secondary"
                label="Cancel"
                onClick={() => setModalAdd(false)}
                loading={loadingProcess}
              />
              <Button
                id="button-save"
                type="submit"
                label="Save"
                loading={loadingProcess}
              />
            </div>
          </form>
        }
      />
      <Modal
        isOpen={modalEdit}
        onClose={() => {
          setModalEdit(false);
          setSelected(null);
          resetEdit();
        }}
        id="modal-edit-class"
        title="Edit Class"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmitEdit(onEditHandler)}
          >
            <Input
              register={registerEdit}
              id="input-name"
              name="name"
              placeholder="Class Name"
              error={errorsEdit.name?.message}
            />
            <Input
              register={registerEdit}
              id="input-start_date"
              name="start_date"
              placeholder="Start Date"
              error={errorsEdit.start_date?.message}
              type="date"
            />
            <Input
              register={registerEdit}
              id="input-graduate_date"
              name="graduate_date"
              placeholder="Graduate Date"
              error={errorsEdit.graduate_date?.message}
              type="date"
            />
            <div className="modal-action gap-3">
              <Button
                id="button-cancel"
                variant="secondary"
                label="Cancel"
                onClick={() => setModalEdit(false)}
                loading={loadingProcess}
              />
              <Button
                id="button-save"
                type="submit"
                label="Save"
                loading={loadingProcess}
              />
            </div>
          </form>
        }
      />
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

export default Class;
