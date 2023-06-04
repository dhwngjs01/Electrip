import UserList from "@/components/pages/admin/users/UserList";

export default function Users() {
  return (
    <>
      <h3>회원관리</h3>
      <table className="table table-responsive text-center align-middle mt-3">
        <colgroup>
          <col className="col-1" />
          <col className="col-4" />
          <col className="col-2" />
          <col className="col-2" />
          <col className="col-2" />
          <col className="col-1" />
        </colgroup>
        <thead>
          <tr className="bg-electrip-table text-white">
            <th>활성화</th>
            <th>아이디</th>
            <th>이름</th>
            <th>휴대폰 번호</th>
            <th>가입일자</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          <UserList />
        </tbody>
      </table>
    </>
  );
}
