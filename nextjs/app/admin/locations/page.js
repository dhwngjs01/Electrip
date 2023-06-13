import ZoneAddButton from "@/components/pages/admin/locations/ZoneAddButton";
import ZoneList from "@/components/pages/admin/locations/ZoneList";

export default function Locations() {
  return (
    <>
      <h3>
        장소관리 <ZoneAddButton />
      </h3>
      <ZoneList />
    </>
  );
}
