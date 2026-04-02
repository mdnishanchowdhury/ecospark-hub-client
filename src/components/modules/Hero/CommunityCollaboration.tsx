import React, { useMemo, memo } from "react"
import { ArrowRight, BrainCircuit, Users, BookOpen, ThumbsUp, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type MentorTag = "Eco-Energy Policy" | "Project Management" | "Sustain Impact Investing" | "GreenTech Innovation" | "Urban Tech" | "Scalability" | "CleanWater Solutions";

type Mentor = {
    id: string;
    name: string;
    avatarUrl: string;
    tags: MentorTag[];
    description: string;
    recentProjects: string[];
    likesCount: number;
};

type ProgramId = "pre-seed" | "vertical-farming" | "greentech-schools";

type Program = {
    id: ProgramId;
    title: string;
    description: string;
    icon: React.ReactNode;
    applyUrl: string;
};

type Spotlight = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    impactMetric?: string;
};

const MENTORS_DATA: Mentor[] = [
    {
        id: "dr-aris-thoms",
        name: "Dr. Aris Thoms",
        avatarUrl: "/avatar-mentor-1.jpg",
        tags: ["Eco-Energy Policy", "Project Management"],
        description: "Specializing in AI-driven precision agriculture, sustainable farming techniques, and tech-for-good initiatives.",
        recentProjects: ["AgriSave - Smart Water"],
        likesCount: 12
    },
    {
        id: "sarah-lee",
        name: "Sarah Lee",
        avatarUrl: "/avatar-mentor-2.jpg",
        tags: ["Sustain Impact Investing", "GreenTech Innovation"],
        description: "Focus on early-stage VC funding for clean tech startups and scaling social impact ventures.",
        recentProjects: ["Eco-Pack Hub", "Urban Farm"],
        likesCount: 18
    },
];

const PROGRAMS_DATA: Program[] = [
    { id: "pre-seed", title: "Pre-Seed Accelerator", description: "Ongoing mentorship program, pre-seed accelerator.", icon: <BrainCircuit />, applyUrl: "#apply-preseed" },
    { id: "vertical-farming", title: "Vertical farming Cohort", description: "Program promoting vertical urban farming innovation and planning and ideas.", icon: <BookOpen />, applyUrl: "#apply-farming" },
    { id: "greentech-schools", title: "GreenTech for Schools", description: "Mentorship for teachers, resources, and innovation in schools.", icon: <Users />, applyUrl: "#apply-schools" },
];

const SPOTLIGHTS_DATA: Spotlight[] = [
    { id: "biofuel", title: "From Co-founders to a Team of 30: Bio-Fuel", description: "A story of community scale from our early co-founding days.", imageUrl: "https://i.ibb.co.com/39Pqbcfz/d8064ce6.jpg" },
];


const MentorCard = memo(({ mentor }: { mentor: Mentor }) => {
    const { name, avatarUrl, tags, description, recentProjects, likesCount } = mentor;

    const initials = useMemo(() => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }, [name]);

    const projectsList = useMemo(() => {
        return recentProjects.join(', ');
    }, [recentProjects]);

    return (
        <Card className="shadow-lg border-neutral-100/50 hover:shadow-xl transition-shadow bg-white/95 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500/10"></div>

            <CardHeader className="p-5 flex flex-row items-center gap-4 relative z-10">
                <Avatar className="h-16 w-16 border-2 border-emerald-100 shadow-inner">
                    <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
                    <AvatarFallback className="bg-emerald-50 text-emerald-900 font-bold">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                    <CardTitle className="text-xl font-extrabold text-neutral-950 tracking-tight">{name}</CardTitle>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100 text-xs py-0 px-2 font-medium">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="text-xs font-semibold text-neutral-500 text-right self-start mt-1 flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-neutral-400">Mentor</span> | <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> {likesCount}
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 relative z-10">
                <p className="text-neutral-700 text-sm leading-relaxed line-clamp-3">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-xs text-neutral-600 relative z-10">
                <div className="font-medium">Recent Projects:</div>
                <div className="font-bold text-neutral-800">{projectsList}</div>
            </CardFooter>
        </Card>
    );
});
MentorCard.displayName = "MentorCard";


const ProgramCard = memo(({ program }: { program: Program }) => {
    const { title, description, icon, applyUrl } = program;

    return (
        <div className="flex items-start gap-4 p-5 border border-neutral-100 rounded-2xl bg-white/95 hover:border-emerald-200 hover:shadow-md transition-all group">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-700 border border-emerald-100 shadow-inner flex-shrink-0 mt-1 transition-colors group-hover:bg-emerald-100">
                {React.cloneElement(icon as React.ReactElement)}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg text-neutral-950 tracking-tight">{title}</h4>
                <p className="text-sm text-neutral-600 leading-snug line-clamp-2 mt-0.5">{description}</p>
            </div>
            <Button asChild variant="outline" size="sm" className="ml-auto text-emerald-800 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 font-semibold text-xs py-1 h-8">
                <a href={applyUrl}>Apply Now</a>
            </Button>
        </div>
    );
});
ProgramCard.displayName = "ProgramCard";


