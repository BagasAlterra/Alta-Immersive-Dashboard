import { FC } from "react";

import Layout from "components/Layout";
import { useTitle } from "utils/useTitle";

const Status: FC = () => {
  useTitle("Status Tree | Immersive Dashboard");

  return (
    <Layout subTitle="Status Tree">
      <p>App</p>
    </Layout>
  );
};

export default Status;
