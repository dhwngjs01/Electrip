"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa/";
import {
  Button,
  Container,
  Image,
  NavDropdown,
  Navbar,
  Tooltip,
  Nav,
} from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const session = useSession();
  const pathname = usePathname();

  const mainMenu = [
    { link: "/public/intro", name: "일렉트립 소개" },
    { link: "/public/guide", name: "이용안내" },
    { link: "/public/reserve", name: "바로예약" },
    { link: "/public/support", name: "고객지원" },
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
                  <Nav.Link
                    className="text-light"
                    onClick={() => signIn("credentials")}
                  >
                    로그인
                  </Nav.Link>
                  <Nav.Link className="text-light" href="/member/join">
                    회원가입
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
  /* 
  function MobileNavBar() {
    return (
      <>
        <div style={{ flexGrow: 1, display: { sm: "flex", md: "none" } }}>
          <Tooltip title="메뉴 열기">
            <FaBars size="large" onClick={handleOpenNavMenu} color="inherit">
              <FaBars />
            </FaBars>
          </Tooltip>
          <NavDropdown
            id="menu-appbar"
            anchorEl={clickMainNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(clickMainNav)}
            onClose={handleCloseNavMenu}
            style={{
              display: { sm: "block", md: "none" },
            }}
          >
            {mainMenu.map((menu, i) => (
              <NavDropdown.Item
                href={menu.link}
                key={menu.name}
                onClick={handleCloseNavMenu}
              >
                <p textAlign="center">{menu.name}</p>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </div>
        <div
          style={{ flexGrow: 1, py: 1, display: { sm: "flex", md: "none" } }}
        >
          <Link href="/">
            <div
              component="img"
              src="/images/logo.png"
              title="ELECTRIP LOGO"
              alt="ELECTRIP"
              style={{
                maxWidth: "100px",
              }}
            />
          </Link>
        </div>
        <div style={{ flexGrow: 0, display: { sm: "flex", md: "none" } }}>
          <Tooltip title="사용자 메뉴 열기">
            <FaUserCircle
              fontSize="inherit"
              style={{ color: "#fff" }}
              onClick={handleOpenUserMenu}
              size="large"
            />
          </Tooltip>
          <NavDropdown
            style={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={clickUserNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(clickUserNav)}
            onClose={handleCloseUserMenu}
          >
            {utilMenu.notLogin.map((util, i) => (
              <NavDropdown.Item
                href={util.link}
                key={util.name}
                onClick={handleCloseUserMenu}
              >
                <p textAlign="center">{util.name}</p>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </div>
      </>
    );
  } */

  return <PcNavBar />;
}
