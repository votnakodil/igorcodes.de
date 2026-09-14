import { Header } from "@/components/Header/Header";
import { useSeo } from "@/features/seo/useSeo";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";
import { Hero } from "@/sections/Hero/Hero";
import { Projects } from "@/sections/Projects/Projects";
import { Technologies } from "@/sections/Technologies/Technologies";

import { Experience } from "@/sections/Experience/Experience";

export function HomePage() {
    useSeo();

    return (
        <>
            <Header />

            <main>
                <Hero />
                <Projects />
                <About />
                <Experience />
                <Technologies />
                <Contact />
            </main>
        </>
    );
}
