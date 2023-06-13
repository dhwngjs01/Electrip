"use client";

import {
  FaCheckCircle,
  FaMinusCircle,
  FaUserAltSlash,
  FaUserCheck,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Table } from "react-bootstrap";

export default function UserList() {
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`)
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  const handlerOpenModal = (e) => {
    setAction(e.currentTarget.dataset.action);
    setId(e.currentTarget.dataset.id);
    setShow(true);
  };

  const handlerUserState = () => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`)
      .then((res) => {
        if (res.data.success) {
          setUsers(
            users.map((user) => {
              if (user.id === parseInt(id)) {
                user.is_active = !user.is_active;
              }
              return user;
            })
          );
          setShow(false);
        }
      });
  };

  return (
    <>
      <Table responsive className="text-center align-middle mt-3">
        <thead>
          <tr className="bg-electrip-table text-white">
            <th>상태</th>
            <th>아이디</th>
            <th>이름</th>
            <th>휴대폰 번호</th>
            <th>가입일자</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, key) => {
              return (
                <tr key={key}>
                  <td>
                    {user.is_active ? (
                      <FaCheckCircle className="text-success" />
                    ) : (
                      <FaMinusCircle className="text-danger" />
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{dayjs(user.created_at).format("YYYY-MM-DD")}</td>
                  <td>
                    {user.is_active ? (
                      <FaUserAltSlash
                        className="text-danger fs-4 cursor-pointer"
                        onClick={handlerOpenModal}
                        data-id={user.id}
                        data-action="비활성화"
                      />
                    ) : (
                      <FaUserCheck
                        className="text-success fs-4 cursor-pointer"
                        onClick={handlerOpenModal}
                        data-id={user.id}
                        data-action="활성화"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ConfirmModal
        show={show}
        setShow={setShow}
        title="회원 상태 변경"
        body={`해당 회원을 정말 ${action} 하시겠습니까?`}
        confirmBtnClass={action === "활성화" ? "success" : "danger"}
        confirmBtnText={action}
        handlerConfirm={handlerUserState}
      />
    </>
  );
}
