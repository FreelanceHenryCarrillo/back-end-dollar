import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { getAllDollar, searchDateDollarRange } from "../redux/DollarSlice";
import { useAppDispatch } from "../hooks";
import { TypeSelectionDate } from "../types.global";

type PropsRangeDates = {
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  startDate: string;
  endDate: string;
};

const RangeDates = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
}: PropsRangeDates) => {
  const dispatch = useAppDispatch();
  const YEAR_LIMIT_PAST = "2023-01-01";

  const handleChangeDate = (value: Dayjs, type: TypeSelectionDate) => {
    const dateObject = dayjs(value instanceof dayjs ? value : value.toDate());

    if (value && type === TypeSelectionDate.START) {
      setStartDate(dateObject.format("YYYY-MM-DD"));
    } else {
      setEndDate(dateObject.format("YYYY-MM-DD"));
    }
  };

  const handleClickSearch = () => {
    if (startDate && endDate) {
      dispatch(searchDateDollarRange(startDate, endDate));
      toast.success("se realizo la busqueda correctamente");
    } else {
      toast.warn("Los 2 campos de fecha son obligatorios");
    }
  };

  return (
    <div className="range-container">
      <p>Search for date:</p>
      <DatePicker
        label="Start Date"
        minDate={dayjs(YEAR_LIMIT_PAST)}
        disableFuture
        value={endDate !== "" ? dayjs(startDate) : null}
        onChange={(value) =>
          value && handleChangeDate(value, TypeSelectionDate.START)
        }
      />
      <DatePicker
        label="End Date"
        disableFuture
        minDate={dayjs(YEAR_LIMIT_PAST)}
        value={endDate !== "" ? dayjs(endDate) : null}
        onChange={(value) =>
          value && handleChangeDate(value, TypeSelectionDate.END)
        }
      />
      {
        <Button
          variant="contained"
          color={"success"}
          style={{ height: "100%", width: '150px' }}
          onClick={handleClickSearch}
        >
          <Search />
          search
        </Button>
      }
      <Button
        variant="contained"
        color={"primary"}
        style={{ height: "100%" }}
        onClick={() => {
          setEndDate("");
          setStartDate("");
          dispatch(getAllDollar());
          toast.success("Se reinicio la data correctamente");
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default RangeDates;
