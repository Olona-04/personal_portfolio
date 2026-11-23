import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  Mail,
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
  Layers,
  Code2,
  Eye,
  Rocket,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2
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
      'A chatbot that lets farmers describe a crop problem in everyday language. It asks up to three focused questions, then gives a likely cause (not a diagnosis) with prevention tips, and refers serious cases to an advisor. Built by Transformers Group, a team of 5.',
    image: '/images/agribot.jpg',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'OpenAI API', 'MongoDB'],
    liveUrl: 'https://agribot-silk.vercel.app'
  },
  {
    id: 'moodspark',
    title: 'MoodSpark: AI Sentiment Analysis',
    category: 'work',
    description:
      'A mood and sentiment app that turns words into actionable insights. Features dual in-browser engines (VADER & transformer model) plus a daily mood journal that checks how closely your words match your mood.',
    image: '/images/moodspark.jpg',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'VADER', 'NLP'],
    liveUrl: 'https://sentimentai-2.ai.studio'
  },
  {
    id: 'content-gen',
    title: 'Content Generator & Social Publisher',
    category: 'work',
    description:
      'An AI app that makes text, code or images from a prompt, lets you add a caption, then posts to your socials. It also suggests hashtags and has a prompt library, tone options and a colour palette picker.',
    image: '/images/content-generator.jpg',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Vercel'],
    liveUrl: 'https://content-generator-social-publisher.ai.studio'
  },
  {
    id: 'thrift',
    title: 'Thrifting E-Commerce Website',
    category: 'school',
    description:
      'A thrift clothing store with responsive pages. I built the PHP backend and database connection, so products display dynamically and their data is stored in MySQL.',
    isSvg: true,
    tags: ['HTML', 'CSS', 'Java', 'PHP', 'MySQL'],
    codeUrl: 'https://github.com/Olona-04'
  },
  {
    id: 'nsfas',
    title: 'NSFAS Mobile App Redesign',
    category: 'school',
    description:
      'An interactive prototype that makes student funding easier to access, with flows for login, applications, document uploads and dashboard tracking.',
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

const CV_PAGES = [
  {
    page: 1,
    title: 'Curriculum Vitae',
    subtitle: 'Career Objective, Skills, Projects, Experience & References',
    image: '/images/cv/page_1.png'
  },
  {
    page: 2,
    title: 'Identity Document',
    subtitle: 'Certified Copy of RSA National Identity Card',
    image: '/images/cv/page_2.png'
  },
  {
    page: 3,
    title: 'National Senior Certificate',
    subtitle: 'Matric Certificate – Bernadino Heights High School',
    image: '/images/cv/page_3.png'
  },
  {
    page: 4,
    title: 'Higher Certificate in ICT',
    subtitle: 'Cape Peninsula University of Technology (CPUT)',
    image: '/images/cv/page_4.png'
  }
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'work' | 'school'>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showVercelModal, setShowVercelModal] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvCurrentPage, setCvCurrentPage] = useState<number>(1);
  const [cvZoom, setCvZoom] = useState<number>(100);
  const [cvViewMode, setCvViewMode] = useState<'document' | 'text'>('document');
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

    setFormStatus('Opening your email app. Press Send there to deliver your message!');
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border-1.5 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--glow)] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              CV Preview
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-md hover:brightness-105 transition-all"
            >
              💬 Direct message
            </a>

            <button
              onClick={() => setShowVercelModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] transition-all cursor-pointer"
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
              className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center hover:border-[var(--accent)] transition-all cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center cursor-pointer"
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-1.5 border-[var(--accent)] text-[var(--accent)] font-semibold text-sm cursor-pointer"
              >
                <FileText className="w-4 h-4" /> Preview CV (4 Pages)
              </button>
              <a
                href="/OLONA_WILLIAMS_CV.pdf"
                download="OLONA_WILLIAMS_CV.pdf"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--surface2)] text-[var(--ink)] border border-[var(--line)] font-medium text-sm"
              >
                <Download className="w-4 h-4 text-[var(--accent)]" /> Download CV PDF
              </a>
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
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] text-sm mb-6 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse" />
                <span>Open to internships and junior roles</span>
              </div>

              {/* Big Display Hero Title */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.04] mb-4 text-[var(--heading)]">
                Olona Metia{' '}
                <span className="font-serif-italic text-[var(--accent)] block sm:inline">
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
                <strong className="text-[var(--accent)] font-semibold">web apps</strong> and designs{' '}
                <strong className="text-[var(--accent)] font-semibold">app interfaces</strong>, from the PHP and MySQL behind a store to the Figma screens people tap.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-[0_8px_30px_var(--glow)] hover:opacity-95 transition-all"
                >
                  <Layers className="w-4 h-4" />
                  View projects
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--ink)] transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Contact me
                </a>

                <button
                  onClick={() => setShowCvModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border-1.5 border-[var(--accent)] bg-[var(--surface)] hover:bg-[var(--glow)] text-[var(--accent)] transition-all cursor-pointer shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview CV
                </button>

                <a
                  href="/OLONA_WILLIAMS_CV.pdf"
                  download="OLONA_WILLIAMS_CV.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] transition-all"
                  title="Direct PDF download"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>

            {/* Right Column: Portrait matching screenshot */}
            <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[32px] border border-[var(--line)] overflow-hidden shadow-2xl bg-gradient-to-br from-[var(--surface2)] to-[var(--surface)] group">
                <img
                  src="/images/olona.jpg"
                  alt="Olona Metia Williams"
                  className="w-full h-full object-cover object-[center_18%] group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 bg-[var(--surface)]/90 dark:bg-[var(--bg)]/85 backdrop-blur-md border border-[var(--line)] rounded-2xl p-4 text-center shadow-lg">
                  <span className="text-sm font-medium text-[var(--ink)]">
                    Final-year · Application Development · CPUT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="section-eyebrow">ABOUT</div>

            <h2 className="display-heading mb-8">
              Building things that <span className="serif-part">work</span> and feel good to use.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Narrative */}
              <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                <p>
                  I'm a final-year Information Technology (Application Development) student at Cape Peninsula University of Technology. I like turning an idea into something people can use, from the database underneath to the screen on top.
                </p>
                <p>
                  My group projects have covered both sides: the PHP backend and database connection for a thrift clothing store, and an interactive Figma prototype for a student-funding app. I'm looking for an internship or junior developer role where I can keep learning while shipping real work.
                </p>
              </div>

              {/* Quick Fact Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 shadow-sm">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1.5 uppercase">Studying</div>
                  <div className="font-semibold text-sm sm:text-base text-[var(--ink)]">National Diploma, IT</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">Application Development (CPUT)</div>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 shadow-sm">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1.5 uppercase">Completed</div>
                  <div className="font-semibold text-sm sm:text-base text-[var(--ink)]">Higher Certificate in ICT</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">CPUT · Completed 2024</div>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 shadow-sm">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1.5 uppercase">Based in</div>
                  <div className="font-semibold text-sm sm:text-base text-[var(--ink)]">Kraaifontein, Cape Town</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">Western Cape, South Africa</div>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 shadow-sm">
                  <div className="text-[11px] font-bold text-[var(--accent)] tracking-wider mb-1.5 uppercase">Status</div>
                  <div className="font-semibold text-sm sm:text-base text-[var(--accent)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Open to work
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">Internships &amp; Junior Roles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="section-eyebrow">SKILLS</div>

            <h2 className="display-heading mb-4">
              What I work <span className="serif-part">with.</span>
            </h2>
            <p className="text-[var(--muted)] text-base sm:text-lg mb-12 max-w-xl">
              The tools I've used in coursework, group projects, and real applications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Programming Languages */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-sm hover:border-[var(--accent)] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-5 group-hover:scale-105 transition-transform">
                  &lt;/&gt;
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--ink)]">Programming languages</h3>
                <ul className="space-y-2.5 text-sm text-[var(--muted)]">
                  {['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'SQL'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)] font-bold">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frameworks & Libraries */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-sm hover:border-[var(--accent)] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-105 transition-transform">
                  ⚛
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--ink)]">Frameworks &amp; libraries</h3>
                <ul className="space-y-2.5 text-sm text-[var(--muted)]">
                  {['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Vite'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)] font-bold">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Web & Databases */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-sm hover:border-[var(--accent)] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-5 group-hover:scale-105 transition-transform">
                  DB
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--ink)]">Web &amp; databases</h3>
                <ul className="space-y-2.5 text-sm text-[var(--muted)]">
                  {['HTML', 'CSS', 'MySQL', 'MongoDB', 'Database connectivity'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)] font-bold">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* UI/UX Design */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-sm hover:border-[var(--accent)] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-5 group-hover:scale-105 transition-transform">
                  UI
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--ink)]">Design</h3>
                <ul className="space-y-2.5 text-sm text-[var(--muted)]">
                  {['UI/UX design', 'Figma', 'Wireframing', 'Prototyping'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-[var(--accent)] font-bold">›</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Workflow */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-sm hover:border-[var(--accent)] transition-all group lg:col-span-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center font-bold text-base mb-5 group-hover:scale-105 transition-transform">
                  Git
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--ink)]">Tools &amp; practice</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--muted)]">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> Git version control</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> GitHub</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> Vercel</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> OpenAI API</div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> AI-assisted development</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> Team collaboration</div>
                    <div className="flex items-center gap-2"><span className="text-[var(--accent)] font-bold">›</span> User-centred design</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="section-eyebrow">PROJECTS</div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="display-heading mb-4">
                  Selected <span className="serif-part">work.</span>
                </h2>
                <p className="text-[var(--muted)] text-base sm:text-lg max-w-xl">
                  The projects I built for work, and the ones from my studies at CPUT.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  All ({PROJECTS.length})
                </button>
                <button
                  onClick={() => setActiveCategory('work')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === 'work'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  Work Projects (3)
                </button>
                <button
                  onClick={() => setActiveCategory('school')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === 'school'
                      ? 'bg-[var(--accent)] text-[var(--on-accent)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  CPUT Studies (2)
                </button>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl overflow-hidden flex flex-col hover:border-[var(--accent)] transition-all shadow-sm group"
                >
                  {/* Thumbnail */}
                  <div className="h-56 bg-[var(--surface2)] overflow-hidden relative border-b border-[var(--line)]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
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

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[var(--bg)]/90 backdrop-blur-md border border-[var(--line)] text-[var(--accent)] shadow-sm">
                        {project.category === 'work' ? 'WORK' : 'SCHOOL'}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2.5 text-[var(--ink)] leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[var(--surface2)] text-xs font-medium text-[var(--muted)] border border-[var(--line)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[var(--line)] text-sm font-semibold">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" /> Live demo
                        </a>
                      )}
                      {project.figmaUrl && (
                        <a
                          href={project.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                        >
                          <Eye className="w-4 h-4" /> View in Figma
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--ink)]"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION (MATCHING SCREENSHOT) */}
        <section id="education" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="section-eyebrow">EDUCATION</div>

            <h2 className="display-heading mb-12">
              Where I've <span className="serif-part">studied.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 flex gap-5 items-start hover:border-[var(--accent)] transition-all shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--ink)] mb-1">National Diploma, IT</h3>
                  <p className="text-sm text-[var(--accent)] font-semibold">Application Development · CPUT</p>
                  <p className="text-xs text-[var(--muted)] mt-1.5">Currently enrolled (final year)</p>
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 flex gap-5 items-start hover:border-[var(--accent)] transition-all shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--ink)] mb-1">Higher Certificate, ICT</h3>
                  <p className="text-sm text-[var(--accent)] font-semibold">Cape Peninsula University of Technology</p>
                  <p className="text-xs text-[var(--muted)] mt-1.5">Completed 2024</p>
                </div>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 flex gap-5 items-start hover:border-[var(--accent)] transition-all shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[var(--surface2)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Code2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--ink)] mb-1">Matric (Grade 12)</h3>
                  <p className="text-sm text-[var(--accent)] font-semibold">Bernadino Heights High School</p>
                  <p className="text-xs text-[var(--muted)] mt-1.5">Completed 2020</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATES SECTION (MATCHING SCREENSHOT) */}
        <section id="certificates" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="section-eyebrow">CERTIFICATES</div>

            <h2 className="display-heading mb-12">
              My <span className="serif-part">certificates.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.title}
                  className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 shadow-sm hover:border-[var(--accent)] transition-all flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left group"
                >
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="shrink-0 group relative cursor-pointer"
                    title="Click to view badge"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-28 h-28 rounded-full object-cover bg-white border border-[var(--line)] group-hover:scale-105 transition-transform shadow-sm"
                    />
                    <span className="absolute inset-0 rounded-full bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                      <Eye className="w-6 h-6" />
                    </span>
                  </button>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--ink)] leading-snug mb-1.5">
                      {cert.title}
                    </h3>
                    <div className="text-sm font-semibold text-[var(--accent)] mb-1">
                      {cert.issuer}
                    </div>
                    <div className="text-xs text-[var(--muted)] mb-3">
                      {cert.date}
                    </div>
                    <div>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-semibold text-[var(--accent)] underline hover:text-[var(--accent2)] transition-colors"
                      >
                        View badge
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="section-eyebrow">EXPERIENCE</div>

            <h2 className="display-heading mb-12">
              Work <span className="serif-part">experience.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 sm:p-9 hover:border-[var(--accent)] transition-all shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6 text-[var(--accent)]" />
                  <h3 className="text-2xl font-bold text-[var(--ink)]">Educator Assistant</h3>
                </div>
                <div className="text-sm font-semibold text-[var(--accent)] mb-5">
                  Northpine Technical High School · 2021–2022
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-[var(--muted)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] font-bold text-lg leading-none">›</span>
                    <span>Assisted educators with classroom preparation and admin</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] font-bold text-lg leading-none">›</span>
                    <span>Supported learners with academic activities and problem-solving</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] font-bold text-lg leading-none">›</span>
                    <span>Managed mark sheets and educational records</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl p-7 sm:p-9 hover:border-[var(--accent)] transition-all shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6 text-[var(--accent)]" />
                  <h3 className="text-2xl font-bold text-[var(--ink)]">General Assistant</h3>
                </div>
                <div className="text-sm font-semibold text-[var(--accent)] mb-5">
                  Giant Hyper · Nov–Dec 2018
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-[var(--muted)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] font-bold text-lg leading-none">›</span>
                    <span>Helped customers with product enquiries</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] font-bold text-lg leading-none">›</span>
                    <span>Stocked shelves and organised merchandise displays</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--accent)] font-bold text-lg leading-none">›</span>
                    <span>Promoted products and kept customer satisfaction high</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 border-t border-[var(--line)]/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[36px] p-7 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 shadow-md">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="section-eyebrow">CONTACT</div>

                  <h2 className="display-heading mb-4">
                    Let's <span className="serif-part">talk.</span>
                  </h2>

                  <p className="text-[var(--muted)] text-base sm:text-lg mb-8 leading-relaxed">
                    Looking for a junior developer or intern? Send me an email and I'll get back to you.
                  </p>

                  <div className="space-y-5 mb-10">
                    <div>
                      <div className="flex items-center gap-3">
                        <a
                          href="mailto:olonawilliams04@gmail.com"
                          className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--accent)] hover:underline break-all"
                        >
                          olonawilliams04@gmail.com
                        </a>
                        <button
                          onClick={() => handleCopyEmail('olonawilliams04@gmail.com')}
                          className="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Copy email address"
                        >
                          {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-[var(--muted)]">
                      Student email: <a href="mailto:221630635@mycput.ac.za" className="text-[var(--accent)] hover:underline font-medium">221630635@mycput.ac.za</a>
                    </div>
                  </div>
                </div>

                {/* Quick Contact & CV Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--line)]">
                  <a
                    href="tel:+27627700449"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-[0_6px_20px_var(--glow)]"
                  >
                    📞 062 770 0449
                  </a>
                  <button
                    onClick={() => setShowCvModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm border-1.5 border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] hover:bg-[var(--glow)] cursor-pointer"
                  >
                    <Eye className="w-4 h-4" /> Preview CV
                  </button>
                  <a
                    href="/OLONA_WILLIAMS_CV.pdf"
                    download="OLONA_WILLIAMS_CV.pdf"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm border border-[var(--line)] bg-[var(--surface2)] text-[var(--ink)] hover:border-[var(--accent)]"
                  >
                    <Download className="w-4 h-4" /> Download CV
                  </a>
                  <a
                    href="https://github.com/Olona-04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/olona-williams-5797653b1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
                  >
                    <Linkedin className="w-4 h-4 text-sky-500" /> LinkedIn
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Message Form */}
              <div className="lg:col-span-6">
                <form
                  id="msg"
                  onSubmit={handleSendMessage}
                  className="bg-[var(--bg)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm"
                >
                  <h3 className="text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
                    Send me a message
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase">
                      Your name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Hiring Manager"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase">
                      Your email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--muted)] mb-1.5 uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Olona, I'd like to talk about an opportunity at..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-[var(--on-accent)] shadow-[0_8px_20px_var(--glow)] hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Send message
                  </button>

                  {formStatus ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs text-center">
                      {formStatus}
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--muted)] text-center leading-normal">
                      This opens your email app with the message ready to send to me.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[var(--line)]/50 text-center text-xs text-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Olona Williams · Kraaifontein, Cape Town · Built with HTML, CSS and JavaScript
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Olona-04" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/olona-williams-5797653b1/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">
              LinkedIn
            </a>
            <button onClick={() => setShowVercelModal(true)} className="hover:text-[var(--accent)] cursor-pointer">
              Vercel Deployment
            </button>
          </div>
        </div>
      </footer>

      {/* CERTIFICATE DETAIL MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl max-w-md w-full p-6 relative shadow-2xl animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-48 h-48 rounded-full object-cover bg-white border-4 border-[var(--accent)] shadow-xl mb-4 p-1"
              />
              <h3 className="text-2xl font-bold text-[var(--ink)] mb-1">
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
                  className="flex-1 py-3 rounded-xl text-xs font-semibold bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-95 text-center flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Badge on Coursera
                </a>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-3 rounded-xl text-xs font-semibold border border-[var(--line)] bg-[var(--surface2)] text-[var(--ink)] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE INTERACTIVE CV PREVIEW MODAL */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col relative shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--line)] flex flex-wrap items-center justify-between gap-3 bg-[var(--surface2)]">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[var(--ink)] leading-tight">
                    Olona Metia Williams – CV &amp; Credentials
                  </h3>
                  <div className="text-xs text-[var(--muted)]">
                    Page {cvCurrentPage} of {CV_PAGES.length}: {CV_PAGES[cvCurrentPage - 1].title}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="inline-flex rounded-xl bg-[var(--surface)] p-1 border border-[var(--line)]">
                  <button
                    onClick={() => setCvViewMode('document')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      cvViewMode === 'document' ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'text-[var(--muted)]'
                    }`}
                  >
                    Document Pages
                  </button>
                  <button
                    onClick={() => setCvViewMode('text')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      cvViewMode === 'text' ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'text-[var(--muted)]'
                    }`}
                  >
                    Resume Text
                  </button>
                </div>

                <a
                  href="/OLONA_WILLIAMS_CV.pdf"
                  download="OLONA_WILLIAMS_CV.pdf"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[var(--accent)] text-[var(--on-accent)] flex items-center gap-1.5 shadow-sm hover:brightness-105"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>

                <a
                  href="/OLONA_WILLIAMS_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-semibold border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] items-center gap-1.5"
                  title="Open raw PDF in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Tab
                </a>

                <button
                  onClick={() => setShowCvModal(false)}
                  className="p-1.5 rounded-xl bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Page Navigation Tabs */}
            {cvViewMode === 'document' && (
              <div className="px-4 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2 overflow-x-auto">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {CV_PAGES.map((p) => (
                    <button
                      key={p.page}
                      onClick={() => setCvCurrentPage(p.page)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        cvCurrentPage === p.page
                          ? 'bg-[var(--accent)] text-[var(--on-accent)] font-semibold shadow-sm'
                          : 'bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      Page {p.page}: {p.title}
                    </button>
                  ))}
                </div>

                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--muted)]">
                  <button
                    onClick={() => setCvZoom((z) => Math.max(70, z - 15))}
                    className="p-1 rounded-lg hover:bg-[var(--surface2)] text-[var(--ink)]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center">{cvZoom}%</span>
                  <button
                    onClick={() => setCvZoom((z) => Math.min(160, z + 15))}
                    className="p-1 rounded-lg hover:bg-[var(--surface2)] text-[var(--ink)]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCvZoom(100)}
                    className="p-1 rounded-lg hover:bg-[var(--surface2)] text-[var(--ink)]"
                    title="Reset Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Viewer Content */}
            <div className="flex-1 bg-[var(--bg)]/90 p-4 overflow-y-auto flex items-start justify-center relative">
              {cvViewMode === 'document' ? (
                <div className="flex flex-col items-center justify-center max-w-full">
                  {/* High-res rendered document page */}
                  <div
                    style={{ width: `${cvZoom}%`, maxWidth: '850px' }}
                    className="transition-all duration-200 shadow-2xl rounded-2xl overflow-hidden border border-[var(--line)] bg-white"
                  >
                    <img
                      src={CV_PAGES[cvCurrentPage - 1].image}
                      alt={`CV Page ${cvCurrentPage} - ${CV_PAGES[cvCurrentPage - 1].title}`}
                      className="w-full h-auto block select-none"
                    />
                  </div>

                  {/* Previous / Next buttons */}
                  <div className="flex items-center justify-center gap-4 mt-6 mb-4">
                    <button
                      disabled={cvCurrentPage <= 1}
                      onClick={() => setCvCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-xs font-semibold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous Page
                    </button>
                    <span className="text-xs text-[var(--muted)] font-medium">
                      Page {cvCurrentPage} of {CV_PAGES.length}
                    </span>
                    <button
                      disabled={cvCurrentPage >= CV_PAGES.length}
                      onClick={() => setCvCurrentPage((p) => Math.min(CV_PAGES.length, p + 1))}
                      className="px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-xs font-semibold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      Next Page <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Text & Structured View of Resume */
                <div className="max-w-3xl w-full bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-10 shadow-lg text-[var(--ink)] space-y-8">
                  <div className="border-b border-[var(--line)] pb-6">
                    <h2 className="text-3xl font-bold tracking-tight mb-1 text-[var(--ink)]">
                      OLONA METIA WILLIAMS
                    </h2>
                    <p className="text-sm text-[var(--accent)] font-semibold mb-3">
                      Application Developer · IT Final-Year Student (CPUT) · Aspiring Software Engineer
                    </p>
                    <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-[var(--muted)]">
                      <span>📞 062 770 0449 / 083 418 8608</span>
                      <span>✉ 221630635@mycput.ac.za / olonawilliams04@gmail.com</span>
                      <span>📍 Kraaifontein, Cape Town, 7570</span>
                    </div>
                  </div>

                  {/* Career Objective */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
                      Career Objective
                    </h4>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      Final-year Information Technology (Application Development) student at Cape Peninsula University of Technology (CPUT) with a strong interest in software and web development. Passionate about building practical digital solutions and improving user experiences through technology. Seeking an internship or junior developer opportunity to apply programming, database, and UI/UX skills while gaining industry experience.
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
                      Education
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-bold text-[var(--ink)]">Cape Peninsula University of Technology (CPUT)</div>
                        <div className="text-[var(--accent)] font-medium text-xs">National Diploma in Information Technology – Application Development</div>
                        <div className="text-xs text-[var(--muted)]">Currently Enrolled (Final Year)</div>
                      </div>
                      <div>
                        <div className="font-bold text-[var(--ink)]">Cape Peninsula University of Technology (CPUT)</div>
                        <div className="text-[var(--accent)] font-medium text-xs">Higher Certificate in Information &amp; Communication Technology</div>
                        <div className="text-xs text-[var(--muted)]">Completed: 2024</div>
                      </div>
                      <div>
                        <div className="font-bold text-[var(--ink)]">Bernadino Heights High School</div>
                        <div className="text-[var(--accent)] font-medium text-xs">Matric (Grade 12)</div>
                        <div className="text-xs text-[var(--muted)]">Completed: 2020</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Experience */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
                      Project Experience
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="font-bold text-[var(--ink)]">Thrifting E-Commerce Website (Group Project) — 2025</div>
                        <div className="text-xs text-[var(--accent)] font-medium mb-1">Technologies: HTML, CSS, Java, PHP, MySQL</div>
                        <ul className="list-disc list-inside text-xs text-[var(--muted)] space-y-1">
                          <li>Developed a thrift clothing website with responsive user interfaces.</li>
                          <li>Implemented PHP backend functionality and database connectivity.</li>
                          <li>Enabled dynamic product display and structured data storage.</li>
                          <li>Collaborated in a team using structured development practices.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-bold text-[var(--ink)]">NSFAS Mobile App Redesign Prototype — 2025</div>
                        <div className="text-xs text-[var(--accent)] font-medium mb-1">Tools: Figma, UI/UX Design</div>
                        <ul className="list-disc list-inside text-xs text-[var(--muted)] space-y-1">
                          <li>Designed an interactive NSFAS mobile app prototype to improve student funding access.</li>
                          <li>Created core app flows including login, applications, document uploads, and dashboard tracking.</li>
                          <li>Applied user-centered design principles to enhance usability and navigation.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* References */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
                      References
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
                        <div className="font-bold text-[var(--ink)]">Mr Sabelo Nobula</div>
                        <div className="text-[var(--muted)]">Western Cape Government (Department of the Premier)</div>
                        <div className="text-[var(--accent)]">Sabelo.Nobula@westerncape.gov.za</div>
                        <div className="text-[var(--muted)]">021 467 9246 / 072 865 4848</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
                        <div className="font-bold text-[var(--ink)]">Sesethu Mbodlana</div>
                        <div className="text-[var(--muted)]">SAB Brewery Newlands</div>
                        <div className="text-[var(--accent)]">sesethumbodlana431@gmail.com</div>
                        <div className="text-[var(--muted)]">062 342 9048</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
              className="absolute top-5 right-5 p-2 rounded-full bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg border border-white/20">
                ▲
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--ink)]">Ready for Vercel Deployment</h3>
                <p className="text-xs text-[var(--muted)]">Zero configuration needed • Peer-deps conflict resolved</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[var(--muted)] mb-6">
              <div className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
                <div className="font-semibold text-[var(--ink)] mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pre-configured vercel.json &amp; .npmrc
                </div>
                <p className="text-xs">
                  Your <code>vercel.json</code> and <code>.npmrc</code> are configured with <code>legacy-peer-deps=true</code> to avoid any npm peer conflict during deployment.
                </p>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-[var(--ink)] text-sm">Deployment Method: Push to GitHub</div>
                <div className="bg-[var(--bg)] p-3 rounded-xl border border-[var(--line)] font-mono text-xs text-[var(--accent)] space-y-1">
                  <div>git add package.json vercel.json .npmrc src/ public/</div>
                  <div>git commit -m "Update portfolio look and feel, fix CV preview"</div>
                  <div>git push origin main</div>
                </div>
                <p className="text-xs">Vercel will detect the push and automatically deploy your live portfolio!</p>
              </div>
            </div>

            <button
              onClick={() => setShowVercelModal(false)}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[var(--surface2)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent)] cursor-pointer"
            >
              Close guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
