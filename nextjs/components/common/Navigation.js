"use client";

import { usePathname } from "next/navigation";
import { Container, Image, Navbar, Nav } from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const session = useSession();
  const pathname = usePathname();

  const mainMenu = [
    { link: "/public/intro", name: "일렉트립 소개" },
    { link: "/public/guide", name: "이용안내" },
    { link: "/public/reserve", name: "바로예약" },
    { link: "/member/myReserve", name: "예약조회" },
  ];

  function PcNavBar() {
    return (
      <Navbar
        className={
          (pathname === "/" ? "rootPage" : "notRootPage shadow-sm") + " w-100"
        }
      >
        <Container>
          <Navbar.Brand href="/">
            <Image
              src="/images/logo.png"
              title="ELECTRIP LOGO"
              alt="ELECTRIP"
              style={{
                maxWidth: "150px",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto main-nav me-5">
              {mainMenu.map((menu) => (
                <Nav.Link
                  className="mx-1 text-white fs-5"
                  href={menu.link}
                  key={menu.name}
                >
                  {menu.name}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="util-nav">
              {session.status !== "authenticated" ? (
                <>
                  <Nav.Link className="text-light" onClick={() => signIn()}>
                    로그인
                  </Nav.Link>
                  <Nav.Link className="text-light" href="/member/join">
                    회원가입
                  </Nav.Link>
                </>
              ) : session.data.user.user_is_staff ? (
                <>
                  <Nav.Link className="text-light" href="/admin/dashboard">
                    관리자페이지
                  </Nav.Link>
                  <Nav.Link className="text-light" onClick={() => signOut()}>
                    로그아웃
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="text-light" onClick={() => signOut()}>
                  로그아웃
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  function AdminNavBar() {
    const subMenu = [
      { link: "/admin/dashboard", name: "대시보드" },
      { link: "/admin/users", name: "회원관리" },
      { link: "/admin/cars", name: "차량관리" },
      { link: "/admin/locations", name: "장소관리" },
      { link: "/admin/reservations", name: "대여관리" },
      { link: "/admin/statistics", name: "통계" },
    ];

    return (
      <>
        <Navbar className="w-100" style={{ backgroundColor: "#417690" }}>
          <Container>
            <Navbar.Brand href="/">
              <Image
                src="/images/admin_logo.png"
                title="ELECTRIP LOGO"
                alt="ELECTRIP"
                style={{
                  maxWidth: "150px",
                }}
              />
            </Navbar.Brand>
            {session.status === "authenticated" && (
              <Nav className="ms-auto main-nav me-5 text-white">
                환영합니다.{" "}
                <span style={{ color: "#ffc100" }}>
                  {session.data.user.user_name}님
                </span>
              </Nav>
            )}
            <Nav className="util-nav">
              <Nav.Link className="text-light" href="#">
                비밀번호 변경
              </Nav.Link>
              <Nav.Link className="text-light" onClick={() => signOut()}>
                로그아웃
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="w-100" style={{ backgroundColor: "#79aec8" }}>
          <Container>
            <nav>
              <ol className="breadcrumb py-2">
                <li className="breadcrumb-item">
                  <a
                    href="/admin/dashboard"
                    className="text-white text-decoration-none"
                  >
                    Home
                  </a>
                </li>
                {subMenu.map(
                  (menu, key) =>
                    pathname === menu.link && (
                      <li
                        key={key}
                        className="breadcrumb-item active text-white"
                      >
                        {menu.name}
                      </li>
                    )
                )}
              </ol>
            </nav>
          </Container>
        </div>
      </>
    );
  }

  if (pathname.includes("/admin")) {
    return <AdminNavBar />;
  } else {
    return <PcNavBar />;
  }
}
