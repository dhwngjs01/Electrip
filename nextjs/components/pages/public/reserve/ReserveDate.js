import "react-datepicker/dist/react-datepicker.css";
import "./ReserveDate.scss";

import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ReactDatePicker from "react-datepicker";
import { useState } from "react";

import dayjs from "dayjs";
import { ko } from "date-fns/locale";
import {
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

  const [sDate, setSDate] = useState();
  const [sHour, setSHour] = useState();
  const [sMinute, setSMinute] = useState("00");
  const [eDate, setEDate] = useState();
  const [eHour, setEHour] = useState();
  const [eMinute, setEMinute] = useState("00");
  const [now] = useState(() => new Date());

  const getHourList = (firstHour) =>
    Array.from({ length: Math.max(24 - firstHour, 0) }, (_, index) => firstHour + index);
  const startHourList = sDate
    ? getHourList(
        dayjs(sDate).isSame(now, "day") ? now.getHours() + 1 : 0
      )
    : [];
  const endHourList = eDate
    ? getHourList(
        dayjs(eDate).isSame(now, "day")
          ? now.getHours() + 2
          : dayjs(eDate).isSame(sDate, "day") && sHour
            ? Number(sHour) + 1
            : 0
      )
    : [];
  const reservePeriod = reserve.reservePeriod || "";

  const updateReservation = ({
    startDate = sDate,
    startHour = sHour,
    startMinute = sMinute,
    endDate = eDate,
    endHour = eHour,
    endMinute = eMinute,
  }) => {
    if (!startDate || !startHour || !startMinute || !endDate || !endHour || !endMinute) {
      return;
    }

    const reserveStartDate = `${dayjs(startDate).format("YYYY-MM-DD")} ${startHour}:${startMinute}`;
    const reserveEndDate = `${dayjs(endDate).format("YYYY-MM-DD")} ${endHour}:${endMinute}`;
    const reserveMinute = Math.abs(
      dayjs(reserveEndDate).diff(dayjs(reserveStartDate), "minute")
    );
    const reservePeriodParts = [
      reserveMinute >= 1440 && `${Math.floor(reserveMinute / 1440)}일`,
      reserveMinute % 1440 >= 60 && `${Math.floor((reserveMinute % 1440) / 60)}시간`,
      reserveMinute % 60 > 0 && `${reserveMinute % 60}분`,
    ].filter(Boolean);

    dispatch(setReserveStartDate(reserveStartDate));
    dispatch(setReserveEndDate(reserveEndDate));
    dispatch(setReserveMinute(reserveMinute));
    dispatch(setReservePeriod(reservePeriodParts.join(" ")));
  };

  const handlerChangeDate = (dates) => {
    const [start, end] = dates;

    setSDate(start);
    setSHour();
    setSMinute("00");
    setEDate(end);
    setEHour();
    setEMinute("00");

    dispatch(setStartDate(start ? dayjs(start).format("YYYY-MM-DD") : null));
    dispatch(setEndDate(end ? dayjs(end).format("YYYY-MM-DD") : null));
    dispatch(setReserveStartDate(null));
    dispatch(setReserveEndDate(null));
    dispatch(setReserveMinute(null));
    dispatch(setReservePeriod(null));
  };

  const handlerSelectStartHour = (e) => {
    const selected = e.currentTarget;
    const hour = selected.value;

    setSHour(hour);
    updateReservation({ startHour: hour });
  };

  const handlerSelectStartMinute = (e) => {
    const selected = e.currentTarget;
    const minute = selected.value;

    setSMinute(minute);
    updateReservation({ startMinute: minute });
  };

  const handlerSelectEndHour = (e) => {
    const selected = e.currentTarget;
    const hour = selected.value;

    setEHour(hour);
    updateReservation({ endHour: hour });
  };

  const handlerSelectEndMinute = (e) => {
    const selected = e.currentTarget;
    const minute = selected.value;

    setEMinute(minute);
    updateReservation({ endMinute: minute });
  };

  return (
    <Col md={8} className="bg-white p-4">
      <ReactDatePicker
        inline
        selectsRange
        startDate={sDate}
        endDate={eDate}
        minDate={now}
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
            {reservePeriod ? (
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
