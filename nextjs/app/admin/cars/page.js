import CarAddButton from "@/components/pages/admin/cars/CarAddButton";
import CarList from "@/components/pages/admin/cars/CarList";
import Script from "next/script";

export default function Cars() {
  return (
    <>
      <h3>
        차량관리 <CarAddButton />
      </h3>
      <CarList />
      <Script
        type="text/javascript"
        src={
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY +
          "&libraries=services,clusterer,drawing&autoload=false"
        }
        strategy="beforeInteractive"
      />
    </>
  );
}
