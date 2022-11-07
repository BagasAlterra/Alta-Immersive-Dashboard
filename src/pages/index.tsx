import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { FC, useState } from "react";

import Layout from "components/Layout";
import Cards from "components/Cards";
import { useTitle } from "utils/useTitle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

interface StatProps {
  label: string;
  value: number;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const Stat: FC<StatProps> = ({ label, value }) => {
  return (
    <Cards className="flex flex-col items-end justify-between text-right">
      <p className="break-words text-lg font-medium text-black">{label}</p>
      <p className="text-3xl font-bold text-black">{value}</p>
    </Cards>
  );
};

const App: FC = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const [data] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  useTitle("Dashboard | Immersive Dashboard");

  return (
    <Layout subTitle="Dashboard">
      <div className="mb-3 grid grid-cols-3 gap-x-3">
        <Stat label="Mentee Active" value={12} />
        <Stat label="Mentee Placement" value={13} />
        <Stat label="Mentee Feedback" value={14} />
      </div>
      <Cards>
        <Line options={options} data={data} />
      </Cards>
    </Layout>
  );
};

export default App;
