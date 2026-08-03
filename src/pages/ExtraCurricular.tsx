import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Music, Users, Star, Dumbbell, Target, BookOpen, Mic } from 'lucide-react';
import { getActivities } from '../lib/store';

interface Activity {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

const ProgramCard: React.FC<{ prog: Activity & { icon: React.FC<{ size?: number; className?: string }> } }> = ({ prog }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group"
  >
    <div className="aspect-video bg-[#EBF5FF] flex items-center justify-center relative">
      <prog.icon size={64} className="text-[#DAA520]/40" />
      <div className="absolute inset-0 bg-[#DAA520] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <prog.icon size={48} className="text-white" />
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
          prog.category === 'Sport' ? 'bg-[#FFE5E5] text-[#1E3A5F]' :
          prog.category === 'Academic' ? 'bg-[#EBF5FF] text-[#1E3A5F]' :
          'bg-orange-100 text-orange-700'
        }`}>{prog.category}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{prog.name}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{prog.description}</p>
    </div>
  </motion.div>
);

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  'Soccer': Target,
  'Netball': Users,
  'Athletics': Trophy,
  'Debating': Mic,
  'Spelling Bee': BookOpen,
  'Choir': Music,
  'Drama': Star,
};

export const ExtraCurricular = () => {
  const [activities, setActivities] = useState<Activity[]>(getActivities());

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const sports = activities.filter(a => a.category === 'Sport');
  const academic = activities.filter(a => a.category === 'Academic');
  const culture = activities.filter(a => a.category === 'Culture');

  const withIcon = (a: Activity) => ({ ...a, icon: iconMap[a.name] || Star });

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">Sports & Culture</h1>

        <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          At Rode SSS, we believe in a holistic education. Our extra-curricular programs are designed to discover and nurture the diverse talents of our learners.
        </p>

        {sports.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8 flex items-center gap-3">
              <Dumbbell className="text-[#1E3A5F]" /> Sports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sports.map(a => <ProgramCard key={a.id} prog={withIcon(a)} />)}
            </div>
          </section>
        )}

        {academic.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8 flex items-center gap-3">
              <BookOpen className="text-[#1E3A5F]" /> Academic Programmes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {academic.map(a => <ProgramCard key={a.id} prog={withIcon(a)} />)}
            </div>
          </section>
        )}

        {culture.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8 flex items-center gap-3">
              <Music className="text-[#1E3A5F]" /> Arts & Culture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {culture.map(a => <ProgramCard key={a.id} prog={withIcon(a)} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
