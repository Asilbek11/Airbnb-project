import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="step-form">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="form-step"
          >
            <h2>Step 1: Enter Name</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="form-step"
          >
            <h2>Step 2: Enter Email</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="step-buttons">
        <button onClick={prevStep} disabled={step === 0}>Back</button>
        <button onClick={nextStep} disabled={step === 1}>Next</button>
      </div>
    </div>
  );
};

export default StepForm;
