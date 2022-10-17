import { FC } from "react";

import Layout from "components/Layout";
import { useTitle } from "utils/useTitle";

const User: FC = () => {
  useTitle("User List | Immersive Dashboard");

  return (
    <Layout subTitle="User List">
      <p>App</p>
    </Layout>
  );
};

export default User;
