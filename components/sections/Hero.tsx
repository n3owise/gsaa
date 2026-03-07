"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowDown, Mouse } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "@/components/magicui/globe";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
    "Entertainment",
    "Shopping",
    "Travelling",
];

function Typewriter() {
    const [displayText, setDisplayText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = WORDS[phraseIndex];
        let timeout: any;

        if (!isDeleting && charIndex < currentWord.length) {
            timeout = setTimeout(() => {
                setDisplayText(currentWord.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 60);
        } else if (!isDeleting && charIndex === currentWord.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplayText(currentWord.slice(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, 30);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % WORDS.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, phraseIndex]);

    return <span>{displayText}</span>;
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.3 },
            );

            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" },
                { opacity: 1, clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)", duration: 2, ease: "steps(30)" },
                "-=0.2"
            );

            tl.fromTo(
                ctaRef.current,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.5"
            );

            gsap.to(scrollRef.current, {
                y: 10,
                opacity: 0.5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    if (self.progress > 0.1) {
                        gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
                            opacity: 1 - self.progress * 3,
                            y: -50 * self.progress,
                            overwrite: true
                        })
                    }
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg-dark"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222222_0%,#000000_70%)] opacity-80 z-0" />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-28 md:pt-32 lg:pt-36">
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold font-heading leading-tight tracking-tight opacity-0"
                >
                    <span className="bg-gradient-to-br from-white via-white/80 to-white/50 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-flow">
                        GSAA GLOBAL
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl font-body text-text-gray tracking-wide uppercase opacity-0 h-[2em]"
                >
                    <Typewriter />{" Meets Rewards"}
                </p>

                <button
                    ref={ctaRef}
                    className="mt-8 md:mt-12 px-8 md:px-12 py-3 md:py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg hover:scale-105 hover:bg-gray-200 transition-all duration-300 opacity-0 relative z-20"
                >
                    Explore the Future
                </button>

                <div className="relative w-full max-w-[500px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] aspect-square mt-[-80px] sm:mt-[-100px] md:mt-[-130px] lg:mt-[-150px] pointer-events-none self-center z-0">
                    <Globe />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80"
            >
                <div className="w-[28px] h-[44px] border-2 border-white/40 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-wheel" />
                </div>
                <span className="text-xs text-white/50 tracking-widest uppercase">Scroll to explore</span>
            </div>
        </section>
    );
}
