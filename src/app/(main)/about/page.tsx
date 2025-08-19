
import { Building2, Users, ShieldCheck, TrendingUp, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { properties, agents } from '@/lib/data';
import Image from 'next/image';

const StatCard = ({ icon: Icon, title, value, description }: { icon: React.ElementType, title: string, value: string | number, description: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const teamMembers = [
    { name: "John Doe", role: "Lead Developer", image: "https://placehold.co/100x100.png" },
    { name: "Jane Smith", role: "UI/UX Designer", image: "https://placehold.co/100x100.png" },
    { name: "Sam Wilson", role: "Project Manager", image: "https://placehold.co/100x100.png" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="space-y-12">
        
        <section className="text-center">
            <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
                About FUD Housing Connect
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Bridging the gap between students and trusted off-campus housing near Federal University Dutse.
            </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline">Our Mission</h2>
            <p className="text-muted-foreground">
              Finding a comfortable, safe, and affordable place to live is crucial for academic success. FUD Housing Connect was born out of the need to simplify the stressful process of searching for off-campus accommodation for students of Federal University Dutse (FUD).
            </p>
            <p className="text-muted-foreground">
              Our platform connects students directly with verified landlords and agents, providing a transparent and secure environment to find the perfect home away from home. We are committed to eliminating the hassles of house-hunting, so students can focus on what truly matters: their education.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image 
                src="https://placehold.co/600x400.png"
                alt="FUD Campus"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="university campus students"
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold font-headline text-center mb-8">Our Platform by the Numbers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Building2} title="Total Properties" value={properties.length} description="Available listings and growing" />
            <StatCard icon={Users} title="Registered Agents" value={agents.length} description="Verified and basic agents" />
            <StatCard icon={ShieldCheck} title="Verified Listings" value={properties.filter(p => p.verified).length} description="Properties you can trust" />
            <StatCard icon={TrendingUp} title="Total Views" value={properties.reduce((acc, p) => acc + p.views, 0).toLocaleString()} description="Across all properties" />
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-headline text-center mb-8">The Agent Verification Process</h2>
          <div className="max-w-3xl mx-auto text-center text-muted-foreground">
             <p>
                Trust is the cornerstone of our platform. Every agent with a 'Verified' or 'Premium' badge has undergone a screening process to ensure they are legitimate and reliable. This helps protect students from potential scams and ensures a higher quality of service. We check for valid identification and proof of property ownership or management rights.
            </p>
          </div>
        </section>
        
        <section>
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {teamMembers.map(member => (
                    <div key={member.name} className="flex flex-col items-center">
                        <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={member.image} alt={member.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Get in Touch</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-6">Have questions, feedback, or want to partner with us? We'd love to hear from you.</p>
            <div className="flex justify-center items-center gap-8">
                <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:support@fudhousing.com" className="hover:underline">support@fudhousing.com</a>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+234-123-456-7890</span>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
