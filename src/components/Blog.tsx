import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionTitle } from "./ui/SectionElements";
import { animationProps } from "../utils/styleUtils";

const Blog = () => {
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    // En una implementación real, aquí listarías los posts
    // y cargarías uno basado en la URL o la selección del usuario.
    // Por ahora, cargaremos directamente el post de ejemplo.
    fetch("/content/blog/hello-world.md")
      .then((res) => res.text())
      .then((text) => setPostContent(text));
  }, []);

  return (
    <section
      id="blog"
      className="relative px-4 py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <SectionTitle
          badge="Mi Diario"
          subtitle="Aquí comparto mis ideas, aprendizajes y el detrás de cámaras de mis proyectos."
        >
          Blog Técnico
        </SectionTitle>

        <motion.div
          {...animationProps.fadeInUp(0.2)}
          className="prose prose-invert max-w-none p-8 bg-white/5 backdrop-blur-sm border border-white/5 dark:border-purple-900/10 rounded-2xl shadow-lg dark:shadow-purple-900/10"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postContent}
          </ReactMarkdown>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
