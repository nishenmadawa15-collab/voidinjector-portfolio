import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import CTF from './components/CTF'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import Background from './components/Background'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <CTF />
        <Certifications />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
