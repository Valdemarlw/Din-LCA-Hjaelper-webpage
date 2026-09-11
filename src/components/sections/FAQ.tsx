import { Link } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FAQList } from "../ui/FAQList";
import { Reveal, RevealWords } from "../motion/Reveal";
import { getHomepageFaqs } from "../../data/faqs";

const faqs = getHomepageFaqs();

export function FAQ() {
  return (
    <SectionWrapper bg="paper">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <RevealWords as="h2" text="Ofte stillede spørgsmål" className="text-3xl font-bold leading-tight md:text-4xl" />
            <Reveal as="p" delay={0.1} className="mt-4 text-lg text-body">
              Alt hvad du skal vide om LCA-beregning for byggeri i Danmark.
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                to="/faq"
                className="mt-6 inline-block font-semibold text-green underline decoration-green/40 underline-offset-4 transition-colors hover:decoration-green"
              >
                Se alle spørgsmål
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FAQList items={faqs} animate />
        </div>
      </div>
    </SectionWrapper>
  );
}
