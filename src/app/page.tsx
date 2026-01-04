'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaChevronDown,
  FaStar
} from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import SectionDivider from '../components/SectionDivider';
import BookMeetingBtn from '../components/BookMeetingBtn';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Script from 'next/script';

const AlAbabilLogo = () => (
  <div
    className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <img
      src="/assets/img/logo.jpg"
      alt="AL ABABIL Logo"
      className="w-full h-full object-cover"
    />
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // For closing mobile menu on outside click
  const menuRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set timeout for 1 second delay
      timeoutId = setTimeout(() => {
        // Get all sections
        const sections = ['services', 'about', 'faq', 'contact'];
        const scrollPosition = window.scrollY + 100; // Offset for header height

        // Check which section is currently in view
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }

        // If we're at the top, no section is active
        if (window.scrollY < 100) {
          setActiveSection('');
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: 'All Services', href: '#services' },
    { name: 'FAQs', href: '#faq' },
    { name: 'About', href: '#about' },
    { name: 'Contact ', href: '#contact' }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-2">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <AlAbabilLogo />
            <div>
              <h1 className={`font-heading font-bold ${isScrolled ? 'text-gray-800' : 'text-white'} text-base sm:text-lg md:text-xl lg:text-xl`}>
                AL ABABIL
              </h1>
              <p className={`font-medium tracking-wider ${isScrolled ? 'text-gray-600' : 'text-gray-200'} text-xs sm:text-[13px] md:text-[13px] lg:text-[13px]`}>
                DOCUMENTS CLEARING CO.
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-all duration-300 hover:text-teal-500 relative ${isActive
                    ? 'text-teal-500'
                    : isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item.name}
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay and Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                ref={overlayRef}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              {/* Drawer */}
              <motion.div
                ref={menuRef}
                className="fixed top-0 right-0 z-50 h-full w-[90vw] max-w-xs bg-white shadow-2xl p-6 flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="flex justify-end mb-6">
                  <button
                    className="text-gray-700 hover:text-teal-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                  >
                    <X size={28} />
                  </button>
                </div>
                <nav className="flex flex-col gap-4 flex-1 justify-start">
                  {menuItems.map((item) => {
                    const sectionId = item.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`block py-3 px-4 rounded-lg text-base sm:text-lg font-semibold transition-colors relative ${isActive ? 'text-teal-500 bg-teal-50' : 'text-gray-700 hover:text-teal-500 hover:bg-teal-50'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r" />
                        )}
                      </a>
                    );
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      bg: '/assets/img/slide1.png',
      title: 'Professional Document Clearing Services in UAE',
      description: 'Expert assistance for all your government paperwork, visa processing, and business documentation needs across the Emirates.',
      buttonText: 'Book Free Meeting'
    },
    {
      id: 2,
      bg: '/assets/img/slide2.JPG',
      title: 'Fast & Reliable Business Setup Solutions',
      description: 'From company formation to trade license processing, we handle all your business establishment requirements efficiently.',
      buttonText: 'Book Free Meeting'
    },
    {
      id: 3,
      bg: '/assets/img/slide3.PNG',
      title: 'Complete Immigration & Visa Services',
      description: 'Comprehensive support for residency visas, work permits, and all immigration-related documentation in the UAE.',
      buttonText: 'Book Free Meeting'
    }
  ];

  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          enabled: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        breakpoints={{
          0: {
            navigation: {
              enabled: false,
            },
          },
          768: {
            navigation: {
              enabled: true,
            },
          },
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full bg-gray-900">
              {/* Dark base layer - always visible immediately */}
              <div className="absolute inset-0 bg-gray-900" />

              {/* Background Image layer with integrated dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center text-white max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16">
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-body mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.button
                    className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const whatsappNumber = "+971529794631";
                      const message = `Hello! I'm interested in ${slide.buttonText.toLowerCase()}. Could you please provide me with more information?`;
                      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    {slide.buttonText}
                  </motion.button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const ServicesSection = () => {

  const services = [
    {
      id: 1,
      icon: '�',
      image: '/assets/img/Services/License.PNG',
      title: 'License Services',
      description: 'Complete assistance with new license issuance, renewal, and modification for all types of business activities in the UAE.',
      features: ['New License Issuance', 'License Renewal', 'License Modification', 'Business Activity Updates']
    },
    {
      id: 2,
      icon: '🛂',
      image: '/assets/img/Services/visa.JPG',
      title: 'Visa Services',
      description: 'Professional visa processing services for employment, family, investor, and tourist visas with expert guidance.',
      features: ['Employment Visas', 'Family Visas', 'Investor Visas', 'Tourist Visas']
    },
    {
      id: 3,
      icon: '�',
      image: '/assets/img/Services/vat.PNG',
      title: 'VAT & Tax Services',
      description: 'Comprehensive VAT registration, filing, and tax consultation services to ensure compliance with UAE regulations.',
      features: ['VAT Registration', 'Tax Filing', 'Tax Consultation', 'Compliance Support']
    },
    {
      id: 4,
      icon: '�',
      image: '/assets/img/Services/banking.JPG',
      title: 'Banking Solutions',
      description: 'Expert assistance with business and corporate bank account opening across major UAE banks.',
      features: ['Business Bank Accounts', 'Corporate Banking', 'Account Setup Assistance', 'Banking Documentation']
    },
    {
      id: 5,
      icon: '™️',
      image: '/assets/img/Services/trademark.JPG',
      title: 'Trademark & Business Formation',
      description: 'Complete trademark registration and business formation services including company setup and registration.',
      features: ['Trademark Registration', 'Company Formation', 'Business Setup', 'Legal Documentation']
    },
    {
      id: 6,
      icon: '💳',
      image: '/assets/img/Services/payment.JPG',
      title: 'Payment Solutions',
      description: 'Modern payment solutions including payment links, gateways, and mobile POS devices for your business needs. ',
      features: ['Payment Links', 'Payment Gateways', 'Mobile POS Devices', 'Payment Integration']
    }
  ];

  return (
    <section id="services" className="pt-24 pb-5 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center mb-20">


          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-6 leading-tight">
            Our Services
          </h2>

          <SectionDivider />

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional document clearing and business services across the UAE,
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-semibold"> ensuring your paperwork is handled efficiently and accurately.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50 flex flex-col h-full"
            >

              {/* Enhanced icon badge */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-500 via-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl border-2 border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                {service.icon}
              </div>

              {/* Service number indicator */}
              <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  style={(service.image && (service.image.includes('/assets/img/Services/banking.JPG') || service.image.includes('/assets/img/Services/trademark.JPG'))) ? { objectPosition: 'top' } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              <div className="relative p-4 bg-gradient-to-b from-white to-gray-50/50 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-xl font-heading font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 font-body mb-5 leading-relaxed text-sm sm:text-base md:text-sm lg:text-base">
                    {service.description}
                  </p>

                  {/* Enhanced features list */}
                  <div className="mb-4">
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-xs sm:text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <BookMeetingBtn
                  text="Book Free Consultation"
                  className="w-full cursor-pointer bg-gradient-to-r from-teal-500 via-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold shadow-xl relative overflow-hidden mt-auto text-sm sm:text-base"
                  iconType="arrow"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-20">

        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Al Mansouri',
      company: 'Tech Solutions LLC',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'AL ABABIL provided exceptional service for our company setup. Their expertise in UAE regulations saved us months of paperwork hassles.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'International Consulting',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Professional, efficient, and reliable. They handled our visa applications flawlessly and kept us updated throughout the process.'
    },
    {
      id: 3,
      name: 'Mohammad Rahman',
      company: 'Gulf Trading Co.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Outstanding document clearing services. AL ABABIL team is knowledgeable, friendly, and delivers results on time.'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      company: 'Dubai Ventures',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      comment: 'Their PRO services are top-notch. Made our business registration process smooth and stress-free. Highly recommended!'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Happy Clients</h2>
          <SectionDivider />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
        </motion.div>

        {/* <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                className="bg-gray-50 rounded-xl p-8 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base">
                  "{testimonial.comment}"
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper> */}

        <>
          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="afterInteractive"
          />

          <div
            className="elfsight-app-37fd5c24-e261-4448-84e2-e2340b7c0908"
            data-elfsight-app-lazy
          />
        </>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-6">About AL ABABIL</h2>
          <SectionDivider delay={0.2} />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for document clearing and business services in the UAE.
          </p>
        </motion.div>

        {/* Long vertical content sections */}
        <div className="space-y-20">

          {/* Section 1: Company Introduction */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 mb-6">Who We Are</h3>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                AL ABABIL is a leading document clearing and business services company in the UAE,
                dedicated to simplifying government procedures and business processes for our clients.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                With years of experience navigating the UAE's regulatory landscape, we provide
                comprehensive solutions that save you time and ensure compliance with all government requirements.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/2199054272/photo/young-saudi-professionals-developing-ideas-for-new-business.jpg?s=1024x1024&w=is&k=20&c=aQyl7z7p6L8ppHlRsFu_6QBx-X78cC70M8tNklNqk8E="
                alt="AL ABABIL Team"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </motion.div>

          {/* Section 2: Our Services Overview */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="order-2 lg:order-1">
              <img
                src="https://media.istockphoto.com/id/1286642966/photo/adult-arabic-man-with-arabic-woman-in-hijab-pays-for-real-estate-agent-services-real-estate.webp?s=1024x1024&w=is&k=20&c=oZep1jFOA_EoPI8AZSpbX-wNM25qunTaSYA61IzY1G0="
                alt="Professional Services"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 mb-6">What We Do</h3>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                We specialize in visa processing, business setup, document attestation, PRO services,
                and complete business formation across all Emirates of the UAE.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Our comprehensive services ensure that whether you're an individual seeking visa assistance
                or a business looking to establish operations in the UAE, we have the expertise to guide you through every step.
              </p>
            </div>
          </motion.div>

          {/* Section 3: Our Mission & Values */}
          {/* <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                To provide efficient, reliable, and transparent document clearing services that enable
                individuals and businesses to achieve their goals in the UAE without bureaucratic complications.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg text-gray-700"><strong>Integrity:</strong> We maintain the highest ethical standards in all our dealings.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg text-gray-700"><strong>Excellence:</strong> We strive for perfection in every service we provide.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-base sm:text-lg text-gray-700"><strong>Client Focus:</strong> Your success is our primary objective.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/931709382/photo/businessman-arab-men-sitting-working-with-a-laptop-at-desk-in-office.webp?s=1024x1024&w=is&k=20&c=5yIhk7JB0HTlHYFuMm35DyLdg8-yCDg2dFVRFAR8wzE="
                alt="Professional Standards"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </motion.div> */}

          {/* Section 4: Our Team & Expertise */}
          {/* <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="order-2 lg:order-1">
              <img
                src="https://media.istockphoto.com/id/1522059630/photo/portrait-of-a-smart-focused-middle-eastern-programmer-working-on-computer-in-a-technological.webp?s=1024x1024&w=is&k=20&c=FjS-1-ydZK7-TWK0V9LrFD7vAPOD_sF7tnoz_5fCpqY="
                alt="AL ABABIL Expert Team"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 mb-6">Our Expert Team</h3>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                AL ABABIL is powered by a team of certified professionals, experienced PRO agents, and legal experts
                who bring years of specialized knowledge in UAE government procedures and business regulations.
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                Our multilingual team serves clients from diverse backgrounds, ensuring clear communication
                and culturally sensitive service delivery across all Emirates.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full mr-4"></div>
                  <p className="text-base text-gray-700">Certified PRO Agents with Government Authorization</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4"></div>
                  <p className="text-base text-gray-700">Legal Consultants with UAE Law Expertise</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-4"></div>
                  <p className="text-base text-gray-700">Multilingual Support in Arabic, English & Hindi</p>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Section 5: Our Track Record */}
          <motion.div
            className="text-center bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 mb-8">Our Track Record</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h4 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">500+</h4>
                <p className="text-gray-600 text-sm sm:text-base">Happy Clients</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">5+</h4>
                <p className="text-gray-600 text-sm sm:text-base">Years Experience</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">100%</h4>
                <p className="text-gray-600 text-sm sm:text-base">Success Rate</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">24/7</h4>
                <p className="text-gray-600 text-sm sm:text-base">Support</p>
              </div>
            </div>
          </motion.div>

          {/* Section 6: Call to Action */}
          {/* <motion.div
            className="text-center bg-white rounded-3xl p-12 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">

                <div>
                  <h4 className="font-bold text-gray-800">AL ABABIL</h4>
                  <p className="text-sm text-gray-600">Document Clearing Co.</p>
                </div>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us handle the paperwork while you focus on what matters most - growing your business and achieving your goals in the UAE.
            </p>
            <BookMeetingBtn
              text="Book Free Consultation"
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-sm sm:text-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-teal-500/25"
              whileTap={{ scale: 0.98 }}
              iconType="calendar"
            />
          </motion.div> */}

        </div>
      </div>
    </section>
  );
};

const CompanySliderSection: React.FC = () => {
  const companyImages: Array<{ id: number; src: string; alt: string }> = [
    { id: 1, src: '/assets/img/companySilderImages/1.png', alt: 'Company Image 1' },
    { id: 2, src: '/assets/img/companySilderImages/2.png', alt: 'Company Image 2' },
    { id: 3, src: '/assets/img/companySilderImages/3.png', alt: 'Company Image 3' },
    { id: 4, src: '/assets/img/companySilderImages/4.png', alt: 'Company Image 4' },
    { id: 5, src: '/assets/img/companySilderImages/5.png', alt: 'Company Image 5' },
    { id: 6, src: '/assets/img/companySilderImages/6.png', alt: 'Company Image 6' },
    { id: 7, src: '/assets/img/companySilderImages/7.png', alt: 'Company Image 7' },
    { id: 8, src: '/assets/img/companySilderImages/8.png', alt: 'Company Image 8' },
  ];

  // Triple duplicate images for seamless infinite scroll
  const duplicatedImages = [...companyImages, ...companyImages, ...companyImages];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-6"> We Deal With</h2>
          <SectionDivider />
          <p className="text-base sm:text-lg md:text-xl font-body text-gray-600 max-w-3xl mx-auto">
            We handle document processing and services with these official government companies and departments across the UAE.
          </p>
        </motion.div>

        {/* Continuous Scrolling Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -33.333 + '%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              style={{
                width: `${duplicatedImages.length * (100 / 6)}%`, // Based on desktop view (6 images)
              }}
            >
              {duplicatedImages.map((image, index) => (
                <motion.div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 w-24 sm:w-28 md:w-32 relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-transparent p-2">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain rounded-lg transition-all duration-500 group-hover:brightness-110 mx-auto bg-transparent"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUsSection = () => {

  const reasons = [
    {
      id: 1,
      icon: '⚡',
      title: 'Fast & Efficient Service',
      description: 'We streamline government procedures to save you time and ensure quick processing of your documents.',
      stats: '2-3 Days',
      statsLabel: 'Average Processing'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Expert Knowledge',
      description: 'Our team has extensive experience with UAE regulations and maintains up-to-date knowledge of all government requirements.',
      stats: '5+ Years',
      statsLabel: 'Experience'
    },
    {
      id: 3,
      icon: '💯',
      title: '100% Success Rate',
      description: 'We have a proven track record of successful applications and satisfied clients across all Emirates.',
      stats: '500+',
      statsLabel: 'Happy Clients'
    },
    {
      id: 4,
      icon: '🔒',
      title: 'Secure & Confidential',
      description: 'Your documents and personal information are handled with the highest level of security and confidentiality.',
      stats: '24/7',
      statsLabel: 'Support Available'
    },
    {
      id: 5,
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise charges. We provide clear, upfront pricing for all our services.',
      stats: '0%',
      statsLabel: 'Hidden Fees'
    },
    {
      id: 6,
      icon: '🌟',
      title: 'Personalized Service',
      description: 'Each client receives dedicated attention and customized solutions based on their specific requirements.',
      stats: '1-on-1',
      statsLabel: 'Personal Consultation'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-6">Why Choose AL ABABIL?</h2>
          <SectionDivider />
          <p className="text-base sm:text-lg md:text-xl font-body text-gray-600 max-w-3xl mx-auto">
            Discover what makes us the preferred choice for document clearing and business services in the UAE.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Icon and Stats */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                    {reason.stats}
                  </div>
                  <div className="text-xs sm:text-xs text-gray-500 uppercase tracking-wide">
                    {reason.statsLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-heading font-bold text-gray-800 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-body leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {reason.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <BookMeetingBtn
            text="Book Free Meeting"
            className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-teal-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            showIcon={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

const BannerSection = () => {
  return (
    <section className="py-0 bg-white">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-auto"
        >
          <img
            src="/assets/img/Banner.png"
            alt="AL ABABIL Banner"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      category: 'Services',
      question: 'What services does AL ABABIL provide?',
      answer: 'We provide comprehensive document clearing services including visa processing, business license applications, document attestation, PRO services, translation services, and complete business setup solutions across the UAE.'
    },
    {
      id: 2,
      category: 'Processing Time',
      question: 'How long does visa processing typically take?',
      answer: 'Visa processing times vary depending on the type of visa and current government processing times. Typically, residence visas take 5-10 working days, visit visas can be processed within 2-3 working days, and employment visas take 7-14 working days.'
    },

    {
      id: 4,
      category: 'Requirements',
      question: 'What documents are required for company formation?',
      answer: 'Required documents typically include passport copies of shareholders, NOC letters, office lease agreement, memorandum of association, and specific forms depending on the business activity and Emirate. We provide a complete checklist and guide you through each requirement.'
    },
    {
      id: 5,
      category: 'Support',
      question: 'How can I track the progress of my application?',
      answer: 'We provide regular updates via phone, email, or WhatsApp throughout the process. You can also contact our customer service team anytime for status updates. We maintain complete transparency about your application status.'
    },
    {
      id: 6,
      category: 'Pricing',
      question: 'How much do your services cost?',
      answer: 'Our pricing varies depending on the service type and complexity. We offer transparent, competitive pricing with no hidden fees. Contact  for a free consultation and detailed quote based on your specific requirements.'
    },
    {
      id: 7,
      category: 'Attestation',
      question: 'What is document attestation and why is it needed?',
      answer: 'Document attestation is the process of verifying the authenticity of documents by authorized government departments. It\'s required for educational certificates, marriage certificates, and commercial documents to be legally recognized in the UAE.'
    },
    {
      id: 8,
      category: 'Business Setup',
      question: 'Can you help with choosing the right business license type?',
      answer: 'Absolutely! We provide expert consultation to help you choose the most suitable business license type based on your business activities, target market, and long-term goals. We ensure compliance with all UAE regulations.'
    },
    // {
    //   id: 9,
    //   category: 'Translation',
    //   question: 'Do you provide certified translation services?',
    //   answer: 'Yes, we offer certified translation services for documents in Arabic, English, and other languages as required by UAE authorities. All translations are performed by certified translators and are legally recognized.'
    // },
    {
      id: 10,
      category: 'Consultation',
      question: 'Do you offer free consultations?',
      answer: 'Yes, we provide free initial consultations to understand your requirements and explain the best approach for your specific needs. This helps you make informed decisions before proceeding with any services.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <SectionDivider />
          <p className="text-base sm:text-lg md:text-xl font-body text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our document clearing and business services.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6 overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 "
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full cursor-pointer px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-blue-50/50 transition-all duration-300"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              >
                <div className="flex-1 ">
                  {/* <div className="flex items-center mb-2">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-xs font-accent font-semibold rounded-full mr-3">
                      {faq.category}
                    </span>
                  </div> */}
                  <h3 className="text-base sm:text-lg font-heading font-semibold text-gray-800 pr-4 group-hover:text-teal-700 transition-colors duration-300">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <FaChevronDown
                    className={`text-gray-500 text-lg transition-transform duration-300  ${openFAQ === faq.id ? 'transform rotate-180' : ''
                      }`}
                  />
                </div>
              </button>
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 bg-gradient-to-r from-teal-50/30 to-blue-50/30">
                      <div className="w-full h-px bg-gradient-to-r from-teal-200 to-blue-200 mb-4"></div>
                      <p className="text-sm sm:text-base text-gray-700 font-body leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">Contact </h2>
          <SectionDivider />
          <p className="text-base sm:text-lg md:text-xl font-body text-gray-300 max-w-3xl mx-auto">
            Ready to get started? Contact  today for professional document clearing services.
          </p>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to Simplify Your Business Setup?
              </h3>
              <p className="text-base sm:text-lg md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Schedule a free consultation with our experts and discover how we can streamline your document clearing process.
              </p>
            </motion.div>

            <BookMeetingBtn
              text="Book Free Meeting"
              className="bg-gradient-to-r from-teal-500 via-blue-500 to-blue-600 text-white px-8 py-4 sm:px-12 sm:py-6 rounded-2xl text-lg sm:text-xl font-semibold hover:from-teal-600 hover:via-blue-600 hover:to-blue-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 focus:ring-4 focus:ring-teal-300/50 relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              iconType="calendar"
            />
          </div>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold mb-3 text-white">Office Address</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                183 Al Nahda St - Al Twar Fifth - Dubai - United Arab Emirates<br />
                {/* United Arab Emirates */}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FaPhone className="text-white text-xl" />
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold mb-3 text-white">Phone Number</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-1">+971 52 979 4631</p>
              <p className="text-xs text-gray-400">Available 24/7</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold mb-3 text-white">Email Address</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-1">ababeldcs@gmail.com</p>
              <p className="text-xs text-gray-400">Response within 24 hours</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-teal-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30 hover:from-teal-500/25 hover:to-blue-600/25 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-semibold mb-3 text-teal-300">Business Hours</h3>
              <div className="space-y-1 text-xs text-gray-300">
                <div>Mon - Sat: 9AM - 6PM</div>
                <div>Sun: Closed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FindUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-800 mb-6">Find Us</h2>
          <SectionDivider />
          <p className="text-base sm:text-lg md:text-xl font-body text-gray-600 max-w-3xl mx-auto">
            Visit our office in the heart of Dubai's business district.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
        >

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.876384291!2d55.3848743!3d25.2644422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dd5aaab947b%3A0xd07e7ce645a081c!2sAL%20ABABIL%20DOCUMENTS%20CLEARING%20CO.!5e1!3m2!1sen!2s!4v1760348218930!5m2!1sen!2s"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61557408093406&mibextid=ZbWKwL', color: 'hover:text-blue-600', isExternal: true },
    { icon: FaInstagram, href: 'https://www.instagram.com/al_ababil_dcs?igsh=MWswaTFhdWJocmw0ag==', color: 'hover:text-pink-600', isExternal: true },
    { icon: FaWhatsapp, href: 'https://wa.me/971529794631?text=Hello%20I%20am%20interested%20in%20your%20services', color: 'hover:text-green-500', isExternal: true },
    { icon: FaEnvelope, href: 'mailto:ababeldcs@gmail.com', color: 'hover:text-green-600', isExternal: false }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <AlAbabilLogo />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">AL ABABIL</h3>
                <p className="text-xs sm:text-sm font-medium tracking-wider text-gray-400">
                  DOCUMENTS CLEARING CO.
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Your trusted partner for document clearing and business services in the UAE.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm sm:text-base text-gray-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Visa Services</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Business Setup</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Document Attestation</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">PRO Services</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm sm:text-base text-gray-300">
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Our Services</a></li>
              <li><a href="#faq" className="hover:text-teal-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg sm:text-xl font-semibold mb-6">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.isExternal ? '_blank' : '_self'}
                    rel={social.isExternal ? 'noopener noreferrer' : undefined}
                    className={`text-2xl ${social.color} transition-colors`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm sm:text-base text-gray-300">
              <FaPhone className="inline mr-2" />
              +971 52 979 4631
            </p>
            <p className="text-sm sm:text-base text-gray-300 mt-2">
              <FaEnvelope className="inline mr-2" />
              ababeldcs@gmail.com
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © 2024 AL ABABIL Document Clearing Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSlider />
      <ServicesSection />
      <TestimonialsSection />
      <AboutSection />
      <CompanySliderSection />
      <WhyChooseUsSection />
      {/* <BannerSection /> */}
      <FAQSection />
      <ContactSection />
      <FindUsSection />
      <Footer />
    </div>
  );
}
