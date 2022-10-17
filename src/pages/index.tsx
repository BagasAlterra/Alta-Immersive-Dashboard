import { FC } from "react";

import Layout from "components/Layout";
import { useTitle } from "utils/useTitle";

const App: FC = () => {
  useTitle("Dashboard | Immersive Dashboard");

  return (
    <Layout subTitle="Dashboard">
      <p>App</p>
    </Layout>
  );
};

export default App;
