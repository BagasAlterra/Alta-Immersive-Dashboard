import { FC } from "react";

import Layout from "components/Layout";
import { useTitle } from "utils/useTitle";

const Class: FC = () => {
  useTitle("Class List | Immersive Dashboard");

  return (
    <Layout subTitle="Class List">
      <p>App</p>
    </Layout>
  );
};

export default Class;
