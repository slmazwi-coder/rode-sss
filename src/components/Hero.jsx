import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const SLIDES = [
  { caption: 'Rise and Shine',             sub: 'Where Dreams Take Flight' },
  { caption: 'Three Streams of Excellence',     sub: 'General · Science · Commerce' },
  { caption: 'Building Tomorrow\'s Leaders',    sub: 'Grade 8 to Grade 12' },
  { caption: 'Our Learners, Our Pride',         sub: 'Every learner has a unique story' },
  { caption: 'Admissions 2027 Open',            sub: 'Apply now for next year' },
]

const STATS = [
  { value: 'Grade 8–12', label: 'Secondary School' },
  { value: '3',           label: 'Academic Streams' },
  { value: 'NSC',         label: 'National Senior Certificate' },
  { value: 'Public',      label: 'Public School' },
]

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const prev = () => setIdx(i => (i - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setIdx(i => (i + 1) % SLIDES.length)

  return (
    <section className="relative overflow-hidden diagonal-strip" style={{ minHeight: '88vh', background: '#1E3A5F' }}>

      <div className="absolute inset-0">
        <img
          src="/assets/matric-class.jpg"
          alt="Rode SSS Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(30,58,95,0.82)' }} />
      </div>

      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #DAA520 0, #DAA520 1px, transparent 0, transparent 50%)',
        backgroundSize: '32px 32px',
      }} />

      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#DAA520' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: '78vh' }}>
        <div className="max-w-3xl pt-16 pb-8">

          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] mb-6 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(218,165,32,0.15)', color: '#FFFFFF', border: '1px solid rgba(218,165,32,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#DAA520' }} />
            {SLIDES[idx].sub}
          </div>

          <h1 className="font-display font-black mb-6 fade-up" style={{
            fontSize: 'clamp(2.25rem, 6vw, 4rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}>
            {SLIDES[idx].caption}
          </h1>

          <p className="text-lg mb-8 max-w-xl delay-1 fade-up" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Rode Senior Secondary School — Eastern Cape, South Africa.
          </p>

          <div className="flex flex-wrap gap-3 delay-2 fade-up">
            <Link to="/admissions" className="btn-primary">
              Apply Now <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline">
              About Us
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(218,165,32,0.15)', color: '#FFFFFF' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(218,165,32,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(218,165,32,0.15)' }}
            aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? '24px' : '8px',
                  height: '8px',
                  background: i === idx ? '#DAA520' : 'rgba(218,165,32,0.3)',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(218,165,32,0.15)', color: '#FFFFFF' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(218,165,32,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(218,165,32,0.15)' }}
            aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative z-10" style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(218,165,32,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={i}
                className="py-5 px-4 text-center"
                style={{ borderRight: i < 3 ? '1px solid rgba(218,165,32,0.15)' : 'none' }}
              >
                <p className="font-display font-black text-2xl sm:text-3xl" style={{ color: '#FFFFFF' }}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
