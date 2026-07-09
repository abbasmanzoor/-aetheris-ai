import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 49,
    priceYearly: 490,
    features: ['Up to 5 AI Agents', 'Standard API Access', '8/5 Support'],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    priceMonthly: 199,
    priceYearly: 1990,
    features: [
      'Unlimited AI Agents',
      'Advanced Priority API',
      'Dedicated Neural Training',
      '24/7 Priority Support',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: null,
    priceYearly: null,
    features: [
      'Custom Model Training',
      'On-Premise Deployment',
      'Dedicated Account Manager',
    ],
    popular: false,
    custom: true,
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="pricing" className="py-2xl bg-surface-container-lowest/50">
      <Container>
        <SectionHeading
          title="Scalable Infrastructure"
          subtitle="Choose the plan that fits your needs"
        />

        {/* Compact Premium Toggle Design */}
        <div className="flex items-center justify-center gap-2 mb-2xl">
          <motion.span
            animate={{
              color: isYearly ? 'var(--color-on-surface-variant)' : 'var(--color-primary)',
              scale: isYearly ? 1 : 1.03,
              fontWeight: isYearly ? 400 : 600,
            }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium transition-all duration-300 cursor-default flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            Monthly
          </motion.span>

          <motion.div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
                opacity: isHovered ? 0.6 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-tertiary/30 blur-sm"
            />

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-11 h-5 rounded-full bg-surface-container-high border border-white/10 shadow-md transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-background"
              aria-label="Toggle billing"
              role="switch"
              aria-checked={isYearly}
            >
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                animate={{
                  background: isYearly
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.12))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                }}
                transition={{ duration: 0.4 }}
              />

              <motion.div
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full shadow-md overflow-hidden"
                animate={{ x: isYearly ? 22 : 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: isYearly
                      ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                      : 'linear-gradient(135deg, #94a3b8, #64748b)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute inset-0.5 rounded-full bg-white/20" />

                <motion.div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full"
                  animate={{
                    opacity: isHovered ? 0.5 : 0.2,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-white text-[6px] font-bold"
                  animate={{
                    rotate: isYearly ? 0 : 180,
                    scale: isYearly ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isYearly ? 'Y' : 'M'}
                </motion.span>
              </motion.div>

              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-tertiary"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.08 }}
                      className="absolute -bottom-0.5 -left-0.5 w-1 h-1 rounded-full bg-primary"
                    />
                  </>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          <motion.span
            animate={{
              color: isYearly ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              scale: isYearly ? 1.03 : 1,
              fontWeight: isYearly ? 600 : 400,
            }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium transition-all duration-300 cursor-default flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-base">calendar_today</span>
            Yearly
            <motion.span
              animate={{
                opacity: isYearly ? 1 : 0.4,
                scale: isYearly ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className="text-[9px] text-tertiary font-bold ml-0.5"
            >
              (Save 20%)
            </motion.span>
          </motion.span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-end">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-surface p-xl rounded-2xl flex flex-col h-full relative ${
                plan.popular
                  ? 'border-primary bg-gradient-to-b from-primary/10 to-transparent transform scale-105 z-10 shadow-[0_0_60px_rgba(192,193,255,0.15)]'
                  : 'border-white/5'
              }`}
            >
              {/* ✅ Popular Badge - Now on TOP-LEFT */}
              {plan.popular && (
                <div className="absolute -top-3 -left-3 bg-gradient-to-r from-primary to-tertiary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-primary/25 flex items-center gap-1 z-20">
                  <span className="material-symbols-outlined text-xs">stars</span>
                  Popular
                </div>
              )}

              <div className="mb-lg mt-2">
                <h3 className="text-headline-lg font-headline-lg mb-sm text-on-surface">{plan.name}</h3>
                {plan.custom ? (
                  <div className="text-4xl font-bold text-primary">Custom</div>
                ) : (
                  <div className="flex items-baseline gap-xs">
                    <motion.span
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl font-bold text-on-surface"
                    >
                      ${isYearly ? plan.priceYearly : plan.priceMonthly}
                    </motion.span>
                    <span className="text-on-surface-variant">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-md mb-2xl flex-grow">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-center gap-md text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">
                      check_circle
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                size="lg"
                className="w-full justify-center"
              >
                {plan.custom ? 'Contact Sales' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};