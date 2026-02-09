import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDark(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b transition-all" style={{ background: 'var(--navbar-bg)', borderColor: 'var(--border-color)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>OpportunityHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Features</a>
              <a href="#how-it-works" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>How It Works</a>
              <a href="#why-choose-us" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Why Us</a>
              <a href="#pricing" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                <div className="theme-toggle-slider">
                  <span>{isDark ? '☀️' : '🌙'}</span>
                </div>
              </button>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost">Sign In</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden icon-btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="px-4 py-6 space-y-3">
              <a href="#features" className="block py-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Features</a>
              <a href="#how-it-works" className="block py-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>How It Works</a>
              <a href="#why-choose-us" className="block py-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Why Us</a>
              <a href="#pricing" className="block py-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
              <div className="pt-4 space-y-2">
                <Link to="/login" className="btn btn-ghost w-full block text-center">Sign In</Link>
                <Link to="/register" className="btn btn-primary w-full block text-center">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="section relative overflow-hidden" style={{ paddingTop: '5rem' }}>
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="badge">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Over 5,000 students placed
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-hero mb-6" style={{ color: 'var(--text-primary)' }}>
              Find Your Perfect
              <br />
              <span className="typewriter">
                <span className="gradient-text inline-block">Internship &amp; Attachment</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg max-w-3xl mx-auto mb-10">
              Connect with top companies across Kenya. Browse thousands of verified <b>internship</b> and <b>industrial attachment</b> opportunities. Simple application process, secure payments, instant updates. Whether you need an internship or an attachment, we have you covered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/register" className="btn btn-primary group">
                <span>Start Your Journey</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="#how-it-works" className="btn btn-secondary group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Free to sign up</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Verified companies</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Instant notifications</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: '10K+', label: 'Placements' },
              { number: '95%', label: 'Success Rate' },
              { number: '500+', label: 'Companies' },
              { number: '45K', label: 'Avg Salary' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-xl mb-4" style={{ color: 'var(--text-primary)' }}>Everything You Need to Succeed</h2>
            <p className="text-body-lg">
              Powerful features designed to make your <b>internship</b> and <b>attachment</b> search effortless and successful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Smart Search', description: 'Advanced filters to find internship and attachment opportunities that match your skills, location, and career goals perfectly.' },
              { icon: '✓', title: 'Verified Companies', description: 'Every company is thoroughly vetted to ensure you\'re applying to legitimate, reputable organizations.' },
              { icon: '⚡', title: 'Instant Apply', description: 'Apply to multiple internship and attachment positions with one click using your saved profile and documents.' },
              { icon: '📈', title: 'Real-Time Alerts', description: 'Get instant notifications when companies view your profile or update your application status.' },
              { icon: '🏆', title: 'Career Analytics', description: 'Track your applications, see which companies are interested, and optimize your profile for success.' },
              { icon: '💬', title: '24/7 Support', description: 'Our dedicated support team is always available to help you with any questions or concerns.' }
            ].map((feature, i) => (
              <div key={i} className="card group hover:border-indigo-600">
                <div className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}></div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white text-2xl" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-xl mb-4" style={{ color: 'var(--text-primary)' }}>Get Started in Minutes</h2>
            <p className="text-body-lg">Simple, straightforward process from signup to placement</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {[
              { num: 1, title: 'Create Your Profile', desc: 'Sign up in seconds and build your professional profile with your skills, education, and experience.' },
              { num: 2, title: 'Browse & Apply', desc: 'Search thousands of verified opportunities and apply to multiple positions with one click.' },
              { num: 3, title: 'Get Hired', desc: 'Receive instant updates, connect with employers, and start your dream internship or attachment.' }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg text-3xl font-bold text-white" style={{ background: step.num === 1 ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : step.num === 2 ? 'linear-gradient(135deg, #ec4899, #f43f5e)' : 'linear-gradient(135deg, #10b981, #059669)' }}>
                    {step.num}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/register" className="btn btn-primary btn-lg group">
              <span>Start Your Free Account</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-xl mb-4" style={{ color: 'var(--text-primary)' }}>Why Students Choose Us</h2>
            <p className="text-body-lg">
              We're the most trusted platform for <b>internships</b> and <b>industrial attachments</b> in Kenya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: '🔒', title: '100% Verified', description: 'Every company is thoroughly vetted. No scams, only legitimate opportunities.' },
              { icon: '⚡', title: 'Lightning Fast', description: 'Apply in seconds with your saved profile. Get responses within 24-48 hours.' },
              { icon: '💰', title: 'Best Value', description: 'Only KSh 350 per application. No subscriptions, no hidden fees.' },
              { icon: '🎯', title: '24/7 Support', description: 'Real humans ready to help. Chat, email, or phone support anytime.' }
            ].map((reason, i) => (
              <div key={i} className="card text-center">
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{reason.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{reason.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Secure Payments</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>SSL encrypted. Your data is safe with us.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Instant Updates</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Real-time notifications via SMS and email.</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>95% Success Rate</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Most students get placed within 2 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-12" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Trusted by Top Companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {['Safaricom', 'Equity Bank', 'KCB Group', 'KPLC', 'Co-op Bank', 'Airtel Kenya'].map((company, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--text-secondary)' }}>{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-xl mb-4" style={{ color: 'var(--text-primary)' }}>Simple, Transparent Pricing</h2>
            <p className="text-body-lg">
              Browse thousands of <b>internship</b> and <b>attachment</b> opportunities for free. Pay only when you're ready to apply.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card" style={{ borderColor: '#6366f1', borderWidth: '2px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <div className="inline-block mb-4">
                    <span className="badge inline-flex" style={{ background: '#6366f1', color: 'white', border: 'none' }}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Most Popular Choice
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Pay Per Application</h3>
                  <div className="mb-6">
                    <span className="text-6xl font-bold" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>KSh 329</span>
                    <span className="text-xl" style={{ color: 'var(--text-secondary)' }}>/application</span>
                  </div>
                  <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Only charged when you submit an application. Browse and search <b>internship</b> and <b>attachment</b> opportunities completely free!
                  </p>
                  <Link to="/register" className="btn btn-primary">
                    Start Browsing Free
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-lg" style={{ color: 'var(--text-primary)' }}>What's Included:</h4>
                  <ul className="space-y-3">
                    {['Direct application to company', 'Application tracking & updates', 'SMS & email notifications', 'Priority support access', 'Secure M-Pesa payment', 'Application receipt & confirmation'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Always Free:</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Create account • Browse all <b>internship</b> and <b>attachment</b> opportunities • Build your profile • Save favorites • Get job alerts • Company research
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                <svg className="w-5 h-5 text-green-500 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                You'll only be prompted to pay when you click "Submit Application"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">OpportunityHub</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Connecting talented students with their dream <b>internships</b> and <b>attachments</b> across Kenya.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Product</h4>
              <ul className="space-y-2 text-sm">
                {['Features', 'Pricing', 'How It Works', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Company</h4>
              <ul className="space-y-2 text-sm">
                {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Legal</h4>
              <ul className="space-y-2 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}>
            <p>&copy; 2026 OpportunityHub. All rights reserved. Made with ❤️ in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
