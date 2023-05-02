"use client";

import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   icon: {
//     fontSize: 40,
//   },
// }));

export default function Guide() {
  //   const classes = useStyles();

  const information = [
    {
      id: 1,
      title: "예약",
      content:
        "사전 예약을 하시면 차량 이용 가능 여부를 보장할 수 있습니다. 당일 예약도 가능하지만, 예약 없이 차량 이용을 보장할 수는 없습니다.",
    },
    {
      id: 2,
      title: "운전면허증",
      content:
        "차량 대여를 위해서는 유효한 운전면허증이 필요합니다. 대여 시 운전면허증을 제시해주세요.",
    },
    {
      id: 3,
      title: "결제 수단",
      content:
        "주요 신용카드 및 체크카드를 사용하실 수 있습니다. 현금 결제는 불가능합니다.",
    },
    {
      id: 4,
      title: "취소 정책",
      content:
        "대여 시작 24시간 전까지 예약 취소 시 전액 환불됩니다. 대여 시작 24시간 이내에 취소 시 취소 수수료가 부과됩니다.",
    },
    {
      id: 5,
      title: "연령 요건",
      content:
        "차량 대여를 하려면 만 21세 이상이어야 합니다. 만 25세 이하 운전자는 추가 요금이 부과될 수 있습니다.",
    },
    {
      id: 6,
      title: "보험",
      content:
        "모든 대여에 기본 보험 적용됩니다. 추가 보험 옵션을 선택하실 수도 있습니다.",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        이용안내
      </Typography>
      <List sx={{ mb: 4 }}>
        {information.map((info) => (
          <ListItem key={info.id} disableGutters>
            <ListItemText primary={info.title} secondary={info.content} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
