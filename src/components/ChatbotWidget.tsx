import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { getApplications } from '../lib/store'

const SYSTEM = `You are a helpful, warm assistant for Rode Senior Secondary School in the Eastern Cape, South Africa.

School facts:
- Phone: 078 640 3623
- Email: coming soon
- Address: Rode, Eastern Cape, South Africa
- Grades 8–12, public school
- Motto: Rise and Shine (Where Dreams Take Flight)
- Three streams: General (Languages, Tourism, History, Geography, Maths Literacy, L.O), Science (Languages, L.O, Maths, Physics, Life Sciences, Geo/Agriculture), Commerce (Languages, L.O, Accounting, Business Studies, Economics, Maths/Maths Lit)
- 2027 admission applications currently open
- School hours: Mon–Thu 07:30–15:30, Fri 07:30–13:30
- Sports: Soccer, Netball, Athletics
- Activities: Debating, Spelling Bee, Choir, Drama

Be concise, warm and helpful. If unsure, direct them to call the school.`

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const QUICK = [
  'How do I apply for admission?',
  'What streams do you offer?',
  'What documents do I need?',
  'What are your school hours?',
]

async function askClaude(userMsg: string) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
    }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return data.content?.filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('\n').trim() || ''
}

function parseStatusQuery(text: string) {
  const t = text.toLowerCase()
  const m = t.match(/(\d{4}-\d{6})/)
  if (m) return m[1].toUpperCase()
  return null
}

export default function ChatbotWidget() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [busy, setBusy]       = useState(false)
  const [messages, setMessages] = useState([{
    id: uid(), role: 'bot',
    text: "Hello! I'm the Rode SSS assistant. Ask me anything about admissions, streams, or school life!",
  }])
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150) }, [open])

  const addMsg = (role: string, text: string) => setMessages(p => [...p, { id: uid(), role, text }])

  const send = async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || busy) return
    addMsg('user', text)
    setInput('')
    setBusy(true)
    try {
      const sn = parseStatusQuery(text)
      if (sn) {
        const app = getApplications().find((a: { studentNumber?: string }) => a.studentNumber?.toUpperCase() === sn)
        addMsg('bot', app
          ? `I found the application for ${app.firstName} ${app.lastName} (${sn}). Status: **${app.status}**. Submitted: ${app.submittedDate}.`
          : `I couldn't find an application with student number ${sn}. Please double-check the number or contact the school office.`)
        return
      }
      const reply = await askClaude(text)
      addMsg('bot', reply)
    } catch {
      addMsg('bot', 'I\'m having trouble connecting right now. Please contact the school directly at 078 640 3623.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {open && (
        <div className="fixed z-50 bottom-20 right-3 sm:right-6 flex flex-col"
          style={{
            width: 'min(375px, calc(100vw - 1.5rem))',
            height: 'min(560px, 72vh)',
            background: '#fff',
            borderRadius: '1.25rem',
            boxShadow: '0 24px 64px rgba(30,58,95,0.18)',
            border: '1px solid rgba(218,165,32,0.2)',
            overflow: 'hidden',
          }}>

          <div className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: '#1E3A5F', borderBottom: '3px solid #DAA520' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#DAA520' }}>
                <Sparkles size={15} style={{ color: '#FFFFFF' }} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight" style={{ color: '#FFFFFF' }}>Rode Assistant</p>
                <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400 inline-block" />
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg transition-colors"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(218,165,32,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '' }}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#FFFFFF' }}>
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                  style={m.role === 'user'
                    ? { background: '#1E3A5F', color: '#FFFFFF' }
                    : { background: '#fff', color: '#374151', border: '1px solid rgba(218,165,32,0.15)' }
                  }>
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 text-sm"
                  style={{ background: '#fff', border: '1px solid rgba(218,165,32,0.15)' }}>
                  <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#DAA520', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#DAA520', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#DAA520', animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: 'rgba(218,165,32,0.1)', color: '#1E3A5F', border: '1px solid rgba(218,165,32,0.2)' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-3 shrink-0" style={{ borderTop: '1px solid rgba(218,165,32,0.12)' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask a question..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border outline-none"
              style={{ borderColor: 'rgba(218,165,32,0.2)' }}
            />
            <button onClick={() => send()}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: '#DAA520', color: '#FFFFFF' }}
              disabled={busy || !input.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        className="fixed z-50 bottom-4 right-3 sm:right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: '#DAA520', color: '#FFFFFF' }}
        aria-label="Chat">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  )
}
