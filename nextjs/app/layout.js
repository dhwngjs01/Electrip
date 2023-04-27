"use client";

import "./globals.scss";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

import {
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Tooltip,
  MenuItem,
  Link,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function RootLayout({ children }) {
  const mainMenu = [
    { link: "/public/intro", name: "일렉트립 소개" },
    { link: "/public/info", name: "이용안내" },
    { link: "/public/reserve", name: "바로예약" },
    { link: "/public/support", name: "고객지원" },
  ];

  const utilMenu = {
    notLogin: [
      { link: "/member/login", name: "로그인" },
      { link: "/member/join", name: "회원가입" },
    ],

    logined: [
      { link: "/member/logout", name: "로그아웃" },
      { link: "/member/myReserve", name: "예약조회" },
    ],
  };

  const [clickMainNav, setClickMainNav] = useState(null);
  const [clickUserNav, setClickUserNav] = useState(null);

  // 모바일 메뉴 - (메인 메뉴 열기 클릭 시) 메인 메뉴 열기
  const handleOpenNavMenu = (event) => {
    setClickMainNav(event.currentTarget);
  };

  // 모바일 메뉴 - (유저 메뉴 열기 클릭 시) 유저 메뉴 열기
  const handleOpenUserMenu = (event) => {
    setClickUserNav(event.currentTarget);
  };

  // 모바일 메뉴 - (메인 메뉴 닫기 클릭 시) 메인 메뉴 닫기
  const handleCloseNavMenu = () => {
    setClickMainNav(null);
  };

  // 모바일 메뉴 - (유저 메뉴 닫기 클릭 시) 유저 메뉴 닫기
  const handleCloseUserMenu = () => {
    setClickUserNav(null);
  };

  // PC 메뉴
  const pcNav = () => {
    return (
      <>
        <Box sx={{ flexGrow: 20, py: 1, display: { xs: "none", md: "flex" } }}>
          <Link href="/">
            <Box
              component="img"
              src="/resources/images/logo.png"
              title="ELECTRIP LOGO"
              alt="ELECTRIP"
              sx={{
                maxWidth: 150,
              }}
            />
          </Link>
        </Box>
        <Box
          className="mainMenu"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {mainMenu.map((menu) => (
            <Button
              href={menu.link}
              key={menu.name}
              onClick={handleCloseNavMenu}
              sx={{ color: "#fff", fontSize: "1.15rem", mx: 0.5 }}
            >
              {menu.name}
            </Button>
          ))}
        </Box>
        <Box
          className="utilMenu"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {utilMenu.notLogin.map((util) => (
            <Button
              href={util.link}
              key={util.name}
              onClick={handleCloseUserMenu}
              size="medium"
              sx={{ color: "#ddd", m: 0, p: 0 }}
            >
              {util.name}
            </Button>
          ))}
        </Box>
      </>
    );
  };

  // 모바일 메뉴
  const mobileNav = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1, display: { sm: "flex", md: "none" } }}>
          <Tooltip title="메뉴 열기">
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Menu
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
            sx={{
              display: { sm: "block", md: "none" },
            }}
          >
            {mainMenu.map((menu) => (
              <MenuItem
                to={menu.link}
                key={menu.name}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{menu.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, py: 1, display: { sm: "flex", md: "none" } }}>
          <Link href="/">
            <Box
              component="img"
              src="/resources/images/logo.png"
              title="ELECTRIP LOGO"
              alt="ELECTRIP"
              sx={{
                maxWidth: 100,
              }}
            />
          </Link>
        </Box>
        <Box sx={{ flexGrow: 0, display: { sm: "flex", md: "none" } }}>
          <Tooltip title="사용자 메뉴 열기">
            <IconButton onClick={handleOpenUserMenu} size="large">
              <AccountCircleIcon fontSize="inherit" sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
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
            {utilMenu.notLogin.map((util) => (
              <MenuItem
                to={util.link}
                key={util.name}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">{util.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </>
    );
  };

  const pathname = usePathname();

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Electrip</title>
      </head>
      <body>
        <div id="wrap" style={pathname === "/" ? { marginTop: "110px" } : null}>
          <AppBar
            id="nav"
            className={pathname === "/" ? "rootPage" : "notRootPage"}
          >
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                {pcNav()}
                {mobileNav()}
              </Toolbar>
            </Container>
          </AppBar>
          {children}
        </div>
        <Script
          type="text/javascript"
          src={
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
            process.env.NEXT_PUBLIC_REACT_APP_KAKAOMAP_API +
            "&libraries=services,clusterer,drawing&autoload=false"
          }
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
