import withReactContent from 'sweetalert2-react-content';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Swal from 'utils/Swal';
import Button from 'components/Button';

const THREE_HOUR_IN_MS = 10800000;

const Auth = () => {
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleAuth(tokenResponse);
    },
    onError: (response) => {
      MySwal.fire({
        title: 'Failed',
        text: response.toString(),
        showCancelButton: false,
      });
    },
  });

  const handleAuth = (response: any) => {
    const body = {
      oauth: response.access_token,
    };
    axios
      .post(
        'https://virtserver.swaggerhub.com/JerryBE1709/SysAsses/1.0.0/oauth/login',
        body
      )
      .then((res) => {
        const { data, message } = res.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        });
        setCookie('token', data.token, {
          path: '/',
          expires: new Date(Date.now() + THREE_HOUR_IN_MS),
        });
        navigate('/home');
      })
      .catch((err) => {
        MySwal.fire({
          title: 'Success',
          text: err.toString(),
          showCancelButton: false,
        });
      });
  };

  return (
    <div className="flex h-screen w-full overflow-auto">
      <div className="hidden h-full w-1/2 items-center bg-white md:flex">
        <img
          className="aspect-auto"
          src="/illustration.jpg"
          alt="Designed by stories / Freepik"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-center gap-6 bg-alta-space-cadet p-9 md:w-1/2">
        <img
          className="absolute top-3 right-3 w-32 object-contain"
          src="ALTA-WHITE.png"
          alt="Logo Alta"
        />
        <h1 className="font-inter text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          Immersive Dashboard
        </h1>
        <p className="text-justify font-inter text-white">
          Immersive Dashboard is here as a means to simplify the work of the
          Immersive Program team in terms of monitoring and status of mentees in
          order to create the best tech talent in their field.
        </p>
        <Button id="button-login" label="Login" onClick={() => loginGoogle()} />
      </div>
    </div>
  );
};

export default Auth;
