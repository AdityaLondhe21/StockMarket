import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ViewAllStocks from './ViewAllStocks';
import AddStock from './AddStock';
import UpdateStock from './UpdateStock';
import DeleteStock from './DeleteStock';
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const isAdmin = useSelector((state) => state.isAdmin);

  return (
    <div className="main-content">
      <div className="content-section" id="admin-dashboard">
        <h2>Admin Dashboard</h2>

        {isAdmin ? (
          <>
            <p>Welcome to the Stocks Admin Dashboard.</p>
            <div className="admin-actions">
              <h3>Stock Management</h3>
              <ul>
                <li><Link to="/admin-dashboard/view-stocks">View All Stocks</Link></li>
                <li><Link to="/admin-dashboard/add-stock">Add New Stock</Link></li>
                <li><Link to="/admin-dashboard/update-stock">Update Stock</Link></li>
                <li><Link to="/admin-dashboard/delete-stock">Delete Stock</Link></li>
              </ul>
            </div>

            <Routes>
              <Route path="/view-stocks" element={<ViewAllStocks />} />
              <Route path="/add-stock" element={<AddStock />} />
              <Route path="/update-stock" element={<UpdateStock />} />
              <Route path="/delete-stock" element={<DeleteStock />} />
            </Routes>

          </>
        ) : (
          <div className="not-allowed">
            <p>You are not authorized to access the Admin Dashboard.</p>
            <p>Please log in as an administrator to view this page.</p>
            <Link to="/netbanking/login">Back to Login Page</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;