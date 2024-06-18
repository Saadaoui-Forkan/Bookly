import { Link } from "react-router-dom";
import { BsColumnsGap } from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin" className="admin-sidebar-title">
        <BsColumnsGap />
        Dashboard
      </Link>
      <ul className="admin-dashboard-list">
        <Link className="admin-sidebar-link" to="/admin/books">
            <GiBookshelf />
            Books
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;