import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is this Instagram downloader free to use?",
      answer: "Yes, our Instagram downloader is completely free to use. There are no hidden charges, subscription fees, or registration requirements."
    },
    {
      question: "What types of Instagram content can I download?",
      answer: "You can download Instagram photos, videos, reels, and IGTV content. Simply paste the URL of any public Instagram post and download the media instantly."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation required! Our Instagram downloader is web-based and works directly in your browser on any device - desktop, tablet, or mobile."
    },
    {
      question: "Is it safe to use this downloader?",
      answer: "Absolutely! We prioritize your privacy and security. We don't store your URLs, personal information, or downloaded content on our servers."
    },
    {
      question: "Why can't I download some Instagram posts?",
      answer: "You can only download content from public Instagram accounts. Private accounts and stories require the account owner's permission and cannot be downloaded."
    },
    {
      question: "What video quality will I get?",
      answer: "Our downloader preserves the original quality of the Instagram media. You'll get the same quality as posted by the content creator."
    },
    {
      question: "How fast is the download process?",
      answer: "Downloads typically complete within seconds, depending on the file size and your internet connection speed. Our servers are optimized for fast processing."
    },
    {
      question: "Can I download multiple Instagram posts at once?",
      answer: "Currently, our tool processes one URL at a time to ensure optimal performance and reliability. You can download multiple posts by processing them individually."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about using our Instagram downloader
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions? <a href="#contact" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;