import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const comparisonData = [
  { feature: 'Global Node Access', starter: '5 Nodes', pro: '100 Nodes', enterprise: 'Unlimited' },
  { feature: 'API Latency SLA', starter: '250ms', pro: '50ms', enterprise: '10ms Guaranteed' },
  { feature: 'Custom Integrations', starter: 'None', pro: 'Up to 10', enterprise: 'Unlimited' },
  { feature: '24/7 Support', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated Manager' },
  { feature: 'Data Retention', starter: '30 Days', pro: '1 Year', enterprise: 'Unlimited' },
];

export const FeatureComparison = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <section id="solutions" className="py-2xl bg-surface-container-lowest/50">
      <Container>
        <SectionHeading
          title="Feature Comparison"
          subtitle="Compare all features across our plans to choose the right fit."
        />

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden md:block overflow-x-auto rounded-2xl glass-surface">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-lg font-headline-lg">Feature</th>
                <th className="p-lg text-on-surface-variant">Starter</th>
                <th className="p-lg text-primary">Professional</th>
                <th className="p-lg text-on-surface-variant">Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-body-md">
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                    expandedRow === index ? 'bg-white/10' : ''
                  }`}
                  onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                >
                  <td className="p-lg font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">
                      {expandedRow === index ? 'expand_less' : 'expand_more'}
                    </span>
                    {row.feature}
                  </td>
                  <td className={`p-lg ${row.starter === 'None' ? 'text-error' : 'text-on-surface-variant'}`}>
                    {row.starter === 'None' ? (
                      <span className="material-symbols-outlined text-error">close</span>
                    ) : (
                      row.starter
                    )}
                  </td>
                  <td className="p-lg text-on-surface">
                    {row.pro === 'None' ? (
                      <span className="material-symbols-outlined text-error">close</span>
                    ) : (
                      row.pro
                    )}
                  </td>
                  <td className="p-lg text-on-surface">
                    {row.enterprise === 'None' ? (
                      <span className="material-symbols-outlined text-error">close</span>
                    ) : (
                      row.enterprise
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Mobile Cards - Visible only on mobile */}
        <div className="md:hidden space-y-md">
          {comparisonData.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-surface rounded-xl overflow-hidden"
            >
              {/* Feature Header - Clickable to expand */}
              <button
                onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                className="w-full flex items-center justify-between p-md text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {expandedRow === index ? 'expand_less' : 'expand_more'}
                  </span>
                  {row.feature}
                </span>
              </button>

              {/* Expandable Details */}
              <AnimatePresence>
                {expandedRow === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-md pb-md space-y-sm border-t border-white/5 pt-sm">
                      {/* Starter */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-on-surface-variant text-sm">Starter</span>
                        <span className={`text-sm font-medium ${row.starter === 'None' ? 'text-error' : 'text-on-surface'}`}>
                          {row.starter === 'None' ? (
                            <span className="material-symbols-outlined text-error text-sm">close</span>
                          ) : (
                            row.starter
                          )}
                        </span>
                      </div>

                      {/* Professional */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5">
                        <span className="text-primary text-sm font-medium">Professional</span>
                        <span className={`text-sm font-medium ${row.pro === 'None' ? 'text-error' : 'text-primary'}`}>
                          {row.pro === 'None' ? (
                            <span className="material-symbols-outlined text-error text-sm">close</span>
                          ) : (
                            row.pro
                          )}
                        </span>
                      </div>

                      {/* Enterprise */}
                      <div className="flex items-center justify-between py-1 border-t border-white/5">
                        <span className="text-on-surface-variant text-sm">Enterprise</span>
                        <span className={`text-sm font-medium ${row.enterprise === 'None' ? 'text-error' : 'text-on-surface'}`}>
                          {row.enterprise === 'None' ? (
                            <span className="material-symbols-outlined text-error text-sm">close</span>
                          ) : (
                            row.enterprise
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Expandable Row Detail - Desktop */}
        <AnimatePresence>
          {expandedRow !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block mt-md glass-surface p-lg rounded-xl"
            >
              <h4 className="font-bold text-primary mb-sm">{comparisonData[expandedRow].feature}</h4>
              <p className="text-on-surface-variant text-body-md">
                Learn more about our <strong>{comparisonData[expandedRow].feature}</strong> capabilities.
                Professional plans offer significantly better performance, while Enterprise provides unlimited scale.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};