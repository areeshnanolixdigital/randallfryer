import { notFound } from "next/navigation";
import NewsDetailPage from "@/sections/pages/NewsDetailPage";
import { POSTS, getPost } from "@/data/news";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Post not found" };
  return { title: p.title, description: p.excerpt };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();
  return <NewsDetailPage post={post} />;
}
