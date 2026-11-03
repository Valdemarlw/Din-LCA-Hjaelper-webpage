import { Link } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FAQList } from "../ui/FAQList";
import { getHomepageFaqs } from "../../data/faqs";

const faqs = getHomepageFaqs();

export function FAQ() {
  return (
    <SectionWrapper bg="paper">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-[2.25rem] leading-[1.05] md:text-[3rem]">Ofte stillede spørgsmål</h2>
            <p className="mt-4 text-lg text-body">
              Alt hvad du skal vide om LCA-beregning for byggeri i Danmark.
            </p>
            <div>
              <Link
                to="/faq"
                className="mt-6 inline-block font-semibold text-green underline decoration-spark/70 underline-offset-4 transition-colors hover:decoration-spark"
              >
                Se alle spørgsmål
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FAQList items={faqs} animate />
        </div>
      </div>
    </SectionWrapper>
  );
}
