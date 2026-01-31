import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, Share2 } from 'lucide-react';

import { blogs } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}



import type { Metadata } from 'next';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Braj Darshan',
    };
  }

  return {
    title: `${blog.title} | Braj Darshan`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}


export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  // ✅ unwrap params safely (Next.js 14+)
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <header className="relative h-95 md:h-120">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-10">
            <div className="max-w-3xl">
              {/* Tags */}
              {blog.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {blog.date}
                </span>

                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {blog.author}
                </span>

                {blog.readingTime && (
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readingTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ===== ARTICLE ===== */}
          <div className="lg:col-span-8">
            <div
              className="
                prose prose-neutral max-w-none
                prose-headings:font-serif
                prose-headings:font-bold
                prose-p:leading-relaxed
                prose-li:leading-relaxed
              "
            >
              {/* Intro */}
              <p className="text-lg text-muted-foreground">
                {blog.excerpt}
              </p>

              {/* Spiritual Context */}
              <div className="my-8 rounded-xl border bg-primary/5 p-6">
                <h3 className="font-serif font-bold text-xl mb-2">
                  Spiritual Significance
                </h3>
                <p>
                  Braj Bhoomi is not merely a region on the map; it is believed to
                  be the eternal playground of Lord Krishna. Every temple, ghat,
                  and forest here carries divine stories passed down through
                  generations of devotees.
                </p>
              </div>

              <h2>Introduction</h2>
              <p>
                Vrindavan and Mathura are living embodiments of devotion. The
                rhythmic chants of “Radhe Radhe”, the ringing of temple bells,
                and the flow of pilgrims create an atmosphere unlike anywhere
                else in the world.
              </p>

              <blockquote>
                “In Braj, devotion is not practiced — it is lived.”
              </blockquote>

              <h2>Why This Place Is Spiritually Important</h2>
              <p>
                According to scriptures, Braj is the land where Krishna’s divine
                pastimes unfolded. Visiting these sacred sites is believed to
                purify the heart and deepen one’s connection with bhakti.
              </p>

              <h2>Key Highlights</h2>
              <ul>
                <li>Ancient temples with centuries-old traditions</li>
                <li>Daily aartis and soulful kirtans</li>
                <li>Festivals celebrated with unmatched devotion</li>
                <li>Simple living and spiritually rich culture</li>
              </ul>

              <h2>Best Time to Visit</h2>
              <p>
                Early mornings offer peaceful darshan, while evenings come alive
                with lamps, music, and devotion. Festivals such as Janmashtami
                and Holi transform Braj into a divine celebration.
              </p>

              <h2>Travel Tips for Devotees</h2>
              <ul>
                <li>Dress modestly and comfortably</li>
                <li>Keep footwear secure near temples</li>
                <li>Avoid peak hours for a calmer experience</li>
                <li>Respect temple customs and photography rules</li>
              </ul>

              <div className="my-10 rounded-xl border bg-accent/10 p-6">
                <h3 className="font-serif font-bold text-xl mb-2">
                  Before You Go
                </h3>
                <ul>
                  <li>Carry cash for donations</li>
                  <li>Stay hydrated, especially in summer</li>
                  <li>Mobile usage may be restricted inside temples</li>
                </ul>
              </div>

              <h2>Final Thoughts</h2>
              <p>
                A journey to Braj is not measured in distance but in inner
                transformation. Whether you arrive as a pilgrim or a traveler,
                the spiritual energy of Braj Darshan leaves a lasting imprint.
              </p>
            </div>

            {/* Share */}
            <div className="mt-10">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="border rounded-xl p-6 bg-card">
              <h3 className="font-serif font-bold text-lg mb-3">
                About the Author
              </h3>
              <p className="text-sm text-muted-foreground">
                {blog.author} writes about spirituality, sacred places, and
                devotional travel experiences across Braj Bhoomi.
              </p>
            </div>

            <div className="border rounded-xl p-6 bg-card">
              <h3 className="font-serif font-bold text-lg mb-3">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
