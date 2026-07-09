import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const faqData = [
  {
    id: 1,
    question: 'How secure is the data processed by Aetheris?',
    answer:
      'Aetheris employs end-to-end post-quantum encryption and multi-sig authorization for all neural training sets. We adhere to SOC2 Type II and GDPR standards globally.',
  },
  {
    id: 2,
    question: 'Can I deploy Aetheris on my private cloud?',
    answer:
      'Yes. Our Enterprise tier supports Kubernetes-based deployment on AWS, Azure, GCP, or strictly air-gapped private infrastructures.',
  },
  {
    id: 3,
    question: 'What is the typical integration timeline?',
    answer:
      'Standard API integrations take less than 24 hours. Full-scale neural cluster deployments typically range from 7 to 14 days with our white-glove onboarding.',
  },
  {
    id: 4,
    question: 'Do you offer a free trial?',
    answer:
      'Yes! We offer a 14-day free trial with full access to our Professional plan features. No credit card required.',
  },
  {
    id: 5,
    question: 'What kind of support do you provide?',
    answer:
      'We offer 8/5 email support for Starter, 24/7 priority support for Professional, and a dedicated account manager for Enterprise customers.',
  },
  {
    id: 6,
    question: 'Is there a contract or can I cancel anytime?',
    answer:
      'All plans are month-to-month with no long-term contracts. You can cancel or upgrade your plan at any time.',
  },
];

export const FAQ = () => {
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="py-2xl max-w-2xl mx-auto px-margin-mobile">
      <SectionHeading title="Frequently Asked Questions" />

      <div className="relative mb-xl">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">
          search
        </span>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full glass-surface p-lg pl-12 rounded-xl text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-all"
        />
      </div>

      <div className="space-y-md">
        {filteredFAQs.length === 0 ? (
          <p className="text-center text-on-surface-variant py-2xl">
            No questions found matching your search.
          </p>
        ) : (
          filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="glass-surface rounded-xl overflow-hidden group"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex justify-between items-center p-lg text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg">{item.question}</span>
                <motion.span
                  animate={{ rotate: activeId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-symbols-outlined text-primary flex-shrink-0 ml-md"
                >
                  expand_more
                </motion.span>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-lg pb-lg text-on-surface-variant leading-relaxed border-t border-white/5 pt-md">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </section>
  );
};