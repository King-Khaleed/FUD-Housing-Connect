
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Search, Heart, Scale, Bot, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const faqs = [
    {
        question: "How do I search for properties?",
        answer: "On the 'Properties' page, you can use the search bar to look for listings by name or area. Use the filters on the sidebar (or in the 'Filters' sheet on mobile) to narrow down your results by price, room type, distance from campus, and specific amenities.",
        icon: Search
    },
    {
        question: "How do I contact an agent?",
        answer: "On each property details page, you'll find a 'Contact via WhatsApp' button. Clicking this will open WhatsApp with a pre-filled message to the agent, making it easy to inquire about the property or schedule a visit.",
        icon: Phone
    },
    {
        question: "How do I save and compare properties?",
        answer: "Click the heart icon on any property card to save it to your favorites. To compare, click the 'Add to Compare' button. Your saved properties are on the 'Saved' page, and you can view your comparison list in the floating bar at the bottom of the screen.",
        icon: Heart
    },
    {
        question: "What does the 'Verified' badge mean?",
        answer: "The 'Verified' badge indicates that the agent has undergone our screening process. We verify their identity and confirm their legitimacy to ensure you are dealing with a trustworthy source. This helps protect you from scams.",
        icon: CheckCircle
    },
    {
        question: "How does the AI Assistant work?",
        answer: "Our AI Assistant on the 'AI Assistant' page helps you find properties through conversation. Just tell it what you're looking for—your budget, preferred room type, amenities, etc.—and it will ask clarifying questions and then recommend properties from our listings that match your needs.",
        icon: Bot
    }
];


export default function HelpPage() {
  return (
    <div className="container mx-auto py-12">
        <section className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
                Help & Support
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Your guide to using FUD Housing Connect. Find answers to common questions below.
            </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold font-headline mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg text-left">
                                <div className="flex items-center gap-4">
                                    <faq.icon className="h-5 w-5 text-primary" />
                                    <span>{faq.question}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base pl-10">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Step-by-step Guides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex items-start gap-4">
                           <div className="w-24 h-16 bg-muted rounded-md flex-shrink-0">
                             <Image src="https://placehold.co/100x65.png" alt="Search screenshot" width={100} height={65} className="rounded-md object-cover" data-ai-hint="website search bar" />
                           </div>
                           <div>
                               <h4 className="font-semibold">Finding a Property</h4>
                               <p className="text-sm text-muted-foreground">Use filters on the properties page to find your ideal match quickly.</p>
                           </div>
                       </div>
                       <div className="flex items-start gap-4">
                           <div className="w-24 h-16 bg-muted rounded-md flex-shrink-0">
                             <Image src="https://placehold.co/100x65.png" alt="Save property screenshot" width={100} height={65} className="rounded-md object-cover" data-ai-hint="website favorite button" />
                           </div>
                           <div>
                               <h4 className="font-semibold">Saving & Comparing</h4>
                               <p className="text-sm text-muted-foreground">Click the heart to save, or the compare button to see properties side-by-side.</p>
                           </div>
                       </div>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Contact Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">If you can't find the answer you're looking for, please reach out to us.</p>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href="mailto:support@fudhousing.com" className="hover:underline">support@fudhousing.com</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span>+234-123-456-7890</span>
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    </div>
  );
}
