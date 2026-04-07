import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Upload, FileText, CreditCard, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetaTags from '../components/SEO/MetaTags';
import { useAuth } from '../contexts/AuthContext';
import { sellerServices } from '../firebase/services';
import toast from 'react-hot-toast';

const SellerApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState({ aadhaar: null, pan: null, license: null });
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
    aadhaarNumber: '', panNumber: '', drivingLicense: '',
    bankName: '', accountNumber: '', ifscCode: '', upiId: ''
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Documents', icon: FileText },
    { number: 3, title: 'Bank Details', icon: CreditCard },
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('File size should be less than 5MB'); return; }
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) { toast.error('Only JPG, PNG, and PDF files are allowed'); return; }
    setDocuments({ ...documents, [docType]: file });
    toast.success(`${docType.toUpperCase()} document uploaded`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to submit application'); navigate('/auth'); return; }
    if (!documents.aadhaar || !documents.pan || !documents.license) { toast.error('Please upload all required documents'); return; }
    setLoading(true);
    try {
      const result = await sellerServices.submitApplication(user.id, formData, documents);
      if (result.success) {
        toast.success('Application submitted successfully!');
        navigate('/seller/verification-status');
      } else {
        toast.error(result.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-neutral-600 focus:border-neutral-300 dark:border-neutral-600 transition-all text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:text-neutral-500 text-sm";

  const DocUpload = ({ docKey, title, desc, numberField, numberPlaceholder }) => (
    <div className="p-5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-0.5">{title}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">{desc}</p>
        </div>
        <Upload className="w-4 h-4 text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
      </div>
      <input type="text" name={numberField} value={formData[numberField]} onChange={handleChange} required className={`${inputClass} mb-3`} placeholder={numberPlaceholder} />
      <input type="file" id={`${docKey}-upload`} accept="image/*,.pdf" onChange={(e) => handleFileChange(e, docKey)} className="hidden" />
      <button
        type="button"
        onClick={() => document.getElementById(`${docKey}-upload`).click()}
        className={`w-full py-2.5 rounded-lg text-sm transition-colors ${documents[docKey] ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'}`}
      >
        {documents[docKey] ? '✓ Document Uploaded' : 'Upload Document'}
      </button>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MetaTags title="Become a Seller" description="Apply to list your vehicles on LivinLease" />

      <div className="container-elegant py-12 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-50 mb-2">Become a Seller</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">Start earning by renting out your vehicles. Complete the application in 3 simple steps.</p>
        </div>

        {/* Progress */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${currentStep >= step.number ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-500'}`}>
                    {currentStep > step.number ? <CheckCircle size={18} /> : <step.icon size={18} />}
                  </div>
                  <span className={`text-xs font-medium ${currentStep >= step.number ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-600'}`}>{step.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-px flex-1 mx-3 ${currentStep > step.number ? 'bg-neutral-400' : 'bg-neutral-100 dark:bg-neutral-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {[
                    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name', icon: User },
                    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', icon: Mail },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', icon: Phone },
                    { name: 'city', label: 'City', type: 'text', placeholder: 'City', icon: MapPin },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">{field.label}</label>
                      <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} required className={inputClass} placeholder={field.placeholder} />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Full Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required rows={3} className={`${inputClass} resize-none`} placeholder="Enter your complete address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required className={inputClass} placeholder="State" />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className={inputClass} placeholder="Pincode" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Document Verification</h2>
                <div className="space-y-4">
                  <DocUpload docKey="aadhaar" title="Aadhaar Card" desc="Upload your Aadhaar card for identity verification" numberField="aadhaarNumber" numberPlaceholder="Aadhaar Number" />
                  <DocUpload docKey="pan" title="PAN Card" desc="Required for tax purposes" numberField="panNumber" numberPlaceholder="PAN Number" />
                  <DocUpload docKey="license" title="Driving License" desc="Valid driving license required" numberField="drivingLicense" numberPlaceholder="License Number" />
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Bank Details</h2>
                <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-5">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-400">Your earnings will be transferred to this account. Please ensure the details are correct.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'bankName', label: 'Bank Name', placeholder: 'Bank Name' },
                    { name: 'accountNumber', label: 'Account Number', placeholder: 'Account Number' },
                    { name: 'ifscCode', label: 'IFSC Code', placeholder: 'IFSC Code' },
                    { name: 'upiId', label: 'UPI ID (Optional)', placeholder: 'yourname@upi', required: false },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs text-neutral-500 dark:text-neutral-500 mb-1.5">{field.label}</label>
                      <input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required !== false} className={inputClass} placeholder={field.placeholder} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              {currentStep > 1 ? (
                <button type="button" onClick={() => setCurrentStep(s => s - 1)} className="px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm transition-colors">
                  Back
                </button>
              ) : <div />}

              {currentStep < 3 ? (
                <button type="button" onClick={() => setCurrentStep(s => s + 1)} className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all">
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50">
                  {loading ? <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" /> : <><CheckCircle size={16} /><span>Submit Application</span></>}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerApplication;
