import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { VidenPage } from "./pages/VidenPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ProjectTypesPage } from "./pages/ProjectTypesPage";
import { ProjectTypePage } from "./pages/ProjectTypePage";
import { ReferenceProjectsPage } from "./pages/ReferenceProjectsPage";
import { ReferenceProjectPage } from "./pages/ReferenceProjectPage";
import { FAQPage } from "./pages/FAQPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { GlossaryTermPage } from "./pages/GlossaryTermPage";
import { ComparisonPage } from "./pages/ComparisonPage";
import { BR18CheckerPage } from "./pages/BR18CheckerPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/om-os" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/viden" element={<VidenPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/lca-beregning" element={<ProjectTypesPage />} />
            <Route path="/lca-beregning/:slug" element={<ProjectTypePage />} />
            <Route path="/referenceprojekter" element={<ReferenceProjectsPage />} />
            <Route path="/referenceprojekter/:slug" element={<ReferenceProjectPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/ordbog" element={<GlossaryPage />} />
            <Route path="/ordbog/:slug" element={<GlossaryTermPage />} />
            <Route path="/sammenligninger/:slug" element={<ComparisonPage />} />
            <Route path="/vaerktoejer/br18-tjekker" element={<BR18CheckerPage />} />
          </Route>
        </Routes>
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
