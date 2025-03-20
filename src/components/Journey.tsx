import { motion } from 'framer-motion';
import {
  PencilSquareIcon,
  LockClosedIcon,
  ClockIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: PencilSquareIcon,
    title: 'Create',
    description: 'Start by creating your digital time capsule and adding your precious memories.',
  },
  {
    icon: LockClosedIcon,
    title: 'Seal',
    description: 'Securely seal your capsule with advanced encryption to protect your contents.',
  },
  {
    icon: ClockIcon,
    title: 'Set Timer',
    description: 'Choose when your capsule will be opened and shared with your loved ones.',
  },
  {
    icon: GiftIcon,
    title: 'Share',
    description: 'Select recipients who will receive your memories when the time comes.',
  },
];

export default function Journey() {
  return (
    <section className="py-16 bg-sepia-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-figtree-900 text-gray-900 mb-4">
            Your Journey with TimeSeal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to preserve your memories for future generations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="card text-center h-full">
                <div className="mb-4">
                  <step.icon className="w-12 h-12 mx-auto text-sepia-700" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-sepia-300" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}