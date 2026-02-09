import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiPlus, FiMinus } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddOpportunity = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: [''],
    location: '',
    duration: '',
    positions: 1,
    applicationDeadline: '',
    type: 'internship',
    category: 'IT',
    stipend: '',
    applyUrl: '',
    source: 'manual'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements.length ? newRequirements : ['']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Filter out empty requirements
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim() !== '')
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/opportunities`,
        cleanedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Opportunity created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating opportunity:', error);
      toast.error(error.response?.data?.message || 'Failed to create opportunity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 mb-4 transition-colors"
          >
            <FiX />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Opportunity</h1>
          <p className="text-gray-600">Manually post a new opportunity for students</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-2">
              Basic Information
            </h2>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g., Software Engineering Intern"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g., Safaricom PLC"
              />
            </div>

            {/* Type and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="internship">Internship</option>
                  <option value="industrial-attachment">Industrial Attachment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="IT">IT</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Location and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g., Nairobi, Kenya"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g., 6 months"
                />
              </div>
            </div>

            {/* Positions and Stipend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Positions *
                </label>
                <input
                  type="number"
                  name="positions"
                  value={formData.positions}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stipend
                </label>
                <input
                  type="text"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g., KES 20,000/month or Unpaid"
                />
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-2">
              Job Details
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder="Provide a detailed description of the opportunity..."
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.description.length} characters
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-indigo-200 pb-2">
              <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                <FiPlus />
                <span>Add Requirement</span>
              </button>
            </div>

            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                  placeholder={`Requirement ${index + 1}`}
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FiMinus />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-2">
              Additional Information
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Application URL (Optional)
              </label>
              <input
                type="url"
                name="applyUrl"
                value={formData.applyUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
                placeholder="https://company.com/careers/apply"
              />
              <p className="text-sm text-gray-500 mt-2">
                Leave empty to use internal application system
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FiSave />
                  <span>Create Opportunity</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunity;
