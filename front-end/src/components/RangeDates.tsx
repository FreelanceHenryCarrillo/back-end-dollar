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
  setisFiltered: Dispatch<SetStateAction<boolean>>;
  startDate: string;
  endDate: string;
};

const RangeDates = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  setisFiltered,
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
      setisFiltered(true);
      toast.success("se realizo la busqueda correctamente");
    } else {
      toast.warn("Los 2 campos de fecha son obligatorios");
      setisFiltered(false);
    }
  };

  return (
    <div className="range-container">
      <h3>Search for date:</h3>
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
          style={{ height: "100%" }}
          onClick={handleClickSearch}
        >
          <Search />
        </Button>
      }
      <Button
        variant="contained"
        color={"primary"}
        style={{ height: "100%" }}
        onClick={() => {
          setisFiltered(false);
          setEndDate("");
          setStartDate("");
          dispatch(getAllDollar());
          toast.success("Se reinicio la data correctamente");
        }}
      >
        Reset data
      </Button>
    </div>
  );
};

export default RangeDates;
