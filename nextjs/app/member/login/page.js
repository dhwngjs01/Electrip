"use client";

import { React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            id="user_id"
            type="text"
            name="user_id"
            label="아이디"
            fullWidth
            margin="normal"
            required
            autoFocus
          />
          <TextField
            id="user_pw"
            type="password"
            name="user_pw"
            label="비밀번호"
            margin="normal"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Button
            href="/member/join"
            variant="contained"
            color="warning"
            size="large"
            fullWidth
          >
            회원가입
          </Button>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <Grid>
            <Button href="http://www.naver.com">
              <Box component="img" src="/resources/images/naver_icon.png" />
            </Button>
          </Grid>
          <Grid>
            <Button href="http://www.kakao.com">
              <Box component="img" src="/resources/images/kakao_icon.png" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
