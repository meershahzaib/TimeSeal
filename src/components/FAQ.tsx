import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'How secure are my time capsules?',
    answer: 'Your time capsules are protected with military-grade encryption. Only authorized recipients can access the contents when the release date arrives.',
  },
  {
    question: 'Can I modify a time capsule after sealing it?',
    answer: 'Once a capsule is sealed, it cannot be modified to ensure the authenticity and integrity of your memories. You can create a new capsule if needed.',
  },
  {
    question: "What happens if a recipient's email changes?",
    answer: 'Recipients can update their email address in their account settings. The system will automatically redirect notifications to their new email.',
  },
  {
    question: 'What types of content can I include?',
    answer: 'You can include text, images, audio recordings, videos, and documents. Each capsule supports multiple file formats and provides ample storage.',
  },
  {
    question: 'How do I earn rewards?',
    answer: 'You earn tokens by creating capsules, sharing memories, and engaging with the platform. These tokens can be used to unlock premium features.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-sepia-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about TimeSeal
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white p-4 rounded-lg shadow-vintage flex justify-between items-center"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white px-4 py-3 rounded-b-lg shadow-vintage border-t border-sepia-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}