import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';
import { vehicleServices } from '../firebase/services';

const inputClass = "w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:text-neutral-500 outline-none";
const selectClass = "w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all text-neutral-900 dark:text-neutral-100 outline-none";

const SectionCard = ({ title, children }) => (
  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">{title}</h2>
    {children}
  </div>
);

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [, setVehicleLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', type: 'scooty', brand: '', model: '', year: '',
    pricePerDay: '', fuel: 'petrol', transmission: 'automatic',
    seats: '', mileage: '', location: '', description: '', features: ''
  });

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setVehicleLoading(true);
        const result = await vehicleServices.getVehicle(id);
        if (result.success && result.data) {
          const v = result.data;
          setFormData({
            name: v.name || '', type: v.type || 'scooty', brand: v.brand || '',
            model: v.model || '', year: v.year?.toString() || '',
            pricePerDay: v.pricePerDay?.toString() || '', fuel: v.fuel || 'petrol',
            transmission: v.transmission || 'automatic', seats: v.seats?.toString() || '',
            mileage: v.mileage?.toString() || '', location: v.location || '',
            description: v.description || '', features: v.features?.join(', ') || ''
          });
        } else {
          toast.error('Vehicle not found');
          navigate('/seller/vehicles');
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        toast.error('Failed to load vehicle');
        navigate('/seller/vehicles');
      } finally {
        setVehicleLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = {
        ...formData,
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
        seats: parseInt(formData.seats),
        mileage: formData.mileage ? parseFloat(formData.mileage) : null,
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
      };
      await vehicleServices.updateVehicle(id, updateData);
      toast.success('Vehicle updated successfully!');
      navigate('/seller/vehicles');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast.error('Failed to update vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Edit Vehicle" description="Update vehicle details" />
      <div className="container-elegant py-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/seller/vehicles')}
            className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Edit Vehicle</h1>
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">Update your vehicle details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionCard title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Vehicle Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Vehicle Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required className={selectClass}>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="scooty">Scooty</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Model</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Year</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Price per Day (Rs.)</label>
                <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Price per Hour (?)</label>
                <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} className={inputClass} placeholder="Optional" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Fuel Type</label>
                <select name="fuel" value={formData.fuel} onChange={handleChange} required className={selectClass}>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="cng">CNG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange} required className={selectClass}>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Seats</label>
                <input type="number" name="seats" value={formData.seats} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Mileage (km/l)</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Additional Details">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                  className={inputClass + " resize-none"} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-600 dark:text-neutral-400">Features (comma separated)</label>
                <input type="text" name="features" value={formData.features} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Vehicle Images">
            <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl p-12 text-center hover:border-neutral-500 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-700 dark:text-neutral-300 mb-1">Click to upload new images</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">PNG, JPG up to 5MB - Max 5 images</p>
            </div>
          </SectionCard>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate('/seller/vehicles')}
              className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-colors font-medium">
              Cancel
            </button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-8 py-3 rounded-xl transition-all disabled:opacity-50">
              {loading ? (
                <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2"><Save size={16} />Update Vehicle</span>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;