import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import { useAuth } from '../contexts/AuthContext';
import { vehicleServices, storageServices } from '../firebase/services';
import toast from 'react-hot-toast';

const inputClass = "w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all text-neutral-100 placeholder:text-neutral-500 outline-none";
const selectClass = "w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all text-neutral-100 outline-none";

const SectionCard = ({ title, children }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
    <h2 className="text-lg font-semibold text-neutral-100 mb-6 pb-4 border-b border-neutral-800">{title}</h2>
    {children}
  </div>
);

const AddVehicle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '', type: '', brand: '', model: '', year: '',
    pricePerDay: '', pricePerHour: '', fuel: '', transmission: '', seats: '',
    mileage: '', location: '', description: '', features: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) { toast.error('Maximum 5 images allowed'); return; }
    const valid = files.filter(f => {
      if (f.size > 5 * 1024 * 1024) { toast.error(`${f.name} is too large (max 5MB)`); return false; }
      if (!f.type.startsWith('image/')) { toast.error(`${f.name} is not an image`); return false; }
      return true;
    });
    setImages([...images, ...valid]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to add vehicle'); navigate('/auth'); return; }
    if (images.length === 0) { toast.error('Please upload at least one image'); return; }
    setLoading(true);
    try {
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const result = await storageServices.uploadImage(images[i], `vehicles/${user.id}/${Date.now()}-${i}`);
        if (result.success) imageUrls.push(result.url);
      }
      const vehicleData = {
        ...formData,
        images: imageUrls,
        ownerId: user.id,
        ownerName: user.name,
        pricePerDay: parseFloat(formData.pricePerDay),
        pricePerHour: formData.pricePerHour ? parseFloat(formData.pricePerHour) : null,
        year: parseInt(formData.year),
        seats: parseInt(formData.seats),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        status: 'pending',
        rating: 0, reviewCount: 0, bookingCount: 0
      };
      const result = await vehicleServices.addVehicle(vehicleData);
      if (result.success) {
        toast.success('Vehicle added! Waiting for admin approval.');
        navigate('/seller/vehicles');
      } else {
        toast.error(result.error || 'Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Failed to add vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-950">
      <MetaTags title="Add Vehicle" description="List a new vehicle for rent" />
      <div className="container-elegant py-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/seller/vehicles')}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-50 mb-1">Add New Vehicle</h1>
            <p className="text-neutral-500 text-sm">Fill in the details to list your vehicle</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionCard title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Vehicle Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="e.g., Honda Activa 6G" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Vehicle Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required className={selectClass}>
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="scooty">Scooty</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className={inputClass} placeholder="e.g., Honda" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Model</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} required className={inputClass} placeholder="e.g., Activa 6G" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Year</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required className={inputClass} placeholder="2024" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Price per Day (₹)</label>
                <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className={inputClass} placeholder="299" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Price per Hour (₹)</label>
                <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} className={inputClass} placeholder="99" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Fuel Type</label>
                <select name="fuel" value={formData.fuel} onChange={handleChange} required className={selectClass}>
                  <option value="">Select Fuel</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="cng">CNG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Transmission</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange} required className={selectClass}>
                  <option value="">Select Transmission</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Seats</label>
                <input type="number" name="seats" value={formData.seats} onChange={handleChange} required className={inputClass} placeholder="2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Mileage (km/l)</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className={inputClass} placeholder="45" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-neutral-400">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className={inputClass} placeholder="Mumbai, Maharashtra" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Additional Details">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                  className={`${inputClass} resize-none`} placeholder="Describe your vehicle..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-400">Features (comma separated)</label>
                <input type="text" name="features" value={formData.features} onChange={handleChange} className={inputClass} placeholder="GPS, Bluetooth, USB Charging" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Vehicle Images">
            <input type="file" id="vehicle-images" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="vehicle-images"
              className="block border-2 border-dashed border-neutral-700 rounded-xl p-12 text-center hover:border-neutral-500 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-300 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-neutral-500">PNG, JPG up to 5MB · Max 5 images</p>
            </label>
            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} className="w-full h-28 object-cover rounded-xl" />
                    <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => navigate('/seller/vehicles')}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-xl transition-colors font-medium">
              Cancel
            </button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-8 py-3 rounded-xl transition-all disabled:opacity-50">
              {loading ? (
                <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Save size={16} /><span>Add Vehicle</span></>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
