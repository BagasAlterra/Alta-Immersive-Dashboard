import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import Button from "components/Button";

const THREEHOURINMS = 10800000;

const Auth = () => {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const image =
    "https://academy.alterra.id/wp-content/uploads/2022/06/Logo-Colour-Transparant-1.png";
  const title =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum consequat nisl vel pretium lectus quam id leo in. Fringilla urna porttitor rhoncus dolor purus non. Consequat nisl vel pretium lectus quam id leo in vitae.";

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleAuth(tokenResponse);
    },
    onError: (response) => {
      console.log(response); // TODO: change to alert
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
        console.log(message); // TODO: change to alert
        setCookie("token", data.token, {
          path: "/",
          expires: new Date(Date.now() + THREEHOURINMS),
        });
        navigate("/home");
      })
      .catch((err) => {
        console.log(err); // TODO: change to alert
      });
  };

  return (
    <div className="flex h-screen w-full overflow-auto">
      <div className="hidden h-full w-1/2 items-center bg-alta-background md:flex">
        <img
          className="md:mx-20 md:h-1/6 md:w-1/2 lg:mx-20 lg:h-1/5 lg:w-1/3 xl:mx-40"
          src={image}
          alt="logo alta"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-alta-space-cadet p-9 md:w-1/2">
        <p className="text-justify font-inter text-white">{title}</p>
        <Button id="button-yes" label="Login" onClick={() => loginGoogle()} />
      </div>
    </div>
  );
};

export default Auth;
