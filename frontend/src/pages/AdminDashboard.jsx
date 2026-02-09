import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiUsers, 
  FiCheckCircle, 
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiFilter
} from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    activeOpportunities: 0,
    pendingApplications: 0,
    totalUsers: 0
  });
  const [opportunities, setOpportunities] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch stats
      const statsRes = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(statsRes.data);

      // Fetch opportunities based on filter
      const oppsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/opportunities?status=${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpportunities(oppsRes.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/opportunities/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Opportunity approved!');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to approve opportunity');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/opportunities/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Opportunity rejected');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to reject opportunity');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/opportunities/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Opportunity deleted');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to delete opportunity');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getSourceBadge = (source) => {
    const badges = {
      manual: { bg: 'bg-indigo-100 text-indigo-800', label: 'Manual' },
      adzuna: { bg: 'bg-purple-100 text-purple-800', label: 'Adzuna API' },
      jooble: { bg: 'bg-pink-100 text-pink-800', label: 'Jooble API' },
      rss: { bg: 'bg-orange-100 text-orange-800', label: 'RSS Feed' }
    };
    return badges[source] || { bg: 'bg-gray-100 text-gray-800', label: source };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-indigo-100">Manage opportunities and monitor platform activity</p>
            </div>
            <Link
              to="/admin/opportunities/new"
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center space-x-2 shadow-lg"
            >
              <FiPlus className="text-xl" />
              <span>Add Opportunity</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Opportunities */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FiBriefcase className="text-indigo-600 text-2xl" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalOpportunities}</div>
            <div className="text-sm text-gray-600">All Opportunities</div>
          </div>

          {/* Active Opportunities */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="text-green-600 text-2xl" />
              </div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeOpportunities}</div>
            <div className="text-sm text-gray-600">Live Listings</div>
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FiClock className="text-yellow-600 text-2xl" />
              </div>
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.pendingApplications}</div>
            <div className="text-sm text-gray-600">Need Review</div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiUsers className="text-purple-600 text-2xl" />
              </div>
              <span className="text-sm text-gray-500">Users</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Registered Students</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/opportunities/new"
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <FiPlus className="text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-2">Add Opportunity</h3>
            <p className="text-indigo-100">Manually post a new opportunity</p>
          </Link>

          <Link
            to="/admin/sync-jobs"
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <FiTrendingUp className="text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-2">Sync Job APIs</h3>
            <p className="text-purple-100">Import from Adzuna & Jooble</p>
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-gradient-to-br from-pink-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <FiTrendingUp className="text-3xl mb-3" />
            <h3 className="text-xl font-bold mb-2">View Analytics</h3>
            <p className="text-pink-100">Platform metrics and insights</p>
          </Link>
        </div>

        {/* Opportunities Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900">Manage Opportunities</h2>
            
            {/* Filters */}
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="all">All Opportunities</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Opportunities Table */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 mt-4">Loading opportunities...</p>
            </div>
          ) : opportunities.length === 0 ? (
            <div className="text-center py-12">
              <FiAlertCircle className="text-gray-400 text-5xl mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No opportunities found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Title</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Company</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Source</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Created</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp) => (
                    <tr key={opp._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{opp.title}</div>
                        <div className="text-sm text-gray-600">{opp.location}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{opp.company}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSourceBadge(opp.source).bg}`}>
                          {getSourceBadge(opp.source).label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(opp.status)}`}>
                          {opp.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {new Date(opp.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end space-x-2">
                          {opp.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(opp._id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <FiCheckCircle />
                              </button>
                              <button
                                onClick={() => handleReject(opp._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <FiAlertCircle />
                              </button>
                            </>
                          )}
                          <Link
                            to={`/opportunities/${opp._id}`}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          <Link
                            to={`/admin/opportunities/${opp._id}/edit`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(opp._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
