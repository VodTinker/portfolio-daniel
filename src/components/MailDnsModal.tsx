import { X, Mail, Globe, Shield, Server, CheckCircle, Zap, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface MailDnsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Image Carousel Component
function ImageCarousel({ language }: { language: 'en' | 'es' }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            src: "/mail_dns_architecture.webp",
            caption: { en: "Infrastructure Architecture Diagram", es: "Diagrama de Arquitectura de la Infraestructura" }
        },
        {
            src: "/Mail_Private.webp",
            caption: { en: "Stalwart Mail Server - Private Dashboard", es: "Servidor Stalwart Mail - Panel Privado" }
        },
        {
            src: "/Mail_Public.webp",
            caption: { en: "Stalwart Mail Server - Public View", es: "Servidor Stalwart Mail - Vista Pública" }
        },
        {
            src: "/DNS_Private.webp",
            caption: { en: "DNS Configuration - Private Settings", es: "Configuración DNS - Ajustes Privados" }
        },
        {
            src: "/DNS_Public.webp",
            caption: { en: "DNS Configuration - Public View", es: "Configuración DNS - Vista Pública" }
        },
        {
            src: "/Server_Specs.webp",
            caption: { en: "Server Specifications & Resources", es: "Especificaciones y Recursos del Servidor" }
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative p-6">
            {/* Carousel Container */}
            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].src}
                        alt={images[currentIndex].caption[language]}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700 transition-colors shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6 text-neutral-900 dark:text-white" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700 transition-colors shadow-lg"
                >
                    <ChevronRight className="w-6 h-6 text-neutral-900 dark:text-white" />
                </button>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-center font-medium">
                        {images[currentIndex].caption[language]}
                    </p>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'w-8 bg-blue-600 dark:bg-blue-400'
                            : 'w-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function MailDnsModal({ isOpen, onClose }: MailDnsModalProps) {
    const { t, language } = useLanguage();

    const mailFeatures = {
        en: [
            { icon: Mail, title: "Stalwart Mail Server", desc: "Modern Rust-based server at mail.vodtinker.dev with JMAP support" },
            { icon: Zap, title: "High Performance", desc: "Memory-safe Rust architecture for optimal resource usage" },
            { icon: Shield, title: "DKIM/SPF/DMARC/ARC", desc: "Full email authentication with anti-replay protection" },
            { icon: CheckCircle, title: "Advanced Filtering", desc: "Built-in spam/phishing protection with Sieve scripting" },
        ],
        es: [
            { icon: Mail, title: "Stalwart Mail Server", desc: "Servidor moderno basado en Rust en mail.vodtinker.dev con soporte JMAP" },
            { icon: Zap, title: "Alto Rendimiento", desc: "Arquitectura Rust memory-safe para uso óptimo de recursos" },
            { icon: Shield, title: "DKIM/SPF/DMARC/ARC", desc: "Autenticación completa de correo con protección anti-replay" },
            { icon: CheckCircle, title: "Filtrado Avanzado", desc: "Protección anti-spam/phishing integrada con scripting Sieve" },
        ]
    };

    const dnsFeatures = {
        en: [
            { icon: Globe, title: "DoH & DoQ Support", desc: "DNS over HTTPS and QUIC protocols" },
            { icon: Zap, title: "Caddy HTTP/3", desc: "Modern web server with automatic HTTPS" },
            { icon: Shield, title: "Privacy-First", desc: "Restricted access via Tailscale network" },
            { icon: Server, title: "dns.vodtinker.dev", desc: "Custom DNS resolver endpoint" },
        ],
        es: [
            { icon: Globe, title: "Soporte DoH & DoQ", desc: "DNS sobre HTTPS y protocolos QUIC" },
            { icon: Zap, title: "Caddy HTTP/3", desc: "Servidor web moderno con HTTPS automático" },
            { icon: Shield, title: "Privacidad Primero", desc: "Acceso restringido vía red Tailscale" },
            { icon: Server, title: "dns.vodtinker.dev", desc: "Endpoint de resolución DNS personalizado" },
        ]
    };

    const technologies = [
        "Stalwart Mail Server", "Rust", "JMAP", "SMTP", "IMAP",
        "DNS over HTTPS", "DNS over QUIC", "Caddy",
        "Tailscale", "nftables", "Let's Encrypt",
        "DigitalOcean", "Bash Scripting"
    ];

    const features = language === 'en' ? mailFeatures.en : mailFeatures.es;
    const dnsFeat = language === 'en' ? dnsFeatures.en : dnsFeatures.es;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                                    {language === 'en'
                                        ? "Self-Hosted Mail & DNS Infrastructure"
                                        : "Infraestructura Autoalojada de Correo y DNS"}
                                </h2>
                                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    {language === 'en'
                                        ? "Rust-powered mail server with privacy-first design"
                                        : "Servidor de correo basado en Rust con diseño enfocado en privacidad"}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-8">
                            {/* Screenshots Carousel */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-neutral-800 dark:to-neutral-900">
                                <ImageCarousel language={language} />
                            </div>

                            {/* Mail Server Features */}
                            <div>
                                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-neutral-900 dark:text-white">
                                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    {language === 'en' ? "Mail Server Configuration" : "Configuración de Servidor de Correo"}
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                                        >
                                            <feature.icon className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
                                            <h4 className="font-semibold text-neutral-900 dark:text-white">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {feature.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* DNS Server Features */}
                            <div>
                                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-neutral-900 dark:text-white">
                                    <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    {language === 'en' ? "DNS Server Configuration" : "Configuración de Servidor DNS"}
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {dnsFeat.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                                        >
                                            <feature.icon className="w-8 h-8 mb-2 text-purple-600 dark:text-purple-400" />
                                            <h4 className="font-semibold text-neutral-900 dark:text-white">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {feature.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Special Features */}
                            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-900 border border-blue-200 dark:border-neutral-700">
                                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-neutral-900 dark:text-white">
                                    <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                    {language === 'en' ? "Special Features" : "Características Especiales"}
                                </h3>
                                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {[
                                        language === 'en' ? "Automated backup system via Tailscale" : "Sistema de backups automatizados vía Tailscale",
                                        language === 'en' ? "Custom Bash scripts for diagnostics" : "Scripts Bash personalizados para diagnósticos",
                                        language === 'en' ? "Multi-layer spam protection" : "Protección anti-spam multicapa",
                                        language === 'en' ? "MTA-STS for transport security" : "MTA-STS para seguridad de transporte",
                                        language === 'en' ? "Real-time monitoring & alerts" : "Monitoreo y alertas en tiempo real",
                                        language === 'en' ? "Automatic SSL/TLS renewal" : "Renovación automática SSL/TLS",
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                            <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">
                                    {language === 'en' ? "Technologies Used" : "Tecnologías Utilizadas"}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech, idx) => (
                                        <motion.span
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="https://mail.vodtinker.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl"
                                >
                                    <Mail className="w-5 h-5" />
                                    {language === 'en' ? "Visit Mail Server" : "Visitar Servidor de Correo"}
                                </a>
                                <a
                                    href="https://dns.vodtinker.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl"
                                >
                                    <Globe className="w-5 h-5" />
                                    {language === 'en' ? "Visit DNS Server" : "Visitar Servidor DNS"}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
