"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Earnings", href: "/earnings" },
    { name: "GKT & Minting", href: "/gkt" },
    { name: "Entertainment", href: "/entertainment" },
    { name: "Auditions", href: "/auditions" },
    { name: "Business Tree", href: "/business-tree" },
];

const Navbar = memo(function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-12 h-20 flex items-center justify-between",
                    isScrolled
                        ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/10 h-[70px]"
                        : "bg-transparent"
                )}
            >
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <span className="text-2xl font-bold font-heading tracking-tighter text-white">
                        GSAA <span className="text-primary-purple">GLOBAL</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-primary-purple to-primary-blue transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden lg:block">
                    <button className="px-7 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 hover:bg-gray-200 transition-all duration-300">
                        Join Now
                    </button>
                </div>

                {/* Mobile/Tablet Menu Button */}
                <button
                    className="lg:hidden relative z-50 text-white p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </header>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
                        className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-bg-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 lg:hidden shadow-2xl sidebar-gradient"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-2xl font-medium text-white hover:text-primary-purple transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-4 px-8 py-3 bg-white text-black rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all"
                        >
                            Join Now
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

export default Navbar;
