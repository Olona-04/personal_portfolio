import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Download,
  GraduationCap,
  Award,
  Briefcase,
  CheckCircle2,
  Copy,
  Send,
  Sparkles,
  Layers,
  Code2,
  Eye,
  Rocket
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'work' | 'school';
  description: string;
  image?: string;
  isSvg?: boolean;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  figmaUrl?: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: 'agribot',
    title: 'AgriBot: AI Chatbot for Small-Scale Farmers',
    category: 'work',
    description:
      'A chatbot that lets farmers describe a crop problem in everyday language. It asks up to three focused questions, then gives a likely cause with prevention tips and refers critical cases to an advisor. Built by Transformers Group, a team of 5.',
    image: '/images/agribot.jpg',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'OpenAI API', 'MongoDB'],
    liveUrl: 'https://agribot-silk.vercel.app'
  },
  {
    id: 'moodspark',
    title: 'MoodSpark: AI Sentiment Analysis',
    category: 'work',
    description:
      'A mood and sentiment app that turns words into actionable insights. Features dual in-browser engines (VADER & transformer model) plus a daily mood journal comparing self-reported emotional valence to natural language sentiment.',
    image: '/images/moodspark.jpg',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'VADER', 'NLP'],
    liveUrl: 'https://sentimentai-2.ai.studio'
  },
  {
    id: 'content-gen',
    title: 'Content Generator & Social Publisher',
    category: 'work',
    description:
      'An AI app that generates text, code, or images from prompts, enables tone and color palette selection, suggests trending hashtags, and coordinates publication across social channels.',
    image: '/images/content-generator.jpg',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Vercel'],
    liveUrl: 'https://content-generator-social-publisher.ai.studio'
  },
  {
    id: 'thrift',
    title: 'Thrifting E-Commerce Website',
    category: 'school',
    description:
      'A responsive thrift clothing e-commerce web platform. Built the PHP backend functionality, dynamic product display queries, and MySQL database connectivity for persistent catalog management.',
    isSvg: true,
    tags: ['HTML', 'CSS', 'Java', 'PHP', 'MySQL'],
    codeUrl: 'https://github.com/Olona-04'
  },
  {
    id: 'nsfas',
    title: 'NSFAS Mobile App Redesign',
    category: 'school',
    description:
      'An interactive Figma prototype crafted to make South African student funding effortless to navigate. Covers authentication, document uploads, application status tracking, and allowance management.',
    image: '/images/nsfas.jpg',
    tags: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'User-Centred Design'],
    figmaUrl: 'https://www.figma.com/design/XaPGadSKxAlvpft8yqSceh/Multimedia-Term-3?node-id=0-1&p=f&t=83lXfYdSV1BZFWle-0'
  }
];

