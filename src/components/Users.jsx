import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://linushiggs.alwaysdata.net/api/users",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, //Add token if available
        }
      );
      setUsers(response.data.users || response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://linushiggs.alwaysdata.net/api/users/${selectedUser.user_id}`,
        editForm,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }  // Include token in headers if it exists for authentication
      );
      setSuccess("User updated successfully!");
      setShowEditModal(false); // Close the edit modal after successful update
      fetchUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage for authentication
      await axios.delete(
        `https://linushiggs.alwaysdata.net/api/users/${selectedUser.user_id}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }  // Include token in headers if it exists for authentication
      );
      setSuccess("User deleted successfully!");
      setShowDeleteModal(false); // Close the delete modal after successful deletion
      fetchUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({ username: user.username || "", email: user.email, role: user.role || "user" });
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter; // Filter users based on search term and role filter. A user matches if their username or email includes the search term (case-insensitive) and if their role matches the selected role filter (or if "all" is selected, which includes all roles).
    return matchesSearch && matchesRole; // A user is included in the filtered list if they match both the search term and the role filter criteria.
  });

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  // ─── Dark theme styles (overrides) ───────────────
  const page = {
    background: "#0f172a",
    minHeight: "100vh",
    padding: "32px 16px",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const card = {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    color: "#f1f5f9",
  };

  const statCard = (bg, iconColor) => ({
    ...card,
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const iconCircle = (bg) => ({
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  const label = { fontSize: 13, color: "#94a3b8", marginBottom: 4, fontWeight: 500 };
  const bigNum = { fontSize: 28, fontWeight: 700, color: "#f1f5f9", margin: 0 };

  const inputStyle = {
    background: "#0f172a",
    color: "#f1f5f9",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 14,
    width: "100%",
    outline: "none",
  };

  const tableHeader = {
    background: "#0f172a",
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: 600,
    padding: "12px 16px",
    borderBottom: "1px solid #334155",
    whiteSpace: "nowrap",
  };

  const tableCell = {
    padding: "14px 16px",
    color: "#cbd5e1",
    fontSize: 14,
    borderBottom: "1px solid #1e293b",
    background: "#1e293b",
    verticalAlign: "middle",
  };

  const avatarStyle = {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #1e40af)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
    marginRight: 10,
  };

  const modalOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const modalBox = {
    background: "#1e293b",
    color: "#f1f5f9",
    borderRadius: 16,
    width: "100%",
    maxWidth: 460,
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    overflow: "hidden",
  };

  const modalHeader = (danger = false) => ({
    padding: "20px 24px 16px",
    borderBottom: "1px solid #334155",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: danger ? "#450a0a" : "#0f172a",
  });

  const modalTitle = (danger = false) => ({
    margin: 0,
    fontWeight: 700,
    fontSize: 17,
    color: danger ? "#f87171" : "#f1f5f9",
  });

  const closeBtn = {
    background: "none",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    color: "#94a3b8",
    lineHeight: 1,
    padding: 0,
  };

  const modalBody = { padding: "20px 24px" };

  const modalFooter = {
    padding: "16px 24px 20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    borderTop: "1px solid #334155",
    background: "#0f172a",
  };

  const btn = (variant) => {
    const base = {
      padding: "8px 22px",
      borderRadius: 20,
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      border: "none",
      transition: "opacity .15s",
    };
    if (variant === "primary") return { ...base, background: "#3b82f6", color: "#fff" };
    if (variant === "danger")  return { ...base, background: "#dc2626", color: "#fff" };
    return { ...base, background: "#334155", color: "#f1f5f9" };
  };

  const editInputStyle = {
    ...inputStyle,
    padding: "10px 14px",
    borderRadius: 8,
    marginTop: 4,
    display: "block",
  };

  return (
    <div style={page}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, color: "#f1f5f9" }}>
              👥 User Management
            </h2>
            <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 14 }}>
              Manage and oversee all registered users
            </p>
          </div>
          <Link
            to="/admin"
            style={{
              ...btn("light"),
              textDecoration: "none",
              padding: "8px 18px",
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 20,
              color: "#f1f5f9",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ← Back to Admin Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {/* Total */}
          <div style={statCard("#1e293b", "#3b82f6")}>
            <div>
              <p style={label}>Total Users</p>
              <p style={bigNum}>{totalUsers}</p>
            </div>
            <div style={iconCircle("#334155")}>
              <span style={{ fontSize: 22 }}>👥</span>
            </div>
          </div>
          {/* Admins */}
          <div style={statCard("#1e293b", "#db2777")}>
            <div>
              <p style={label}>Admin Users</p>
              <p style={bigNum}>{adminCount}</p>
            </div>
            <div style={iconCircle("#334155")}>
              <span style={{ fontSize: 22 }}>🛡️</span>
            </div>
          </div>
          {/* Regular */}
          <div style={statCard("#1e293b", "#059669")}>
            <div>
              <p style={label}>Regular Users</p>
              <p style={bigNum}>{userCount}</p>
            </div>
            <div style={iconCircle("#334155")}>
              <span style={{ fontSize: 22 }}>👤</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div style={{ background: "#064e3b", border: "1px solid #10b981", color: "#a7f3d0", borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span>✅ {success}</span>
            <button onClick={() => setSuccess("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#a7f3d0" }}>✕</button>
          </div>
        )}
        {error && (
          <div style={{ background: "#7f1d1d", border: "1px solid #f87171", color: "#fecaca", borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span>⚠️ {error}</span>
            <button onClick={() => setError("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fecaca" }}>✕</button>
          </div>
        )}

        {/* Filters */}
        <div style={{ ...card, padding: "20px 24px", marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ ...label, display: "block", marginBottom: 6 }}>🔍 Search Users</label>
              <input
                type="text"
                style={inputStyle}
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label style={{ ...label, display: "block", marginBottom: 6 }}>⚙️ Filter by Role</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="admin">Admins Only</option>
                <option value="user">Regular Users Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["#", "User", "Email", "Role", "User ID", "Actions"].map((h, i) => (
                    <th key={h} style={{ ...tableHeader, textAlign: i === 5 ? "center" : "left" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && users.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ ...tableCell, textAlign: "center", padding: "48px 0", color: "#94a3b8" }}>
                      ⏳ Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ ...tableCell, textAlign: "center", padding: "48px 0", color: "#64748b" }}>
                      📭 No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.user_id || user.id}
                      style={{ transition: "background .15s" }}
                      onMouseEnter={(e) => {
                        Array.from(e.currentTarget.cells).forEach(
                          (c) => (c.style.background = "#334155")
                        );
                      }}
                      onMouseLeave={(e) => {
                        Array.from(e.currentTarget.cells).forEach(
                          (c) => (c.style.background = "#1e293b")
                        );
                      }}
                    >
                      <td style={{ ...tableCell, color: "#64748b", width: 40 }}>{index + 1}</td>

                      <td style={tableCell}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={avatarStyle}>
                            {(user.username || user.email)[0].toUpperCase()}
                          </div>
                          <strong style={{ color: "#f1f5f9" }}>
                            {user.username || "No username"}
                          </strong>
                        </div>
                      </td>

                      <td style={{ ...tableCell, color: "#94a3b8" }}>{user.email}</td>

                      <td style={tableCell}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 700,
                            background: user.role === "admin" ? "#450a0a" : "#0f172a",
                            color: user.role === "admin" ? "#f87171" : "#60a5fa",
                            border: `1px solid ${user.role === "admin" ? "#f87171" : "#3b82f6"}`,
                          }}
                        >
                          {user.role === "admin" ? "🛡️" : "👤"} {user.role || "user"}
                        </span>
                      </td>

                      <td style={tableCell}>
                        <code style={{ fontSize: 12, color: "#a78bfa", background: "#1e1b4b", padding: "2px 8px", borderRadius: 4 }}>
                          {user.user_id || user.id}
                        </code>
                      </td>

                      <td style={{ ...tableCell, textAlign: "center" }}>
                        <button
                          onClick={() => openEditModal(user)}
                          title="Edit User"
                          style={{
                            background: "#1e3a8a", border: "1px solid #3b82f6", color: "#93c5fd",
                            borderRadius: 8, padding: "6px 12px", cursor: "pointer", marginRight: 6, fontSize: 14,
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          title="Delete User"
                          style={{
                            background: "#7f1d1d", border: "1px solid #f87171", color: "#fecaca",
                            borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 14,
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div style={modalOverlay} onClick={() => setShowEditModal(false)}>
            <div style={modalBox} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeader(false)}>
                <h5 style={modalTitle(false)}>✏️ Edit User</h5>
                <button style={closeBtn} onClick={() => setShowEditModal(false)}>×</button>
              </div>
              <form
                onSubmit={handleUpdateUser}
                style={{ display: "contents" }}
              >
                <div style={modalBody}>
                  {["username", "email"].map((field) => (
                    <div key={field} style={{ marginBottom: 16 }}>
                      <label style={{ ...label, display: "block" }}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        style={editInputStyle}
                        value={editForm[field]}
                        onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ ...label, display: "block" }}>Role</label>
                    <select
                      style={{ ...editInputStyle, cursor: "pointer" }}
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    >
                      <option value="user">Regular User</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>
                <div style={modalFooter}>
                  <button type="button" style={btn("light")} onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" style={btn("primary")} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div style={modalOverlay} onClick={() => setShowDeleteModal(false)}>
            <div style={modalBox} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeader(true)}>
                <h5 style={modalTitle(true)}>⚠️ Confirm Delete</h5>
                <button style={closeBtn} onClick={() => setShowDeleteModal(false)}>×</button>
              </div>
              <div style={modalBody}>
                <p style={{ margin: 0, color: "#f1f5f9", fontSize: 15 }}>
                  Are you sure you want to delete{" "}
                  <strong style={{ color: "#f87171" }}>
                    {selectedUser?.username || selectedUser?.email}
                  </strong>?
                </p>
                <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 13 }}>
                  This action cannot be undone.
                </p>
              </div>
              <div style={modalFooter}>
                <button style={btn("light")} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button style={btn("danger")} onClick={handleDeleteUser} disabled={loading}>
                  {loading ? "Deleting..." : "Delete User"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Users;