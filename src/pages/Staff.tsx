import React from 'react';
import { User, Phone } from 'lucide-react';
import { STAFF } from '../lib/store';

type Member = { name: string; position: string; subject?: string };

const CATEGORIES = ['Leadership', 'Class Teachers', 'Educators', 'Support Staff'] as const;
type Category = typeof CATEGORIES[number];

const StaffCard = ({ member }: { member: Member }) => (
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
  const [activeCategory, setActiveCategory] = React.useState<Category>('Leadership');

  const leadership: Member[] = STAFF.leadership.map(({ name, role }) => ({
    name,
    position: role,
  }));

  const classTeachers: Member[] = STAFF.classTeachers.map(({ className, teacher }) => ({
    name: teacher,
    position: `Class Teacher — Grade ${className}`,
  }));

  const educators: Member[] = STAFF.educators.map(({ name }) => ({
    name,
    position: 'Educator',
  }));

  const support: Member[] = STAFF.support.flatMap(({ group, members }) =>
    members.map(({ name }) => ({ name, position: group })),
  );

  const byCategory: Record<Category, Member[]> = {
    'Leadership':     leadership,
    'Class Teachers': classTeachers,
    'Educators':      educators,
    'Support Staff':  support,
  };

  const filtered = byCategory[activeCategory];

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
          {CATEGORIES.map(cat => (
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

        {/* Leadership shows direct contact numbers; other groups are name/role only */}
        {activeCategory === 'Leadership' ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {STAFF.leadership.map(({ name, role, cell }) => (
              <div
                key={role}
                className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                style={{ background: '#FFF8E1', border: '1px solid #DAA520' }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#EBF5FF', border: '3px solid #DAA520' }}
                  >
                    <User size={26} style={{ color: '#DAA520', opacity: 0.6 }} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: '#1E3A5F' }}>{name}</p>
                    <p className="text-sm text-gray-500">{role}</p>
                  </div>
                </div>
                <a
                  href={`tel:${cell.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
                  style={{ color: '#1E3A5F' }}
                >
                  <Phone size={15} /> {cell}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((member, i) => (
              <StaffCard key={`${member.name}-${i}`} member={member} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="card max-w-2xl mx-auto" style={{ borderTop: '4px solid #DAA520' }}>
            <p className="text-sm" style={{ color: '#4b5563' }}>
              Staff photos will be added as they are provided by the school.
              Contact the office on <strong>071 019 9439</strong> for enquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
