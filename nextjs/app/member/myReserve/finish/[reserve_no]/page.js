import FinishRentMap from "@/components/pages/member/myReserve/FinishRentMap";
import Script from "next/script";

export default function MyReserveFinish() {
  return (
    <div className="container">
      <h4 className="text-center mb-0 py-3 bg-light">
        아래 지도에서 반납할 장소를 선택해주세요.
      </h4>

      <FinishRentMap />

      <Script
        type="text/javascript"
        src={
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY +
          "&libraries=services,clusterer,drawing&autoload=false"
        }
        strategy="beforeInteractive"
      />
    </div>
  );
}
