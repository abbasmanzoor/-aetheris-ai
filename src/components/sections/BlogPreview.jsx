import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const blogPosts = [
  {
    id: 1,
    title: 'Introducing Neural Mesh 2.0',
    excerpt: 'Our latest update brings quantum-inspired algorithms to the edge, reducing latency by 60%.',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    date: 'June 28, 2026',
  },
  {
    id: 2,
    title: 'The Future of Enterprise AI',
    excerpt: 'How autonomous agents are reshaping the way businesses operate in the digital age.',
    category: 'Insights',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=400&fit=crop',
    date: 'June 25, 2026',
  },
  {
    id: 3,
    title: 'Aetheris Secures $50M Series B',
    excerpt: 'New funding to accelerate research and development of next-gen neural infrastructure.',
    category: 'News',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop',
    date: 'June 20, 2026',
  },
];

const categoryColors = {
  Product: 'bg-primary/20 text-primary',
  Insights: 'bg-tertiary/20 text-tertiary',
  News: 'bg-secondary/20 text-secondary',
};

export const BlogPreview = () => {
  return (
    <section id="blog" className="py-2xl relative z-10">
      <Container>
        <SectionHeading
          title="Latest from the Lab"
          subtitle="Insights, product updates, and news from the Aetheris team."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-surface rounded-2xl overflow-hidden hover-lift group"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-lg">
                <div className="flex items-center justify-between mb-sm">
                  <span className={`text-xs font-bold px-sm py-xs rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-on-surface-variant/50">{post.date}</span>
                </div>

                <h3 className="font-headline-lg text-headline-lg mb-sm line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-on-surface-variant text-body-md mb-md line-clamp-2">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => alert(`Reading: ${post.title}`)}
                  className="text-primary font-bold text-body-md hover:gap-2 transition-all inline-flex items-center gap-1 group"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};