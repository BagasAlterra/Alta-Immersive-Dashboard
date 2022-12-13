import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FC, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import LoadingSpinner from 'components/LoadingSpinner';
import LogSection from 'components/LogSection';
import LogProfile from 'components/LogProfile';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';
import Layout from 'components/Layout';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';

interface Inputs {
  notes: string;
  proof: string;
  id_user: number;
  id_mentee: number;
  id_status: number;
}

const shape = {
  notes: yup.string().required('Notes is required'),
  proof: yup.mixed(),
  id_user: yup.number(),
  id_mentee: yup.number(),
  id_status: yup.number().required('Status is required'),
};
const schema = yup.object().shape(shape);

const Log: FC = () => {
  const { id_mentee = 0 } = useParams();
  const MySwal = withReactContent(Swal);
  useTitle('Mentee Log | Immersive Dashboard');
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const fetchData = async () => {
    const res = await axios.get('mentees/' + id_mentee);
    const status = await fetchStatus();
    const { data } = res.data;
    return { mentee: data, status };
  };

  const fetchStatus = async () => {
    const res = await axios.get('status');
    const { data } = res.data;
    if (data) {
      data.forEach((el: any) => {
        el.label = el.name;
        el.value = el.id;
      });
    }
    return data;
  };

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['detailMenteeLog', id_mentee],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const {
    reset: reset,
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors: errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      // TODO: Change id_user, get from storage/cookie/session
      id_user: 1,
      id_mentee: +id_mentee,
    },
  });

  const onSubmitHandler = (data: Inputs | any) => {
    setLoadingProcess(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    axios
      .post('feedbacks', formData)
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

  return (
    <Layout subTitle="Mentee Log">
      {/* TODO: Give condition when data mentee is empty or error */}
      {!isLoading && !isError && (
        <LogProfile
          full_name={data.mentee.full_name}
          nick_name={data.mentee.nick_name}
          join_class={data.mentee.class}
          major={data.mentee.major}
          institution={data.mentee.institution}
          phone={data.mentee.phone}
          telegram={data.mentee.telegram}
          email={data.mentee.email}
        />
      )}
      <div className="flex w-full justify-end">
        <Button
          id="button-add-log"
          label="Add New Log"
          onClick={() => setModalAdd(true)}
          disabled={isError}
        />
      </div>
      <div className="px-6">
        {/* TODO: Give condition when data feedback is empty or error */}
        {!isLoading ? (
          !isError &&
          data.mentee.feedback.map((item: any) => {
            return (
              <LogSection
                key={item.id}
                section={item.section}
                name={item.users}
                date={item.date}
                feedback={item.notes}
                status={item.status}
              />
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <Modal
        isOpen={modalAdd}
        onClose={() => {
          setModalAdd(false);
          reset();
        }}
        id="modal-add-log"
        title="Add New Log"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex justify-between gap-3">
              <Dropdown
                register={register}
                id="input-status"
                name="id_status"
                placeholder="Status"
                data={data?.status}
                error={errors.id_status?.message}
              />
              <Input
                register={register}
                id="input-notes"
                name="proof"
                placeholder="Proof"
                error={errors.proof?.message}
                type="file"
              />
            </div>
            <Input
              register={register}
              id="input-notes"
              name="notes"
              placeholder="Notes"
              error={errors.notes?.message}
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
    </Layout>
  );
};

export default Log;
