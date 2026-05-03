import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, LogOut, Plus, Trash2, Edit3, Save, X,
  MapPin, Users, HelpCircle, Award, Eye, EyeOff, ChevronRight
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Monument {
  id: string;
  name: string;
  location: string;
  points: number;
  description: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

interface AdminData {
  monuments: Monument[];
  badges: string[];
  quizzes: Record<string, QuizQuestion[]>;
}

// ─── Default seed data ───────────────────────────────────────────────────────

const defaultData: AdminData = {
  monuments: [
    { id: "qutub", name: "Qutub Minar", location: "New Delhi", points: 100, description: "Tallest brick minaret in the world." },
    { id: "taj",   name: "Taj Mahal",   location: "Agra",      points: 150, description: "UNESCO World Heritage ivory-white marble mausoleum." },
    { id: "red",   name: "Red Fort",    location: "New Delhi", points: 120, description: "Historic fort that served as the main residence of Mughal emperors." },
  ],
  badges: ["Explorer", "History Master", "Quiz Champion"],
  quizzes: {
    qutub: [
      { question: "Who built Qutub Minar?", options: ["Akbar", "Qutb ud-Din Aibak", "Shah Jahan", "Humayun"], answer: 1 },
    ],
    taj: [
      { question: "When was the Taj Mahal completed?", options: ["1648", "1700", "1556", "1601"], answer: 0 },
    ],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "pastport2024";

const TabIcon: Record<string, JSX.Element> = {
  monuments: <MapPin size={16} />,
  users:     <Users size={16} />,
  quizzes:   <HelpCircle size={16} />,
  badges:    <Award size={16} />,
};

// ─── Login ───────────────────────────────────────────────────────────────────

function LoginPanel({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]         = useState("");
  const [show, setShow]     = useState(false);
  const [error, setError]   = useState(false);
  const [shake, setShake]   = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <motion.div
        animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
            <Shield className="text-amber-400" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Access</h1>
          <p className="text-slate-400 text-sm mt-1">pastportl control panel</p>
        </div>

        {/* Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              onKeyDown={e => e.key === "Enter" && attempt()}
              placeholder="Enter admin password"
              className={`w-full bg-slate-800 border rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-500 text-sm outline-none transition-all
                ${error ? "border-red-500/70 focus:border-red-500" : "border-slate-700 focus:border-amber-500/60"}`}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs"
            >
              Incorrect password. Try again.
            </motion.p>
          )}

          <button
            onClick={attempt}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            Enter Dashboard <ChevronRight size={16} />
          </button>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Default password: <span className="text-slate-500 font-mono">pastport2024</span>
        </p>
      </motion.div>
    </div>
  );
}

// ─── Monuments Tab ───────────────────────────────────────────────────────────

function MonumentsTab({ data, setData }: { data: AdminData; setData: (d: AdminData) => void }) {
  const [editing, setEditing] = useState<Monument | null>(null);
  const [adding, setAdding]   = useState(false);
  const blank: Monument = { id: "", name: "", location: "", points: 100, description: "" };
  const [form, setForm]       = useState<Monument>(blank);

  const save = () => {
    if (!form.name || !form.id) return;
    const monuments = editing
      ? data.monuments.map(m => m.id === editing.id ? form : m)
      : [...data.monuments, form];
    setData({ ...data, monuments });
    setEditing(null);
    setAdding(false);
    setForm(blank);
  };

  const remove = (id: string) => {
    setData({ ...data, monuments: data.monuments.filter(m => m.id !== id) });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm">{data.monuments.length} monuments</span>
        <button
          onClick={() => { setAdding(true); setForm(blank); setEditing(null); }}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={13} /> Add Monument
        </button>
      </div>

      <AnimatePresence>
        {(adding || editing) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3"
          >
            <p className="text-white text-sm font-semibold">{editing ? "Edit Monument" : "New Monument"}</p>
            <div className="grid grid-cols-2 gap-2">
              {(["id","name","location"] as const).map(k => (
                <input key={k} placeholder={k.charAt(0).toUpperCase()+k.slice(1)}
                  value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60 col-span-1"
                />
              ))}
              <input type="number" placeholder="Points"
                value={form.points} onChange={e => setForm({...form, points: +e.target.value})}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60"
              />
            </div>
            <textarea placeholder="Description" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={2}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60 resize-none"
            />
            <div className="flex gap-2">
              <button onClick={save} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                <Save size={13} /> Save
              </button>
              <button onClick={() => { setEditing(null); setAdding(false); }} className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                <X size={13} /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {data.monuments.map(m => (
        <motion.div key={m.id} layout
          className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-start justify-between gap-3"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-medium text-sm">{m.name}</span>
              <span className="text-amber-400 text-xs font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">{m.points}pts</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">{m.location} · <span className="font-mono text-slate-500">{m.id}</span></p>
            <p className="text-slate-500 text-xs mt-1 line-clamp-1">{m.description}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button onClick={() => { setEditing(m); setForm(m); setAdding(false); }}
              className="text-slate-400 hover:text-amber-400 transition-colors p-1.5 hover:bg-amber-500/10 rounded-lg">
              <Edit3 size={14} />
            </button>
            <button onClick={() => remove(m.id)}
              className="text-slate-400 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg">
              <Trash2 size={14} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Badges Tab ───────────────────────────────────────────────────────────────

function BadgesTab({ data, setData }: { data: AdminData; setData: (d: AdminData) => void }) {
  const [newBadge, setNewBadge] = useState("");

  const add = () => {
    if (!newBadge.trim() || data.badges.includes(newBadge.trim())) return;
    setData({ ...data, badges: [...data.badges, newBadge.trim()] });
    setNewBadge("");
  };

  const remove = (b: string) => setData({ ...data, badges: data.badges.filter(x => x !== b) });

  const BADGE_COLORS = ["bg-amber-500/20 text-amber-300 border-amber-500/30","bg-purple-500/20 text-purple-300 border-purple-500/30","bg-green-500/20 text-green-300 border-green-500/30","bg-blue-500/20 text-blue-300 border-blue-500/30","bg-pink-500/20 text-pink-300 border-pink-500/30"];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={newBadge} onChange={e => setNewBadge(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="New badge name…"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60"
        />
        <button onClick={add} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.badges.map((b, i) => (
          <div key={b} className={`flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm font-medium ${BADGE_COLORS[i % BADGE_COLORS.length]}`}>
            <Award size={13} />
            {b}
            <button onClick={() => remove(b)} className="opacity-60 hover:opacity-100 transition-opacity">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quizzes Tab ─────────────────────────────────────────────────────────────

function QuizzesTab({ data, setData }: { data: AdminData; setData: (d: AdminData) => void }) {
  const [selectedId, setSelectedId] = useState(data.monuments[0]?.id ?? "");
  const questions = data.quizzes[selectedId] ?? [];

  const addQ = () => {
    const updated = { ...data.quizzes, [selectedId]: [...questions, { question: "", options: ["","","",""], answer: 0 }] };
    setData({ ...data, quizzes: updated });
  };

  const removeQ = (qi: number) => {
    const updated = { ...data.quizzes, [selectedId]: questions.filter((_, i) => i !== qi) };
    setData({ ...data, quizzes: updated });
  };

  const updateQ = (qi: number, field: keyof QuizQuestion, value: string | number | string[]) => {
    const qs = questions.map((q, i) => i === qi ? { ...q, [field]: value } : q);
    setData({ ...data, quizzes: { ...data.quizzes, [selectedId]: qs } });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {data.monuments.map(m => (
          <button key={m.id} onClick={() => setSelectedId(m.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedId === m.id ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
            {m.name}
          </button>
        ))}
      </div>

      {selectedId && (
        <div className="space-y-3">
          {questions.map((q, qi) => (
            <div key={qi} className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="text-slate-400 text-xs font-mono">Q{qi+1}</span>
                <button onClick={() => removeQ(qi)} className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
              <input value={q.question} onChange={e => updateQ(qi, "question", e.target.value)}
                placeholder="Question text"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500/60"
              />
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <button onClick={() => updateQ(qi, "answer", oi)}
                      className={`w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${q.answer === oi ? "border-green-500 bg-green-500" : "border-slate-600"}`}
                    />
                    <input value={opt} onChange={e => {
                        const opts = [...q.options]; opts[oi] = e.target.value;
                        updateQ(qi, "options", opts);
                      }}
                      placeholder={`Option ${oi+1}`}
                      className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500/60"
                    />
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs">● = correct answer</p>
            </div>
          ))}
          <button onClick={addQ}
            className="w-full border border-dashed border-slate-700 hover:border-amber-500/40 text-slate-500 hover:text-amber-400 rounded-xl py-3 text-sm flex items-center justify-center gap-2 transition-colors">
            <Plus size={14} /> Add Question
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Users Tab ───────────────────────────────────────────────────────────────

function UsersTab() {
  // Reads from localStorage (same key used by storage.ts)
  const raw = localStorage.getItem("userProgress");
  const progress = raw ? JSON.parse(raw) : null;

  if (!progress) return (
    <div className="text-center py-12">
      <Users className="mx-auto text-slate-700 mb-3" size={32} />
      <p className="text-slate-500 text-sm">No user progress found yet.</p>
      <p className="text-slate-600 text-xs mt-1">Play the app first to generate data.</p>
    </div>
  );

  const stats = [
    { label: "Points", value: progress.points ?? 0, color: "text-amber-400" },
    { label: "Visited", value: (progress.visited ?? []).length, color: "text-blue-400" },
    { label: "Quizzes", value: progress.quizzesCompleted ?? 0, color: "text-green-400" },
    { label: "Badges", value: (progress.badges ?? []).length, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-xs">Live data from localStorage</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      {(progress.badges ?? []).length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs mb-2">Earned Badges</p>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((b: string) => (
              <span key={b} className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Award size={10} /> {b}
              </span>
            ))}
          </div>
        </div>
      )}
      {(progress.visited ?? []).length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-xs mb-2">Visited Monuments</p>
          <div className="flex flex-wrap gap-1.5">
            {progress.visited.map((id: string) => (
              <span key={id} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded font-mono">{id}</span>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => { localStorage.removeItem("userProgress"); window.location.reload(); }}
        className="w-full border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 rounded-xl py-2.5 text-sm flex items-center justify-center gap-2 transition-colors">
        <Trash2 size={14} /> Reset User Progress
      </button>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

const TABS = ["monuments", "users", "quizzes", "badges"] as const;
type Tab = typeof TABS[number];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("monuments");
  const [data, setData] = useState<AdminData>(defaultData);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-amber-400" size={18} />
            <span className="font-semibold text-sm tracking-tight">pastportl admin</span>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors capitalize
                ${tab === t ? "bg-amber-500 text-slate-950" : "text-slate-500 hover:text-slate-300"}`}>
              {TabIcon[t]} {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "monuments" && <MonumentsTab data={data} setData={setData} />}
            {tab === "users"     && <UsersTab />}
            {tab === "quizzes"   && <QuizzesTab data={data} setData={setData} />}
            {tab === "badges"    && <BadgesTab data={data} setData={setData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function AdminScreen({ onBack }: { onBack: () => void }) {
  const [authed, setAuthed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950">
      <AnimatePresence mode="wait">
        {!authed ? (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute top-4 left-4">
              <button onClick={onBack} className="text-slate-500 hover:text-white text-sm flex items-center gap-1 transition-colors">
                <X size={14} /> Close
              </button>
            </div>
            <LoginPanel onLogin={() => setAuthed(true)} />
          </motion.div>
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard onLogout={() => { setAuthed(false); onBack(); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}