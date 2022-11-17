import withReactContent from "sweetalert2-react-content";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import Swal from "utils/Swal";
import Button from "components/Button";

const THREE_HOUR_IN_MS = 10800000;

const Auth = () => {
  const MySwal = withReactContent(Swal);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum consequat nisl vel pretium lectus quam id leo in. Fringilla urna porttitor rhoncus dolor purus non. Consequat nisl vel pretium lectus quam id leo in vitae.";

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleAuth(tokenResponse);
    },
    onError: (response) => {
      MySwal.fire({
        title: "Failed",
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
      .post("oauth/login", body)
      .then((res) => {
        const { data, message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setCookie("token", data.token, {
          path: "/",
          expires: new Date(Date.now() + THREE_HOUR_IN_MS),
        });
        navigate("/home");
      })
      .catch((err) => {
        MySwal.fire({
          title: "Success",
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
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-alta-space-cadet p-9 md:w-1/2">
        <img
          className="absolute top-3 right-3 w-32 object-contain"
          src="ALTA-WHITE.png"
          alt="Logo Alta"
        />
        <p className="text-justify font-inter text-white">{content}</p>
        {/* TODO: Need to change the message */}
        <Button id="button-yes" label="Login" onClick={() => loginGoogle()} />
      </div>
    </div>
  );
};

export default Auth;
