import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Family Historian',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: 'TimeSeal has transformed how I preserve our family memories. The platform is intuitive and secure, giving me peace of mind that our legacy will be passed down intact.',
  },
  {
    name: 'Michael Chen',
    role: 'Digital Archivist',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: "As someone who works with digital archives, I appreciate the attention to detail in TimeSeal's security features. It's the perfect blend of accessibility and protection.",
  },
  {
    name: 'Emma Rodriguez',
    role: 'Parent',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    content: 'Creating time capsules for my children has been a beautiful experience. TimeSeal makes it easy to capture these precious moments and share them at just the right time.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust TimeSeal with their precious memories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="card"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}