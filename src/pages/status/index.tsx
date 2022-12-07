import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { Node, Edge, useReactFlow } from 'reactflow';
import { useForm } from 'react-hook-form';
import { useState, FC } from 'react';
import * as yup from 'yup';

import Flowchart from 'components/Flowchart';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Input from 'components/Input';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';

interface Inputs {
  name: string;
}

const shape = {
  name: yup.string().required('Node name is required'),
};
const schema = yup.object().shape(shape);

const Status: FC = () => {
  const MySwal = withReactContent(Swal);
  useTitle('Status Tree | Immersive Dashboard');
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [selected, setSelected] = useState('');

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
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onClickEdit = (data: any) => {
    setModalEdit(true);
    setSelected(data.id);
    setValueEdit('name', data.data.label);
  };

  const onClickDelete = (data: any) => {
    setModalDelete(true);
    setSelected(data.id);
  };

  const onSubmitHandler = (data: Inputs) => {
    try {
      const id = `${++nodes.length}`;
      const newNode = {
        id,
        type: 'custom',
        position: {
          x: 0,
          y: 0,
        },
        data: {
          label: data.name,
          onClickEdit,
          onClickDelete,
        },
      };
      reactFlowInstance.addNodes(newNode);
    } catch (err: any) {
      MySwal.fire({
        title: `Failed`,
        text: err.toString(),
        showCancelButton: false,
      });
    } finally {
      setModalAdd(false);
      resetAdd();
    }
  };

  const onDeleteHandler = () => {
    try {
      let temp = reactFlowInstance.getNodes();
      const filterItem = temp.filter((item) => item.id !== selected);
      reactFlowInstance.setNodes(filterItem);
    } catch (err: any) {
      MySwal.fire({
        title: `Failed`,
        text: err.toString(),
        showCancelButton: false,
      });
    } finally {
      setModalDelete(false);
      setSelected('');
    }
  };

  const onEditHandler = (data: Inputs) => {
    try {
      let temp = reactFlowInstance.getNodes();
      const editNode = temp.map((node) => {
        if (node.id === selected) {
          node.data.label = data.name;
        }
        return node;
      });
      reactFlowInstance.setNodes(editNode);
    } catch (err: any) {
      MySwal.fire({
        title: `Failed`,
        text: err.toString(),
        showCancelButton: false,
      });
    } finally {
      setModalEdit(false);
      resetEdit();
    }
  };

  return (
    <Layout subTitle="Status Tree" isFull>
      <div className="absolute bottom-6 right-6 z-50">
        <Button
          id="button-add-node"
          label="Add New"
          onClick={() => setModalAdd(true)}
        />
      </div>
      <Flowchart
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
      />
      <Modal
        isOpen={modalAdd}
        onClose={() => {
          setModalAdd(false);
          resetAdd();
        }}
        id="modal-add-node"
        title="Add New Node"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmitAdd(onSubmitHandler)}
          >
            <Input
              register={registerAdd}
              id="input-name"
              name="name"
              placeholder="Node Name"
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
          resetEdit();
        }}
        id="modal-add-node"
        title="Add New Node"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmitEdit(onEditHandler)}
          >
            <Input
              register={registerEdit}
              id="input-name"
              name="name"
              placeholder="Node Name"
              error={errorsEdit.name?.message}
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
          setSelected('');
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

export default Status;
