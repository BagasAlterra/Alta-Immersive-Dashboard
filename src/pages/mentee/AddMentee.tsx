import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FC, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

import Layout from 'components/Layout';
import Input from 'components/Input';
import Cards from 'components/Cards';
import Dropdown from 'components/Dropdown';
import RadioButton from 'components/RadioButton';
import Button from 'components/Button';
import { useTitle } from 'utils/useTitle';
import Swal from 'utils/Swal';

const itemStatus = [
  { value: 'orang tua', label: 'Orang Tua' },
  { value: 'saudara kandung', label: 'Saudara Kandung' },
  { value: 'kakek nenek', label: 'Kakek/Nenek' },
  { value: 'keluarga ortu', label: 'Kelaurga Dari Orang Tua' },
];

interface Inputs {
  full_name: string;
  nick_name: string;
  email: string;
  phone: string;
  current_address: string;
  home_address: string;
  telegram: string;
  gender: string;
  education_type: string;
  major: string;
  graduate: string;
  institution: string;
  emergency_name: string;
  emergency_phone: string;
  emergency_status: string;
}

const shape = {
  full_name: yup.string().required('Full name is required'),
  nick_name: yup.string().required('Nickname is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone: yup.string().required('Phone is required'),
  current_address: yup.string().required('Current address is required'),
  home_address: yup.string().required('Home address is required'),
  telegram: yup.string().required('Telegram is required'),
  gender: yup.string().required('Gender is required'),
  education_type: yup.string().required('Education type is required'),
  major: yup.string().required('Major is required'),
  graduate: yup.string().required('Graduate is required'),
  institution: yup.string().required('Institution is required'),
  emergency_name: yup.string().required('Emergency name is required'),
  emergency_phone: yup.string().required('Emergency phone is required'),
  emergency_status: yup.string().required('Emergency status is required'),
};
const schema = yup.object().shape(shape);

const AddMentee: FC = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  useTitle('Add New Mentee | Immersive Dashboard');
  const [loadingProcess, setLoadingProcess] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: Inputs) => {
    setLoadingProcess(true);
    axios
      .post('mentees', data)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        });
        navigate('/mentees');
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
    <Layout subTitle="Add New">
      <Cards>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <section className="flex flex-col px-5">
            <Input
              register={register}
              id="input-full_name"
              name="full_name"
              placeholder="Full Name"
              error={errors.full_name?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-nick-name"
              name="nick_name"
              placeholder="Nickname"
              error={errors.nick_name?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-current-address"
              name="current_address"
              placeholder="Address"
              error={errors.current_address?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-home-address"
              name="home_address"
              placeholder="Home Address"
              error={errors.home_address?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-email"
              name="email"
              placeholder="Email"
              error={errors.email?.message}
              showLabel
              type="email"
            />
            <RadioButton
              register={register}
              id="input-gender"
              name="gender"
              placeholder="Gender"
              error={errors.gender?.message}
              showLabel
              data={[
                { value: 'L', label: 'Male' },
                { value: 'F', label: 'Female' },
              ]}
            />
            <Input
              register={register}
              id="input-telegram"
              name="telegram"
              placeholder="Telegram"
              error={errors.telegram?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-phone"
              name="phone"
              placeholder="Phone Number"
              error={errors.phone?.message}
              showLabel
              type="tel"
            />
          </section>
          <section className="flex flex-col px-5">
            <p className="text-lg font-bold text-black">Emergency</p>
            <Input
              register={register}
              id="input-emergency-name"
              name="emergency_name"
              placeholder="Name"
              error={errors.emergency_name?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-emergency-phone"
              name="emergency_phone"
              placeholder="Phone"
              error={errors.emergency_phone?.message}
              showLabel
              type="tel"
            />
            <Dropdown
              id="input-emergency-status"
              name="emergency_status"
              placeholder="Status"
              error={errors.emergency_status?.message}
              showLabel
              data={itemStatus}
            />
          </section>
          <section className="flex flex-col px-5">
            <p className="text-lg font-bold text-black">Education Data</p>
            <RadioButton
              register={register}
              id="input-education-type"
              name="education_type"
              placeholder="Education Type"
              error={errors.education_type?.message}
              showLabel
              data={[
                { value: 'informatics', label: 'Informatics' },
                { value: 'non-informatics', label: 'Non Informatics' },
              ]}
            />
            <Input
              register={register}
              id="input-institution"
              name="institution"
              placeholder="Institution"
              error={errors.institution?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-major"
              name="major"
              placeholder="Major"
              error={errors.major?.message}
              showLabel
            />
            <Input
              register={register}
              id="input-emergency-graduate"
              name="graduate"
              placeholder="Graduate"
              error={errors.graduate?.message}
              showLabel
            />
          </section>
          <div className="flex justify-end gap-3">
            <Button
              id="button-cancel"
              variant="secondary"
              label="Cancel"
              onClick={() => navigate('/mentees')}
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
      </Cards>
    </Layout>
  );
};

export default AddMentee;
