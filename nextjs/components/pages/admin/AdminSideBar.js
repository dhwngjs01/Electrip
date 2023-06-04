"use client";

import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";

export default function AdminSideBar() {
  const pathname = usePathname();

  return (
    <ListGroup defaultActiveKey={pathname}>
      <ListGroup.Item action href="/admin/dashboard">
        대시보드
      </ListGroup.Item>
      <ListGroup.Item action href="/admin/users">
        회원관리
      </ListGroup.Item>
      <ListGroup.Item action href="/admin/cars">
        차량관리
      </ListGroup.Item>
      <ListGroup.Item action href="/admin/locations">
        장소관리
      </ListGroup.Item>
      <ListGroup.Item action href="/admin/reservations">
        대여관리
      </ListGroup.Item>
      <ListGroup.Item action href="/admin/statistics">
        통계
      </ListGroup.Item>
    </ListGroup>
  );
}