const SpotlightCard = memo(({ spotlight }: { spotlight: Spotlight }) => {
    const { title, description, imageUrl, impactMetric } = spotlight;

    return (
        <Card className="grid grid-cols-[100px_1fr] gap-4 p-4 border border-neutral-100 rounded-2xl bg-white/95 hover:shadow-xl transition-shadow overflow-hidden group">
            <div className="w-[100px] h-[75px] rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                    src={imageUrl}
                    alt={`Thumbnail for ${title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {impactMetric && (
                    <Badge className="absolute bottom-1 right-1 text-[10px] text-white bg-emerald-700 font-medium px-1.5 py-0 border-none">Impact: {impactMetric}</Badge>
                )}
            </div>
            <div className="flex flex-col justify-center">
                <h5 className="font-bold text-neutral-950 line-clamp-1 group-hover:text-emerald-800 transition-colors">{title}</h5>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-tight">{description}</p>
            </div>
        </Card>
    );
});
SpotlightCard.displayName = "SpotlightCard";


export default function CommunityCollaboration() {
    const mentors = useMemo(() => MENTORS_DATA, []);
    const programs = useMemo(() => PROGRAMS_DATA, []);
    const spotlights = useMemo(() => SPOTLIGHTS_DATA, []);

    return (
        <section id="community-collaboration" className="py-5 relative overflow-hidden bg-[#fdfdfd]">

            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-100/30 blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <header className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 text-cyan-800 border-cyan-200 bg-cyan-50 font-semibold px-4 py-1 text-xs">COMMUNITY & COLLABORATION</Badge>
                    <h1 className="text-6xl font-extrabold tracking-tighter text-neutral-950 mb-4 leading-[0.95]">
                        Meet Our <span className="text-emerald-700">Community & Mentors</span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Connect with leaders, find co-founders, and scale your ideas together. Your spark needs the right environment to flourish.
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr_2.2fr] gap-10 items-start">

                    {/* Column 1: Featured Mentors */}
                    <section className="space-y-15">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950">Featured Mentors</h2>
                            <Button asChild variant="link" className="text-emerald-700 hover:text-emerald-900 text-sm p-0 gap-2 font-semibold">
                                <a href="#see-all-mentors">
                                    See All <ArrowRight className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                        <div className="space-y-8">
                            {mentors.map(mentor => (
                                <MentorCard key={mentor.id} mentor={mentor} />
                            ))}
                        </div>
                    </section>

                    {/* Column 2: Global Network Centerpiece */}
                    <Card id="join-network" className="bg-[#1b1b1b] text-white rounded-[2rem] flex flex-col items-center p-10 gap-8 lg:mt-1 relative overflow-hidden h-full border-none">
                        <div className="w-full h-auto max-w-[220px] relative pointer-events-none">
                            <img src="/world-network-map.png" alt="" className="w-full h-auto opacity-80" />
                            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
                        </div>

                        <CardTitle className="text-3xl font-extrabold text-center leading-[1.1] tracking-tight">
                            Join our <span className="text-emerald-300">Global</span> Network
                        </CardTitle>
                        <p className="text-center text-neutral-300 text-sm leading-relaxed px-2">
                            Connect with innovators worldwide and make a lasting global impact.
                        </p>
                        <CardFooter className="p-0 mb-3 w-full mt-auto">
                            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2.5 h-12 text-base rounded-xl shadow-lg">
                                <Link href="/login">
                                    <Users className="w-5 h-5" />
                                    Join Now
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="space-y-16">
                        <section id="mentorship-programs" className="space-y-10">
                            <h3 className="text-3xl font-extrabold tracking-tight text-neutral-950">Mentorship Programs</h3>
                            <div className="space-y-6">
                                {programs.map(program => (
                                    <ProgramCard key={program.id} program={program} />
                                ))}
                            </div>
                        </section>

                        {/* Community Spotlights Subsection */}
                        <section id="community-spotlights" className="space-y-10">
                            <h3 className="text-3xl font-extrabold tracking-tight text-neutral-950">Community Spotlights</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                                {spotlights.map(spotlight => (
                                    <SpotlightCard key={spotlight.id} spotlight={spotlight} />
                                ))}
                            </div>
                        </section>

                    </div>

                </div>

            </div>
        </section>
    );
}