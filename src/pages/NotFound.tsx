import { FC } from "react";

import Layout from "components/Layout";
import { useTitle } from "utils/useTitle";

const NotFound: FC = () => {
  useTitle("Not Found | Immersive Dashboard");

  return (
    <Layout subTitle="Not Found">
      <p>Not Found</p>
    </Layout>
  );
};

export default NotFound;
