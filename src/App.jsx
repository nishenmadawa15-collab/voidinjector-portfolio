import CyberBackground from './components/CyberBackground'
import Navbar from './components/Navbar'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SectionDivider from './components/SectionDivider'
import ProfileDashboard from './components/ProfileDashboard'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import CTF from './components/CTF'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * VOIDINJECTOR — Three.js hero + cyber archive.
 * AI × Cyber Core section removed per request.
 */
export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050806] text-[#E8FFF0]">
      {/* Soft page-wide cyber field (behind hero 3D + content) */}
      <div className="fixed inset-0 z-0">
        <CyberBackground />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <SectionOne />
          <SectionTwo />

          <SectionDivider label="ARCHIVE" />

          <div className="relative border-t border-[#00FF55]/10 bg-gradient-to-b from-[#050806]/40 via-[#050806]/7 to-[#050806]/9">
            <ProfileDashboard />
            <SectionDivider label="ARSENAL" />
            <Skills />
            <SectionDivider label="MISSIONS" />
            <Projects />
            <SectionDivider label="CREDENTIALS" />
            <Certifications />
            <SectionDivider label="CTF_OPS" />
            <CTF />
            <SectionDivider label="CONTACT" />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}
