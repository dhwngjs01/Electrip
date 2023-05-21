import "react-datepicker/dist/react-datepicker.css";
import "./ReserveDate.scss";

import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { ko } from "date-fns/esm/locale";
import {
  initDate,
  setEndDate,
  setReserveEndDate,
  setReserveMinute,
  setReservePeriod,
  setReserveStartDate,
  setStartDate,
} from "@/redux/features/reserveSlice";

export default function ReserveDate() {
  const reserve = useSelector((state) => state.reserveReducer);
  const dispatch = useDispatch();

  const [startHourList, setStartHourList] = useState([]);
  const [endHourList, setEndHourList] = useState([]);

  const [sDate, setSDate] = useState();
  const [sHour, setSHour] = useState();
  const [sMinute, setSMinute] = useState("00");
  const [eDate, setEDate] = useState();
  const [eHour, setEHour] = useState();
  const [eMinute, setEMinute] = useState("00");

  let reservePeriod = "";

  useEffect(() => {
    let now = new Date();
    let hourList = [];

    if (sDate) {
      dispatch(setStartDate(dayjs(sDate).format("YYYY-MM-DD")));

      if (
        dayjs(sDate).format("YYYY-MM-DD") == dayjs(now).format("YYYY-MM-DD")
      ) {
        hourList = [];
        for (let i = now.getHours() + 1; i < 24; i++) {
          hourList.push(i);
        }
      } else {
        hourList = [];
        for (let i = 0; i < 24; i++) {
          hourList.push(i);
        }
      }
      setStartHourList([...hourList]);
    }

    if (eDate) {
      dispatch(setEndDate(dayjs(eDate).format("YYYY-MM-DD")));

      if (
        dayjs(eDate).format("YYYY-MM-DD") == dayjs(now).format("YYYY-MM-DD")
      ) {
        hourList = [];
        for (let i = now.getHours() + 2; i < 24; i++) {
          hourList.push(i);
        }
      } else if (
        dayjs(eDate).format("YYYY-MM-DD") == dayjs(sDate).format("YYYY-MM-DD")
      ) {
        hourList = [];
        for (let i = parseInt(sHour) + 1; i < 24; i++) {
          hourList.push(i);
        }
      } else {
        hourList = [];
        for (let i = 0; i < 24; i++) {
          hourList.push(i);
        }
      }
      setEndHourList([...hourList]);
    }

    if (sDate && sHour && sMinute && eDate && eHour && eMinute) {
      dispatch(
        setReserveStartDate(
          dayjs(sDate).format("YYYY-MM-DD") + " " + sHour + ":" + sMinute
        )
      );
      dispatch(
        setReserveEndDate(
          dayjs(eDate).format("YYYY-MM-DD") + " " + eHour + ":" + eMinute
        )
      );

      dispatch(
        setReserveMinute(
          Math.abs(
            parseInt(
              dayjs(
                dayjs(eDate).format("YYYY-MM-DD") + " " + eHour + ":" + eMinute
              ).diff(
                dayjs(sDate).format("YYYY-MM-DD") + " " + sHour + ":" + sMinute,
                "minute"
              )
            )
          )
        )
      );
    }
  }, [sDate, sHour, sMinute, eDate, eHour, eMinute]);

  const diffDate = (type) => {
    return dayjs(reserve.reserveEndDate).diff(
      dayjs(reserve.reserveStartDate).format("YYYY-MM-DD HH:mm"),
      type
    );
  };

  if (reserve.reserveStartDate && reserve.reserveEndDate) {
    reservePeriod += diffDate("day") > 0 ? diffDate("day") + "일 " : "";
    reservePeriod +=
      diffDate("hour") % 24 > 0 ? (diffDate("hour") % 24) + "시간 " : "";
    reservePeriod +=
      diffDate("minute") % 60 > 0 ? (diffDate("minute") % 60) + "분" : "";

    dispatch(setReservePeriod(reservePeriod));
  }

  const handlerChangeDate = (dates) => {
    const [start, end] = dates;

    setSDate(start);
    setSHour();
    setSMinute("00");
    setEDate(end);
    setEHour();
    setEMinute("00");
  };

  const handlerSelectStartHour = (e) => {
    const selected = e.currentTarget;
    const hour = selected.value;

    setSHour(hour);
  };

  const handlerSelectStartMinute = (e) => {
    const selected = e.currentTarget;
    const minute = selected.value;

    setSMinute(minute);
  };

  const handlerSelectEndHour = (e) => {
    const selected = e.currentTarget;
    const hour = selected.value;

    setEHour(hour);
  };

  const handlerSelectEndMinute = (e) => {
    const selected = e.currentTarget;
    const minute = selected.value;

    setEMinute(minute);
  };

  return (
    <Col md={8} className="bg-white p-4">
      <ReactDatePicker
        inline
        selectsRange
        startDate={sDate}
        endDate={eDate}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        dateFormatCalendar="yyyy년 MM월"
        monthsShown={2}
        onChange={handlerChangeDate}
        locale={ko}
      />
      <Row className="gx-5 mt-3">
        <Col md={6}>
          <div className="dateField">
            <h3>대여일시</h3>
            <span>
              {reserve.startDate
                ? dayjs(reserve.startDate).format("YYYY. MM. DD")
                : "선택하세요."}
            </span>
          </div>
        </Col>
        <Col md={6}>
          <div className="dateField">
            <h3>반납일시</h3>
            <span>
              {reserve.endDate
                ? dayjs(reserve.endDate).format("YYYY. MM. DD")
                : "선택하세요."}
            </span>
          </div>
        </Col>
        <Col md={6}>
          <Row className="mt-3">
            {reserve.startDate && reserve.endDate ? (
              <>
                <Col md={6}>
                  <Form.Select size="lg" onChange={handlerSelectStartHour}>
                    <option>시간</option>
                    {startHourList.map((hour, key) => (
                      <option
                        key={key}
                        value={hour.toString().length == 1 ? "0" + hour : hour}
                      >
                        {hour.toString().length == 1 ? "0" + hour : hour}시
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select size="lg" onChange={handlerSelectStartMinute}>
                    <option value="00">00분</option>
                    <option value="30">30분</option>
                  </Form.Select>
                </Col>
              </>
            ) : (
              <>
                <Col md={6}>
                  <Form.Select size="lg" disabled>
                    <option>시간</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select size="lg" disabled>
                    <option value="">00분</option>
                  </Form.Select>
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col md={6}>
          <Row className="mt-3">
            {reserve.startDate && reserve.endDate ? (
              <>
                <Col md={6}>
                  <Form.Select size="lg" onChange={handlerSelectEndHour}>
                    <option>시간</option>
                    {endHourList.map((hour, key) => (
                      <option
                        key={key}
                        value={hour.toString().length == 1 ? "0" + hour : hour}
                      >
                        {hour.toString().length == 1 ? "0" + hour : hour}시
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select size="lg" onChange={handlerSelectEndMinute}>
                    <option value="00">00분</option>
                    <option value="30">30분</option>
                  </Form.Select>
                </Col>
              </>
            ) : (
              <>
                <Col md={6}>
                  <Form.Select size="lg" disabled>
                    <option>시간</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select size="lg" disabled>
                    <option value="00">00분</option>
                  </Form.Select>
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col md={12}>
          <p className="text-center bg-light py-3 mt-3 fw-bold fs-4">
            {reservePeriod != "" ? (
              <>
                총 <span className="text-danger">{reservePeriod}</span> 사용
              </>
            ) : (
              "대여 기간을 선택해주세요."
            )}
          </p>
        </Col>
      </Row>
    </Col>
  );
}
