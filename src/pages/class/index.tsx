import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createColumnHelper } from "@tanstack/react-table";
import withReactContent from "sweetalert2-react-content";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import * as yup from "yup";
import axios from "axios";

import { Button } from "components/Button";
import Layout from "components/Layout";
import Input from "components/Input";
import Table from "components/Table";
import Cards from "components/Cards";
import Modal from "components/Modal";
import { useTitle } from "utils/useTitle";
import Swal from "utils/Swal";

interface Inputs {
  name: string;
  pic: number;
}

const columnHelper = createColumnHelper<any>();
const schema = yup.object().shape({
  name: yup.string().required("Class name is required"),
  pic: yup.number().default(7),
});

const Class: FC = () => {
  const MySwal = withReactContent(Swal);
  useTitle("Class List | Immersive Dashboard");

  const fetchData = async (page = 1) => {
    const res = await axios.get("classes?key=" + page);
    const { data } = res.data;
    return data;
  };

  const [selected, setSelected] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [page, setPage] = useState(1);
  const { isLoading, isFetching, data, isPreviousData } = useQuery({
    queryKey: ["classList", page],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
  });
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const columns = [
    columnHelper.accessor("id", {
      header: () => "No",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: 20,
    }),
    columnHelper.accessor("name", {
      header: () => "Class Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("start_date", {
      header: () => "Start Date",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("graduate_date", {
      header: () => "Graduate Date",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      size: Math.round((window.innerWidth - 55) * 0.2),
    }),
    columnHelper.accessor("action1", {
      header: "",
      cell: (info) => (
        <label
          className="flex cursor-pointer justify-center"
          onClick={() => {
            setModalEdit(true);
            setSelected(info.row.original.id);
            setValue("name", info.row.original.name);
          }}
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
      .post("classes", data)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
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

  const onEditHandler = (data: Inputs) => {
    setLoadingProcess(true);
    axios
      .put(`classes/${selected}`, data)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
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
          title: "Success",
          text: message,
          showCancelButton: false,
        });
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
          disabledPrev={page === 1}
          // disabledNext={}
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
        onClose={() => setModalAdd(false)}
        id="modal-add-class"
        title="Add New Class"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Input
              register={register}
              id="input-name"
              name="name"
              placeholder="Class Name"
              // TODO: Add error message here
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
          reset();
        }}
        id="modal-edit-class"
        title="Edit Class"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onEditHandler)}
          >
            <Input
              register={register}
              id="input-name"
              name="name"
              placeholder="Class Name"
              // TODO: Add error message here
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
