/* eslint-disable */
import  { useEffect, useState } from "react";
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

function App() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isFiltered, setisFiltered] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const dollar = useAppSelector(listDollar);
  const LESS_30_DAYS = -30;

  const defaultData = dollar
    .filter((usd) => new Date(usd.date).getFullYear() === currentYear)
    .sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
    .slice(LESS_30_DAYS);



  useEffect(() => {
    dispatch(getAllDollar());
  }, []);

  return (
    <main className="container">
      <h1 className="first-title">DOLAR BALANCE</h1>
      <aside className="container-hero">
        <div className="container-chart">
          <RangeDates
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            endDate={endDate}
            setisFiltered={setisFiltered}
          />

          <LineChart
            width={900}
            height={500}
            data={isFiltered ? dollar : defaultData}
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
        </div>
        <section className="container-table">
          <BasicTable data={dollar} />
        </section>
      </aside>
      <ToastContainer theme="dark" />
    </main>
  );
}

export default App;
