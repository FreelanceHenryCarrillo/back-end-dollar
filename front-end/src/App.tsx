/* eslint-disable */
import { useEffect, useState } from "react";
import "./App.css";
import BasicTable from "./components/Table";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getAllDollar, listDollar } from "./redux/DollarSlice";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RangeDates from "./components/RangeDates";
import useWindowDimensions from "./libs/hooks";

function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { width: windowWidth } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const dollar = useAppSelector(listDollar);

  /* Responsive */
  let chartWidth = 900;
  if (windowWidth < 1440) {
    chartWidth = windowWidth;
  }

  useEffect(() => {
    dispatch(getAllDollar());
  }, []);

  return (
    <main className="container">
      <h1 className="first-title">DOLAR BALANCE</h1>
      <aside className="container-hero">
        <section className="container-chart">
          <RangeDates
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            endDate={endDate}
          />

          {!dollar.length ? (
            <div
              style={{
                height: 500,
                display: "flex",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              NOT FOUND!
            </div>
          ) : (
            <LineChart
              width={chartWidth}
              height={500}
              data={dollar}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                label="USD"
                stroke="#8884d8"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
              <XAxis dataKey="date" />
              <YAxis dataKey="value" tickSize={20} tickCount={10} tickLine />
              <Tooltip />
            </LineChart>
          )}
        </section>
        <section className="container-table">
          <BasicTable data={dollar} />
        </section>
      </aside>
      <ToastContainer theme="dark" />
    </main>
  );
}

export default App;
