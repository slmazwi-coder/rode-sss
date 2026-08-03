import React from 'react';
import { User } from 'lucide-react';

const staffData = [
  { name: 'Principal', position: 'Principal', category: 'Leadership' },
  { name: 'Deputy Principal', position: 'Deputy Principal', category: 'Leadership' },
  { name: 'HOD — General Stream', position: 'Head of Department', subject: 'General Stream', category: 'Leadership' },
  { name: 'HOD — Science Stream', position: 'Head of Department', subject: 'Science Stream', category: 'Leadership' },
  { name: 'HOD — Commerce Stream', position: 'Head of Department', subject: 'Commerce Stream', category: 'Leadership' },

  { name: 'Class Teacher', position: 'Class Teacher — Grade 8A', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 8B', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 9A', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 9B', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 10A', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 10B', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 11A', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 11B', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 12A', category: 'Class Teachers' },
  { name: 'Class Teacher', position: 'Class Teacher — Grade 12B', category: 'Class Teachers' },

  { name: 'School Administrator', position: 'School Administrator', category: 'Support Staff' },
  { name: 'Security Officer', position: 'Security Officer', category: 'Support Staff' },
];

const categories = ['Leadership', 'Class Teachers', 'Support Staff'];

const StaffCard = ({ member }: { member: typeof staffData[number] }) => (
  <div
    className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center p-6 text-center hover:-translate-y-1"
    style={{ background: '#FFF8E1', border: '1px solid #DAA520' }}
  >
    <div
      className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden"
      style={{ background: '#EBF5FF', border: '3px solid #DAA520' }}
    >
      <User size={40} style={{ color: '#DAA520', opacity: 0.5 }} />
    </div>

    <h3 className="text-sm font-bold leading-tight" style={{ color: '#1E3A5F' }}>
      {member.name}
    </h3>
    <p className="text-xs font-semibold mt-1" style={{ color: '#1E3A5F' }}>
      {member.position}
    </p>
    {member.subject && (
      <span
        className="mt-2 inline-block text-xs font-medium px-3 py-1 rounded-full"
        style={{ background: '#EBF5FF', color: '#1E3A5F', border: '1px solid #DAA520' }}
      >
        {member.subject}
      </span>
    )}
  </div>
);

export const Staff = () => {
  const [activeCategory, setActiveCategory] = React.useState('Leadership');
  const filtered = staffData.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: '#EBF5FF' }}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3" style={{ color: '#1E3A5F' }}>
            Our Staff
          </h1>
          <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: '#DAA520' }} />
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Meet the dedicated team of educators and support staff at Rode Senior Secondary School.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
              style={
                activeCategory === cat
                  ? { background: '#DAA520', color: '#fff', boxShadow: '0 4px 12px rgba(218,165,32,0.35)' }
                  : { background: '#fff', color: '#1E3A5F', border: '1px solid rgba(218,165,32,0.4)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((member, i) => (
            <StaffCard key={i} member={member} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="card max-w-2xl mx-auto" style={{ borderTop: '4px solid #DAA520' }}>
            <p className="text-sm" style={{ color: '#4b5563' }}>
              Staff names and photos will be updated as information is provided by the school.
              Contact us at <strong>078 640 3623</strong> for enquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
