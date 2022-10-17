import { FC } from "react";

import Layout from "components/Layout";
import { useTitle } from "utils/useTitle";

const Mentee: FC = () => {
  useTitle("Mentee List | Immersive Dashboard");

  return (
    <Layout subTitle="Mentee List">
      <p>App</p>
    </Layout>
  );
};

export default Mentee;
