import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import Layout from 'components/Layout';
import Input from 'components/Input';
import Table from 'components/Table';
import Cards from 'components/Cards';
import Modal from 'components/Modal';
import Dropdown from 'components/Dropdown';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';
import Button from 'components/Button';

interface Inputs {
  full_name: string;
  email: string;
  password: string;
  id_team: number;
  role: string;
}

interface Inputs2 {
  full_name: string;
  email: string;
  id_team: number;
  role: string;
}

const shape = {
  full_name: yup.string().required('Full name is required'),
  email: yup.string().required('Email is required'),
  id_team: yup.number().required('Team is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
};

const shape2 = {
  full_name: yup.string().required('Full name is required'),
  email: yup.string().required('Email is required'),
  id_team: yup.number().required('Team is required'),
  role: yup.string().required('Role is required'),
};

const schema = yup.object().shape(shape);
const schema2 = yup.object().shape(shape2);

const User: FC = () => {
  const columnHelper = createColumnHelper<any>();
  const MySwal = withReactContent(Swal);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  useTitle('User List | Immersive Dashboard');

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

  const onSubmitHandler = (data: Inputs) => {
    console.log('add ', data);
    setLoadingProcess(true);
    axios
      .post('users', data)
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
      .put(`users/${selected}`, data)
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
      .delete(`users/${selected}`)
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

  const fetchData = async (page = 1) => {
    const res = await axios.get('users?key=' + page);
    const { data } = res.data;
    return data;
  };

  const fetchTeams = async () => {
    const res = await axios.get('teams');
    const { data } = res.data;
    setTeams(data);
  };

  const itemTeam = teams.map((item: any) => {
    return {
      value: parseInt(item.id),
      label: item.name,
    };
  });

  useEffect(() => {
    fetchTeams();
  }, []);

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
            <PencilSquareIcon
              className="h-6 w-6"
              onClick={() => {
                setModalEdit(true);
                setSelected(info.row.original.id);
                setValueEdit('full_name', info.row.original.full_name);
                setValueEdit('email', info.row.original.email);
                setValueEdit('id_team', parseInt(info.row.original.id_team));
                setValueEdit('role', info.row.original.role);
              }}
            />
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
            <div className="flex w-full flex-col items-end gap-6">
              {/* TODO: Add functionality to input search */}
              <Button
                id="button-add-new"
                label="Add New"
                onClick={() => setModalAdd(true)}
              />
              <Input id="input-search" name="search" placeholder="Search" />
            </div>
          }
        />
      </Cards>
      <Modal
        isOpen={modalAdd}
        onClose={() => {
          resetAdd();
          setModalAdd(false);
        }}
        id="modal-add-class"
        title="Add New User"
        content={
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmitAdd(onSubmitHandler)}
          >
            <Input
              register={registerAdd}
              id="full_name"
              name="full_name"
              placeholder="Full Name"
              label="Full Name"
              error={errorsAdd.full_name?.message}
              showLabel
            />
            <Input
              register={registerAdd}
              id="email"
              name="email"
              placeholder="Email"
              label="Email"
              error={errorsAdd.email?.message}
              showLabel
            />
            <Dropdown
              register={registerAdd}
              id="id_team"
              name="id_team"
              placeholder="Team"
              error={errorsAdd.id_team?.message}
              showLabel
              data={itemTeam}
            />
            <Input
              register={registerAdd}
              id="role"
              name="role"
              label="Role"
              placeholder="Role"
              error={errorsAdd.role?.message}
              showLabel
            />
            <Input
              register={registerAdd}
              id="password"
              name="password"
              label="Password"
              placeholder="Password"
              error={errorsAdd.password?.message}
              showLabel
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
          resetEdit();
          setModalEdit(false);
        }}
        id="modal-add-class"
        title="Edit User"
        content={
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmitEdit(onEditHandler)}
          >
            <Input
              register={registerEdit}
              id="full_name"
              name="full_name"
              placeholder="Full Name"
              error={errorsEdit.full_name?.message}
              showLabel
            />
            <Input
              register={registerEdit}
              id="email"
              name="email"
              placeholder="Email"
              error={errorsEdit.email?.message}
              showLabel
            />
            <Dropdown
              register={registerEdit}
              id="id_team"
              name="id_team"
              placeholder="Team"
              error={errorsEdit.id_team?.message}
              showLabel
              data={itemTeam}
            />
            <Input
              register={registerEdit}
              id="role"
              name="role"
              placeholder="Role"
              error={errorsEdit.role?.message}
              showLabel
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
        title="Delete User"
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

export default User;
