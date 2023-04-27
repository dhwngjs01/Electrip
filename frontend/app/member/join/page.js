"use client";

import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import DaumPostcode from "react-daum-postcode";

const Join = () => {
  const [phone, setPhone] = useState("");
  const phoneRef = useRef();

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isPostcodeClicked, setIsPostcodeClicked] = useState(true);

  // 카카오 주소 검색 API
  const [openPostcode, setOpenPostcode] = useState(false);
  const handlePostcode = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
      setIsPostcodeClicked((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setOpenPostcode(false);
      setIsPostcodeClicked(false);

      setZipcode(data.zonecode);
      setAddress(data.address);
      setDetailAddress(data.buildingName);
    },
  };

  // 휴대폰 번호 입력 함수 (자동 하이픈 생성)
  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const phoneNumberLength = 11;

    let result = "";

    for (let i = 0; i < value.length && i < phoneNumberLength; i++) {
      if (i === 3 || i === 7) {
        result += "-";
      }
      result += value[i];
    }

    phoneRef.current.value = result;
    setPhone(e.target.value);
  };

  // 회원가입 폼 전송
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <TextField
                  type="text"
                  id="user_id"
                  name="user_id"
                  label="아이디"
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  type="password"
                  id="user_pw"
                  name="user_pw"
                  label="비밀번호"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  type="password"
                  id="user_pw2"
                  name="user_pw2"
                  label="비밀번호 확인"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="text"
                  id="user_name"
                  name="user_name"
                  label="이름"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="tel"
                  id="user_phone"
                  name="user_phone"
                  label="휴대폰 번호"
                  value={phone}
                  inputRef={phoneRef}
                  fullWidth
                  required
                  onChange={handlePhone}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="email"
                  id="user_email"
                  name="user_email"
                  label="이메일 주소"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={2}
              mt={5}
            >
              <Grid xs={5}>
                <TextField
                  type="text"
                  id="user_zipcode"
                  name="user_zipcode"
                  label="우편번호"
                  value={zipcode}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  onClick={handlePostcode.clickButton}
                />
              </Grid>
              <Grid xs={3}>
                <Button
                  type="button"
                  variant="contained"
                  color="info"
                  fullWidth
                  onClick={handlePostcode.clickButton}
                >
                  주소찾기
                </Button>
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="text"
                  id="user_address"
                  name="user_address"
                  label="주소"
                  value={address}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  onClick={handlePostcode.clickButton}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  type="text"
                  id="user_detail_address"
                  name="user_detail_address"
                  label="상세주소"
                  value={detailAddress}
                  fullWidth
                  InputProps={{
                    readOnly: isPostcodeClicked,
                  }}
                  onChange={(e) => {
                    setDetailAddress(e.target.value);
                  }}
                  onClick={
                    !openPostcode && isPostcodeClicked
                      ? handlePostcode.clickButton
                      : null
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Link href="/member/login" variant="body2">
                  이미 계정이 있어요.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {openPostcode && (
        <Dialog
          open={openPostcode}
          onClose={handlePostcode.clickButton}
          fullWidth
        >
          <DialogTitle>다음 주소 찾기</DialogTitle>
          <DialogContent>
            <DaumPostcode
              onComplete={handlePostcode.selectAddress}
              autoClose={false}
              style={{ height: "450px" }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Join;
