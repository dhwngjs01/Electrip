import AdminSideBar from "@/components/pages/admin/AdminSideBar";

export default function Layout({ children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-2">
          <AdminSideBar />
        </div>
        <div className="col-md-8 col-lg-10">{children}</div>
      </div>
    </div>
  );
}
