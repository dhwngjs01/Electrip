import CarAddButton from "@/components/pages/admin/cars/CarAddButton";
import CarList from "@/components/pages/admin/cars/CarList";

export default function Cars() {
  return (
    <>
      <h3>
        차량관리 <CarAddButton />
      </h3>
      <table className="table table-responsive text-center align-middle mt-3">
        <colgroup>
          <col className="col-2" />
          <col className="col-3" />
          <col className="col-2" />
          <col className="col-1" />
          <col className="col-1" />
          <col className="col-2" />
          <col className="col-1" />
        </colgroup>
        <thead>
          <tr className="bg-electrip-table text-white">
            <th>이미지</th>
            <th>모델</th>
            <th>번호판</th>
            <th>분류</th>
            <th>상태</th>
            <th>등록일자</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          <CarList />
        </tbody>
      </table>
    </>
  );
}
