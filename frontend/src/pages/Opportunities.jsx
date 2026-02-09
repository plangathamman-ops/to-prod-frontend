
import { useEffect, useState } from 'react';
import api from '../services/api';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const res = await api.get('/opportunities');
        setOpportunities(res.data.opportunities || []);
      } catch (err) {
        setError('Failed to load opportunities.');
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Opportunities</h1>
      <p className="text-gray-600 mb-6">Browse internships and industrial attachments from top companies.</p>
      {loading && <div className="text-indigo-600">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <div key={opp._id} className="bg-white rounded-xl shadow p-6 border hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold capitalize">{opp.type.replace('-', ' ')}</span>
              <span className="text-xs text-gray-400">{opp.location}</span>
            </div>
            <h2 className="text-xl font-bold mb-1">{opp.title}</h2>
            <div className="text-gray-700 mb-2 font-medium">{opp.company}</div>
            <div className="text-gray-500 text-sm mb-2">{opp.category} • {opp.duration}</div>
            <div className="text-gray-600 text-sm line-clamp-3 mb-3">{opp.description}</div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">Positions: {opp.positions}</span>
              <a href={`/opportunities/${opp._id}`} className="text-indigo-600 font-semibold hover:underline">View Details</a>
            </div>
          </div>
        ))}
      </div>
      {!loading && !error && opportunities.length === 0 && (
        <div className="text-gray-500 mt-8">No opportunities found.</div>
      )}
    </div>
  );
};

export default Opportunities;
