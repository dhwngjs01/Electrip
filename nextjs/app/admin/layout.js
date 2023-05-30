import AdminNavigation from "@/components/pages/admin/AdminNavigation";

export default function Layout({ children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <AdminNavigation />
        </div>
        <div className="col-md-8">{children}</div>
      </div>
    </div>
  );
}