const CERTIFICATES: Certificate[] = [
  {
    title: 'Artificial Intelligence Bootcamp (AI)',
    issuer: 'Capaciti · Coursera',
    date: 'Completed September 2026',
    image: '/images/cert-ai-bootcamp.jpg',
    verifyUrl: 'https://coursera.org/share/e7cc78e7b51b9da41e132e753f55fa02'
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Capaciti · Coursera',
    date: 'Completed October 2026',
    image: '/images/cert-google-ai-essentials.jpg',
    verifyUrl: 'https://coursera.org/share/3f18d3e6a44a4fd18144ec9720837d6a'
  },
  {
    title: 'Professional Development',
    issuer: 'Capaciti · Coursera',
    date: 'Completed October 2026',
    image: '/images/cert-professional-development.jpg',
    verifyUrl: 'https://coursera.org/share/ef90d2ef4794aa27db409a103cb2d9ea'
  }
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'work' | 'school'>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showVercelModal, setShowVercelModal] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Initialize theme
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        const initialTheme = prefersLight ? 'light' : 'dark';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // storage unavailable
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${formName}`);
    const body = encodeURIComponent(`${formMessage}\n\nFrom: ${formName} (${formEmail})`);
    const mailtoUrl = `mailto:olonawilliams04@gmail.com?subject=${subject}&body=${body}`;

    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();

    setFormStatus('Opening your default email app. Press Send there to deliver your message!');
  };

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen text-[var(--ink)] bg-[var(--bg)] selection:bg-[var(--accent)] selection:text-[var(--on-accent)] relative">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)] transition-colors">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">
          <a href="#home" className="text-xl font-bold tracking-wider hover:opacity-90 flex items-center gap-0.5">
            <span>OLONA WILLIAMS</span>
            <span className="font-serif-italic text-2xl text-[var(--accent)]">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-[14.5px] text-[var(--muted)]">
            <a href="#about" className="hover:text-[var(--ink)] transition-colors">About</a>
            <a href="#skills" className="hover:text-[var(--ink)] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[var(--ink)] transition-colors">Projects</a>
            <a href="#education" className="hover:text-[var(--ink)] transition-colors">Education</a>
            <a href="#certificates" className="hover:text-[var(--ink)] transition-colors">Certificates</a>
            <a href="#experience" className="hover:text-[var(--ink)] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[var(--ink)] transition-colors">Contact</a>
            
            <button
              onClick={() => setShowCvModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--glow)] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              CV
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-md hover:brightness-110 transition-all"
            >
              💬 Message
            </a>

            <button
              onClick={() => setShowVercelModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] transition-all"
              title="Vercel Deployment Guide"
            >
              <Rocket className="w-3.5 h-3.5 text-[var(--accent)]" />
              Deploy
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center hover:border-[var(--accent)] transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg)] border-b border-[var(--line)] px-6 py-4 flex flex-col gap-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              Projects
            </a>
            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              Education
            </a>
            <a
              href="#certificates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              Certificates
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              Experience
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[var(--muted)] hover:text-[var(--ink)] py-1"
            >
              Contact
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowCvModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--accent)] text-[var(--accent)] font-medium text-sm"
              >
                <FileText className="w-4 h-4" /> View &amp; Download CV
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowVercelModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--surface2)] text-[var(--ink)] border border-[var(--line)] font-medium text-sm"
              >
                <Rocket className="w-4 h-4 text-[var(--accent)]" /> Vercel Deployment Guide
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* HERO SECTION */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] text-sm mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse" />
                <span>Open to internships and junior roles</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-4">
                Olona Metia{' '}
                <span className="gradient-accent font-serif-italic block sm:inline">
                  Williams.
                </span>
              </h1>

              {/* Sub-headline */}
              <div className="text-lg sm:text-xl text-[var(--muted)] mb-5">
                IT student · <strong className="text-[var(--ink)] font-semibold">Aspiring Software Engineer</strong> · Application Developer · UI/UX
              </div>

              {/* Bio */}
              <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                Final-year IT student at CPUT who builds{' '}
                <strong className="text-[var(--accent)] font-medium">web apps</strong> and designs{' '}
                <strong className="text-[var(--accent2)] font-medium">app interfaces</strong>, from the PHP and MySQL behind an e-commerce store to the Figma screens people tap.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-[0_8px_30px_var(--glow)] hover:opacity-95 transition-all"
                >
                  <Layers className="w-4 h-4" />
                  View projects
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--ink)] transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Contact me
                </a>

                <button
                  onClick={() => setShowCvModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--ink)] transition-all"
                >
                  <FileText className="w-4 h-4 text-[var(--accent)]" />
                  CV Preview
                </button>

                <a
                  href="/OLONA_WILLIAMS_CV.pdf"
                  download="Olona_Williams_CV.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] transition-all"
                  title="Direct PDF download"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </a>
              </div>
            </div>

            {/* Right Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl border border-[var(--line)] overflow-hidden shadow-2xl bg-gradient-to-br from-[var(--surface2)] to-[var(--surface)] group">
                <img
                  src="/images/olona.jpg"
                  alt="Olona Metia Williams"
                  className="w-full h-full object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--line)] rounded-2xl p-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-[var(--ink)]">Olona Williams</div>
                    <div className="text-[var(--muted)]">Final-year · App Dev · CPUT</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-medium text-xs">
                    Cape Town
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
              <span className="w-7 h-[2px] bg-[var(--accent)]" />
              ABOUT
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold mb-10 tracking-tight">
              Building things that <span className="font-serif-italic gradient-accent">work</span> and feel good to use.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Narrative */}
              <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                <p>
                  I'm a final-year Information Technology (Application Development) student at Cape Peninsula University of Technology. I like turning an idea into something people can use, from the database underneath to the screen on top.
                </p>
                <p>
                  My projects have covered both sides of modern computing: building dynamic PHP backends and MySQL connections for an e-commerce thrift platform, crafting interactive Figma prototypes for student funding applications, and engineering AI-grounded apps using React, TypeScript, Next.js, and Node.js.
                </p>
                <p>
                  I'm seeking an internship or junior software developer role where I can contribute to real-world user value, collaborate with supportive mentors, and continuously ship clean, robust code.
                </p>
              </div>

              {/* Quick Fact Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 sm:p-5">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1 uppercase">Studying</div>
                  <div className="font-medium text-sm sm:text-base text-[var(--ink)]">National Diploma, IT</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">Application Development (CPUT)</div>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 sm:p-5">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1 uppercase">Completed</div>
                  <div className="font-medium text-sm sm:text-base text-[var(--ink)]">Higher Certificate, ICT</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">CPUT · 2024</div>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 sm:p-5">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1 uppercase">Based in</div>
                  <div className="font-medium text-sm sm:text-base text-[var(--ink)]">Kraaifontein, Cape Town</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">Western Cape, South Africa</div>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 sm:p-5">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1 uppercase">Status</div>
                  <div className="font-medium text-sm sm:text-base text-[var(--accent)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Open to work
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">Internship / Junior Developer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
              <span className="w-7 h-[2px] bg-[var(--accent)]" />
              SKILLS
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold mb-3 tracking-tight">
              What I work <span className="font-serif-italic gradient-accent">with.</span>
            </h2>
            <p className="text-[var(--muted)] text-base mb-10 max-w-xl">
              Languages, frameworks, design systems, and developer tools applied in coursework, capstone projects, and AI prototypes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Programming Languages */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
                  &lt;/&gt;
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--ink)]">Programming Languages</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'PHP', 'SQL'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)]">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frameworks & Libraries */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
                  ⚛
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--ink)]">Frameworks &amp; Libraries</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {['React', 'Next.js', 'Node.js & Express', 'Tailwind CSS', 'Vite'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)]">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Web & Databases */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
                  DB
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--ink)]">Web &amp; Databases</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {['HTML5 & Semantic Markup', 'CSS3 & Modern Layouts', 'MySQL / Relational DBs', 'MongoDB', 'Database Connectivity'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)]">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* UI/UX Design */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
                  UI
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--ink)]">UI / UX Design</h3>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {['Figma Wireframing', 'Interactive Prototyping', 'User-Centred Design', 'Component Design Systems', 'Mobile-First Responsive UX'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)]">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Workflow */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all group lg:col-span-2">
                <div className="w-11 h-11 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-4 group-hover:scale-110 transition-transform">
                  Git
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--ink)]">Tools, Cloud &amp; Methodology</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--muted)]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)]">›</span> Git Version Control &amp; GitHub</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)]">›</span> Vercel Cloud Deployment</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)]">›</span> RESTful APIs &amp; OpenAI Integration</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)]">›</span> AI-assisted Development Workflows</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)]">›</span> Cross-functional Team Collaboration</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)]">›</span> Problem Solving &amp; Debugging</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
              <span className="w-7 h-[2px] bg-[var(--accent)]" />
              PROJECTS
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl sm:text-5xl font-bold mb-3 tracking-tight">
                  Selected <span className="font-serif-italic gradient-accent">work.</span>
                </h2>
                <p className="text-[var(--muted)] text-base max-w-xl">
                  Projects built for live industry tools and academic coursework at CPUT.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] font-semibold'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  All ({PROJECTS.length})
                </button>
                <button
                  onClick={() => setActiveCategory('work')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === 'work'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] font-semibold'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  Work Apps (3)
                </button>
                <button
                  onClick={() => setActiveCategory('school')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === 'school'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] font-semibold'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  CPUT Studies (2)
                </button>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl overflow-hidden flex flex-col hover:border-[var(--accent)] transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="h-52 bg-[var(--surface2)] overflow-hidden relative border-b border-[var(--line)]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : project.isSvg ? (
                      <div className="w-full h-full flex items-center justify-center bg-[var(--surface2)] p-4">
                        <svg viewBox="0 0 400 210" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                          <rect width="400" height="210" fill="var(--surface2)"/>
                          <rect x="0" y="0" width="400" height="38" fill="var(--surface)"/>
                          <line x1="0" y1="38" x2="400" y2="38" stroke="var(--line)"/>
                          <text x="20" y="25" fontSize="16" fontWeight="700" fontFamily="Space Grotesk,sans-serif" fill="var(--ink)">thrift.</text>
                          <rect x="300" y="14" width="26" height="10" rx="5" fill="var(--line)"/>
                          <rect x="334" y="14" width="46" height="10" rx="5" fill="var(--accent)"/>
                          <g transform="translate(12,56)">
                            <rect width="104" height="132" rx="12" fill="var(--surface)" stroke="var(--line)"/>
                            <rect x="8" y="8" width="88" height="70" rx="8" fill="var(--surface2)"/>
                            <polygon points="34,22 46,16 58,16 70,22 80,34 70,40 64,34 64,66 40,66 40,34 34,40 24,34" fill="var(--accent)"/>
                            <rect x="10" y="88" width="62" height="7" rx="3.5" fill="var(--line)"/>
                            <rect x="10" y="102" width="44" height="18" rx="9" fill="var(--accent)"/>
                            <text x="32" y="115" fontSize="10" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fill="var(--on-accent)">R120</text>
                          </g>
                          <g transform="translate(148,56)">
                            <rect width="104" height="132" rx="12" fill="var(--surface)" stroke="var(--line)"/>
                            <rect x="8" y="8" width="88" height="70" rx="8" fill="var(--surface2)"/>
                            <polygon points="34,22 46,16 58,16 70,22 80,34 70,40 64,34 64,66 40,66 40,34 34,40 24,34" fill="var(--accent2)"/>
                            <rect x="10" y="88" width="62" height="7" rx="3.5" fill="var(--line)"/>
                            <rect x="10" y="102" width="44" height="18" rx="9" fill="var(--accent)"/>
                            <text x="32" y="115" fontSize="10" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fill="var(--on-accent)">R120</text>
                          </g>
                          <g transform="translate(284,56)">
                            <rect width="104" height="132" rx="12" fill="var(--surface)" stroke="var(--line)"/>
                            <rect x="8" y="8" width="88" height="70" rx="8" fill="var(--surface2)"/>
                            <polygon points="34,22 46,16 58,16 70,22 80,34 70,40 64,34 64,66 40,66 40,34 34,40 24,34" fill="var(--muted)"/>
                            <rect x="10" y="88" width="62" height="7" rx="3.5" fill="var(--line)"/>
                            <rect x="10" y="102" width="44" height="18" rx="9" fill="var(--accent)"/>
                            <text x="32" y="115" fontSize="10" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fill="var(--on-accent)">R120</text>
                          </g>
                        </svg>
                      </div>
                    ) : null}

                    {/* Category pill */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[var(--bg)]/90 backdrop-blur-md border border-[var(--line)] text-[var(--accent)]">
                        {project.category === 'work' ? 'Work Project' : 'CPUT Project'}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[var(--ink)] leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-[var(--surface2)] text-[12px] text-[var(--muted)] border border-[var(--line)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-3 border-t border-[var(--line)]/60 text-sm font-semibold">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                      {project.figmaUrl && (
                        <a
                          href={project.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                        >
                          <Eye className="w-3.5 h-3.5" /> View in Figma
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--ink)]"
                        >
                          <Github className="w-3.5 h-3.5" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATES */}
        <section id="education" className="py-20 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
              <span className="w-7 h-[2px] bg-[var(--accent)]" />
              EDUCATION
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold mb-10 tracking-tight">
              Where I've <span className="font-serif-italic gradient-accent">studied.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 flex gap-4 items-start hover:border-[var(--accent)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink)]">National Diploma, IT</h3>
                  <p className="text-sm text-[var(--accent)] font-medium">Application Development · CPUT</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Currently enrolled (final year)</p>
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 flex gap-4 items-start hover:border-[var(--accent)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink)]">Higher Certificate, ICT</h3>
                  <p className="text-sm text-[var(--accent)] font-medium">Cape Peninsula University of Tech</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Completed 2024</p>
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 flex gap-4 items-start hover:border-[var(--accent)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--ink)]">Matric (Grade 12)</h3>
                  <p className="text-sm text-[var(--accent)] font-medium">Bernadino Heights High School</p>
                  <p className="text-xs text-[var(--muted)] mt-1">Completed 2020</p>
                </div>
              </div>
            </div>

            {/* CERTIFICATES */}
            <div id="certificates">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
                <span className="w-7 h-[2px] bg-[var(--accent)]" />
                CERTIFICATES
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold mb-10 tracking-tight">
                My <span className="font-serif-italic gradient-accent">certificates.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CERTIFICATES.map((cert) => (
                  <div
                    key={cert.title}
                    className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 hover:border-[var(--accent)] transition-all text-center sm:text-left"
                  >
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="shrink-0 group relative cursor-pointer"
                      title="Click to view badge"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-24 h-24 rounded-full object-cover bg-white border-2 border-[var(--line)] group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                        <Eye className="w-5 h-5" />
                      </span>
                    </button>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--ink)] leading-snug mb-1">
                        {cert.title}
                      </h3>
                      <div className="text-xs font-semibold text-[var(--accent)] mb-1">
                        {cert.issuer}
                      </div>
                      <div className="text-xs text-[var(--muted)] mb-3">
                        {cert.date}
                      </div>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          Verify Badge <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
              <span className="w-7 h-[2px] bg-[var(--accent)]" />
              EXPERIENCE
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold mb-10 tracking-tight">
              Work <span className="font-serif-italic gradient-accent">experience.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 hover:border-[var(--accent)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-xl font-bold text-[var(--ink)]">Educator Assistant</h3>
                </div>
                <div className="text-sm font-semibold text-[var(--accent)] mb-4">
                  Northpine Technical High School · 2021 – 2022
                </div>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">›</span>
                    <span>Assisted educators with classroom preparation and administrative duties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">›</span>
                    <span>Supported learners with academic activities and problem-solving tasks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">›</span>
                    <span>Managed mark sheets and educational records accurately and securely.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 hover:border-[var(--accent)] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-xl font-bold text-[var(--ink)]">General Assistant</h3>
                </div>
                <div className="text-sm font-semibold text-[var(--accent)] mb-4">
                  Giant Hyper · Nov 2018 – Dec 2018
                </div>
                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">›</span>
                    <span>Assisted customers with product enquiries and provided friendly customer support.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">›</span>
                    <span>Supported retail operations including stocking shelves and organizing merchandise displays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">›</span>
                    <span>Promoted products effectively to maintain high levels of customer satisfaction.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-widest text-[var(--accent)] mb-3">
                    <span className="w-7 h-[2px] bg-[var(--accent)]" />
                    CONTACT
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                    Let's <span className="font-serif-italic gradient-accent">talk.</span>
                  </h2>

                  <p className="text-[var(--muted)] text-base mb-6 leading-relaxed">
                    Looking for a dedicated junior application developer or intern? Send me a message, drop an email, or connect via LinkedIn and GitHub.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-1">
                        Personal Email
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="mailto:olonawilliams04@gmail.com"
                          className="text-lg sm:text-xl font-bold text-[var(--accent)] hover:underline break-all"
                        >
                          olonawilliams04@gmail.com
                        </a>
                        <button
                          onClick={() => handleCopyEmail('olonawilliams04@gmail.com')}
                          className="p-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)]"
                          title="Copy email"
                        >
                          {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-1">
                        CPUT Student Email
                      </div>
                      <a
                        href="mailto:221630635@mycput.ac.za"
                        className="text-base text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                      >
                        221630635@mycput.ac.za
                      </a>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-1">
                        Phone / WhatsApp
                      </div>
                      <div className="flex flex-wrap gap-4 text-base text-[var(--ink)] font-medium">
                        <a href="tel:+27627700449" className="hover:text-[var(--accent)]">
                          📞 062 770 0449
                        </a>
                        <a href="tel:+27834188608" className="hover:text-[var(--accent)]">
                          📞 083 418 8608
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-1">
                        Location
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        <MapPin className="w-4 h-4 text-[var(--accent)]" />
                        Kraaifontein, Cape Town, 7570, South Africa
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--line)]">
                  <a
                    href="https://github.com/Olona-04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--ink)]"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/olona-williams-5797653b1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--ink)]"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" /> LinkedIn
                  </a>
                  <a
                    href="/OLONA_WILLIAMS_CV.pdf"
                    download="Olona_Williams_CV.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--ink)]"
                  >
                    <Download className="w-4 h-4 text-[var(--accent)]" /> Download CV
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Message Form */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleSendMessage}
                  className="bg-[var(--bg)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-[var(--ink)] flex items-center gap-2">
                    <Send className="w-5 h-5 text-[var(--accent)]" /> Send me a message
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase">
                      Your email
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Olona, I came across your portfolio and would like to discuss an opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-[0_8px_20px_var(--glow)] hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send message
                  </button>

                  {formStatus && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center animate-fade-in">
                      {formStatus}
                    </div>
                  )}

                  <p className="text-[11px] text-[var(--muted)] text-center leading-normal">
                    This launches your default email client with your message pre-formatted. You can also copy my email directly above.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-10 border-t border-[var(--line)]/40 text-center text-xs text-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Olona Metia Williams · Kraaifontein, Cape Town, South Africa
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Olona-04" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/olona-williams-5797653b1/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">
              LinkedIn
            </a>
            <button onClick={() => setShowVercelModal(true)} className="hover:text-[var(--accent)]">
              Vercel Ready ✓
            </button>
          </div>
        </div>
      </footer>

      {/* CERTIFICATE MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl max-w-md w-full p-6 relative shadow-2xl animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-48 h-48 rounded-full object-cover bg-white border-4 border-[var(--accent)] shadow-xl mb-4"
              />
              <h3 className="text-xl font-bold text-[var(--ink)] mb-1">
                {selectedCert.title}
              </h3>
              <div className="text-sm font-semibold text-[var(--accent)] mb-1">
                {selectedCert.issuer}
              </div>
              <div className="text-xs text-[var(--muted)] mb-6">
                {selectedCert.date}
              </div>

              <div className="flex gap-3 w-full">
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-95 text-center flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Verify on Coursera
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[var(--line)] bg-[var(--surface2)] text-[var(--ink)]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CV MODAL */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col relative shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between bg-[var(--surface2)]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="font-bold text-sm sm:text-base text-[var(--ink)]">
                  Olona Metia Williams – Curriculum Vitae
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/OLONA_WILLIAMS_CV.pdf"
                  download="Olona_Williams_CV.pdf"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--accent)] text-[var(--on-accent)] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
                <button
                  onClick={() => setShowCvModal(false)}
                  className="p-1.5 rounded-lg bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[var(--bg)] p-1 overflow-hidden">
              <iframe
                src="/OLONA_WILLIAMS_CV.pdf"
                className="w-full h-full border-0 rounded-b-2xl"
                title="Olona Williams CV"
              />
            </div>
          </div>
        </div>
      )}

      {/* VERCEL DEPLOYMENT GUIDE MODAL */}
      {showVercelModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVercelModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg border border-white/20">
                ▲
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--ink)]">Ready for Vercel Deployment</h3>
                <p className="text-xs text-[var(--muted)]">Zero configuration needed • Instant production build</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[var(--muted)] mb-6">
              <div className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
                <div className="font-semibold text-[var(--ink)] mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pre-configured vercel.json
                </div>
                <p className="text-xs">
                  A root <code>vercel.json</code> file has been generated with SPA rewrites so clean URLs and page reloads work smoothly.
                </p>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-[var(--ink)] text-sm">Deployment Method 1: GitHub &amp; Vercel Dashboard (Recommended)</div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-[var(--muted)]">
                  <li>Push your codebase to a repository on GitHub (e.g. <code>github.com/Olona-04/portfolio</code>).</li>
                  <li>Log into <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">vercel.com</a> and click <strong>Add New &gt; Project</strong>.</li>
                  <li>Import your GitHub repository. Vercel automatically detects <strong>Vite</strong>.</li>
                  <li>Click <strong>Deploy</strong>. Your site will be live on a custom <code>.vercel.app</code> domain in under 30 seconds!</li>
                </ol>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-[var(--ink)] text-sm">Deployment Method 2: Vercel CLI</div>
                <div className="bg-[var(--bg)] p-3 rounded-xl border border-[var(--line)] font-mono text-xs text-[var(--accent)]">
                  npx vercel
                </div>
                <p className="text-xs">Follow the interactive prompts to deploy directly from terminal.</p>
              </div>
            </div>

            <button
              onClick={() => setShowVercelModal(false)}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[var(--surface2)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent)]"
            >
              Got it, close guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
