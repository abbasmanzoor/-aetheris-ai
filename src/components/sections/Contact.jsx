import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    // Validate on blur
    const newErrors = validate();
    if (newErrors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: newErrors[e.target.name] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      setTimeout(() => setStatus(null), 4000);
    }, 1500);
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'campaign', url: '#' },
    { name: 'LinkedIn', icon: 'work', url: '#' },
    { name: 'YouTube', icon: 'play_circle', url: '#' },
    { name: 'GitHub', icon: 'code', url: '#' },
  ];

  const shouldShowError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const getBorderClass = (fieldName) => {
    if (shouldShowError(fieldName)) {
      return 'border-error focus:border-error shadow-[0_0_20px_rgba(239,68,68,0.15)]';
    }
    return 'border-gray-300 dark:border-gray-600 focus:border-primary focus:shadow-[0_0_25px_rgba(99,102,241,0.2)]';
  };

  return (
    <section id="contact" className="py-2xl bg-surface-container-lowest/30">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="Have questions? Reach out to our team."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-gutter">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-surface p-xl rounded-2xl" noValidate>
              <div className="space-y-md">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl px-md py-sm text-on-surface placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 transition-all duration-300 focus:outline-none ${getBorderClass('name')}`}
                    placeholder="Enter your full name"
                    aria-required="true"
                    aria-invalid={shouldShowError('name')}
                    aria-describedby={shouldShowError('name') ? 'name-error' : undefined}
                  />
                  {shouldShowError('name') && (
                    <motion.p
                      id="name-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl px-md py-sm text-on-surface placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 transition-all duration-300 focus:outline-none ${getBorderClass('email')}`}
                    placeholder="Enter your email address"
                    aria-required="true"
                    aria-invalid={shouldShowError('email')}
                    aria-describedby={shouldShowError('email') ? 'email-error' : undefined}
                  />
                  {shouldShowError('email') && (
                    <motion.p
                      id="email-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl px-md py-sm text-on-surface placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 transition-all duration-300 focus:outline-none ${getBorderClass('subject')}`}
                    placeholder="What is this about?"
                    aria-required="true"
                    aria-invalid={shouldShowError('subject')}
                    aria-describedby={shouldShowError('subject') ? 'subject-error' : undefined}
                  />
                  {shouldShowError('subject') && (
                    <motion.p
                      id="subject-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl px-md py-sm text-on-surface placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 transition-all duration-300 resize-none focus:outline-none ${getBorderClass('message')}`}
                    placeholder="Tell us about your project..."
                    aria-required="true"
                    aria-invalid={shouldShowError('message')}
                    aria-describedby={shouldShowError('message') ? 'message-error' : undefined}
                  />
                  {shouldShowError('message') && (
                    <motion.p
                      id="message-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Send Message Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-secondary-container text-on-primary font-bold py-md rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_50px_rgba(99,102,241,0.4)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xl">send</span>
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Success/Error States */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-500/20 border border-green-500/50 text-green-400 p-md rounded-xl text-center backdrop-blur-sm"
                      role="status"
                    >
                      <span className="material-symbols-outlined align-middle mr-sm">check_circle</span>
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-error/20 border border-error/50 text-error p-md rounded-xl text-center backdrop-blur-sm"
                      role="alert"
                    >
                      <span className="material-symbols-outlined align-middle mr-sm">error</span>
                      Please fix the errors above and try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Company Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-lg"
          >
            <div className="glass-surface p-xl rounded-2xl">
              <h3 className="font-headline-lg text-headline-lg mb-lg">Company Information</h3>
              <div className="space-y-md text-on-surface-variant">
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div>
                    <p className="font-medium text-on-surface">Address</p>
                    <p>123 AI Boulevard, Suite 500</p>
                    <p>San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary">email</span>
                  <div>
                    <p className="font-medium text-on-surface">Email</p>
                    <p>hello@aetheris.ai</p>
                  </div>
                </div>
                <div className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary">phone</span>
                  <div>
                    <p className="font-medium text-on-surface">Phone</p>
                    <p>+1 (555) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-surface p-xl rounded-2xl">
              <h3 className="font-headline-lg text-headline-lg mb-lg">Follow Us</h3>
              <div className="flex flex-wrap gap-md">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="glass-surface p-md rounded-xl hover:bg-white/10 transition-all flex items-center gap-sm"
                  >
                    <span className="material-symbols-outlined text-primary">{social.icon}</span>
                    <span className="text-on-surface">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};