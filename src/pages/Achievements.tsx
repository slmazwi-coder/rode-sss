import React, { useState, useEffect } from 'react';
import { Trophy, Star, TrendingUp, BarChart3, Medal, Calendar, Award, Image as ImageIcon } from 'lucide-react';
import { getHallOfFame, getResultsByYear } from '../lib/store';

interface HallOfFameEntry {
  id: string;
  name: string;
  title: string;
  year: string;
  desc: string;
  image: string;
}

interface YearResults {
  passRate: number;
  bachelors: number;
  bachelorRate: number;
  distinctions: number;
  wrote: number;
  failed?: number;
  diplomas?: number;
  higher?: number;
  subjects: { name: string; rate: number; level7?: number }[];
}

const StudentAvatar = ({ image, name, year }: { image: string; name: string; year: string }) => {
  const [hasError, setHasError] = useState(!image);

  return (
    <div className="aspect-[3/4] sm:aspect-square w-full relative overflow-hidden bg-gray-100 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center group">
      {!hasError ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
          <div className="mb-4 w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-gray-200">
            <ImageIcon className="opacity-60" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">{name}</p>
          <p className="text-xs text-gray-400 italic">Class of {year}</p>
        </div>
      )}
      <div className="absolute top-0 right-0 bg-[#EBF5FF] p-4 text-[#DAA520] opacity-0 group-hover:opacity-100 transition-opacity">
        <Award size={24} />
      </div>
    </div>
  );
};

export const Achievements = () => {
  const [activeResultsYear, setActiveResultsYear] = useState<string>('2025');
  const [activeAchieversYear, setActiveAchieversYear] = useState<string>('2025');
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>(getHallOfFame());
  const [currentResults, setCurrentResults] = useState<YearResults | null>(getResultsByYear(activeResultsYear));

  useEffect(() => {
    setHallOfFame(getHallOfFame());
  }, []);

  useEffect(() => {
    setCurrentResults(getResultsByYear(activeResultsYear));
  }, [activeResultsYear]);

  const achieversByYear: Record<string, HallOfFameEntry[]> = {};
  hallOfFame.forEach((entry) => {
    if (!achieversByYear[entry.year]) achieversByYear[entry.year] = [];
    achieversByYear[entry.year].push(entry);
  });

  const yearsList = Object.keys(achieversByYear).sort((a, b) => parseInt(b) - parseInt(a));
  if (yearsList.length > 0 && !yearsList.includes(activeAchieversYear)) {
    setActiveAchieversYear(yearsList[0]);
  }

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center mb-12 sm:mb-16">Academic Excellence</h1>

        <section className="mb-16 sm:mb-24">
          {currentResults && currentResults.passRate > 0 ? (
            <div className="bg-[#1E3A5F] border-2 border-[#DAA520] rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Star size={200} className="text-[#DAA520]" />
              </div>
              <div className="relative z-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm mb-4">
                  <Star size={16} fill="currentColor" /> NSC {activeResultsYear} Performance <Star size={16} fill="currentColor" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                  {currentResults.passRate}% Pass Rate
                </h2>
                <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto italic leading-relaxed">
                  {currentResults.wrote} wrote · {currentResults.bachelors} Bachelor's · {currentResults.diplomas} Diplomas · {currentResults.higher} Higher Certificates
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
                  {[
                    { label: 'Wrote', value: currentResults.wrote },
                    { label: 'Passed', value: currentResults.wrote - (currentResults.failed || 0) },
                    { label: 'Bachelor', value: currentResults.bachelors },
                    { label: 'Distinctions', value: currentResults.distinctions },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                      <p className="text-2xl font-black text-white">{value}</p>
                      <p className="text-xs text-white/70 uppercase tracking-widest mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
                  {[
                    { label: "Bachelor's Passes", value: currentResults.bachelors, pct: ((currentResults.bachelors / currentResults.wrote) * 100).toFixed(1) },
                    { label: 'Diploma Passes', value: currentResults.diplomas ?? 0, pct: (((currentResults.diplomas ?? 0) / currentResults.wrote) * 100).toFixed(1) },
                    { label: 'Higher Certificates', value: currentResults.higher ?? 0, pct: (((currentResults.higher ?? 0) / currentResults.wrote) * 100).toFixed(1) },
                    { label: 'Failed', value: currentResults.failed ?? 0, pct: (((currentResults.failed ?? 0) / currentResults.wrote) * 100).toFixed(1) },
                  ].map(({ label, value, pct }) => (
                    <div key={label} className="bg-white rounded-2xl p-4 text-center border border-[#DAA520]/20">
                      <p className="text-2xl font-black text-[#1E3A5F]">{value}</p>
                      <p className="text-xs text-[#1E3A5F] font-bold uppercase tracking-widest mt-1">{pct}%</p>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1E3A5F] border-2 border-[#DAA520] rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Star size={200} className="text-[#DAA520]" />
              </div>
              <div className="relative z-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm mb-4">
                  <Star size={16} fill="currentColor" /> Matric Results <Star size={16} fill="currentColor" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                  Results Coming Soon
                </h2>
                <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto italic leading-relaxed">
                  "Rode SSS is committed to academic improvement and celebrating every learner's progress. Matric results will be published once available."
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="mb-20 sm:mb-32">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F]">Year-by-Year Results</h2>
            <p className="text-gray-500 mt-2">Select a year to view results (data will be updated as it becomes available)</p>
          </div>

          <div className="flex justify-center gap-3 mb-10">
            {['2025', '2024', '2023'].map((y) => (
              <button
                key={y}
                onClick={() => setActiveResultsYear(y)}
                className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                style={
                  activeResultsYear === y
                    ? { background: '#DAA520', color: '#fff', boxShadow: '0 4px 12px rgba(218,165,32,0.35)' }
                    : { background: '#f3f4f6', color: '#6b7280' }
                }
              >
                {y}
              </button>
            ))}
          </div>

          {currentResults && currentResults.passRate > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: TrendingUp, label: 'Pass Rate', value: `${currentResults.passRate}%` },
                { icon: Medal, label: 'Bachelor Passes', value: String(currentResults.bachelors) },
                { icon: Star, label: 'Distinctions', value: String(currentResults.distinctions) },
                { icon: BarChart3, label: 'Candidates', value: String(currentResults.wrote) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                  <Icon size={28} className="mx-auto mb-3 text-[#DAA520]" />
                  <p className="text-2xl font-black text-[#1E3A5F]">{value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
              <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Results for {activeResultsYear} will be published when available.</p>
            </div>
          )}
        </section>

        {currentResults && currentResults.subjects.length > 0 && (
          <section className="mb-20 sm:mb-32">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl font-bold text-[#1E3A5F]">2025 Subject Performance</h2>
              <p className="text-gray-500 mt-2">NSC 2025 pass rates and level 7 distinctions by subject</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-[#1E3A5F] text-white">
                  <tr>
                    <th className="text-left px-5 py-3 font-bold uppercase tracking-wider">Subject</th>
                    <th className="text-left px-5 py-3 font-bold uppercase tracking-wider">Pass Rate</th>
                    <th className="text-left px-5 py-3 font-bold uppercase tracking-wider">Level 7s</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {currentResults.subjects.map((s) => (
                    <tr key={s.name}>
                      <td className="px-5 py-3 font-semibold text-gray-900">{s.name}</td>
                      <td className="px-5 py-3 font-black text-[#1E3A5F]">{s.rate}%</td>
                      <td className="px-5 py-3 font-black text-[#1E3A5F]">{s.level7 ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1E3A5F]">Hall of Fame</h2>
            <p className="text-gray-500 mt-2">Celebrating our top achievers</p>
          </div>

          {yearsList.length > 0 && (
            <>
              <div className="flex justify-center gap-3 mb-8">
                {yearsList.map((y) => (
                  <button
                    key={y}
                    onClick={() => setActiveAchieversYear(y)}
                    className="px-5 py-2 rounded-full text-sm font-bold transition-all"
                    style={
                      activeAchieversYear === y
                        ? { background: '#DAA520', color: '#fff' }
                        : { background: '#f3f4f6', color: '#6b7280' }
                    }
                  >
                    Class of {y}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(achieversByYear[activeAchieversYear] || []).map((entry) => (
                  <div key={entry.id} className="text-center">
                    <StudentAvatar image={entry.image} name={entry.name} year={entry.year} />
                    <h3 className="mt-4 font-bold text-[#1E3A5F]">{entry.name}</h3>
                    <p className="text-sm text-[#1E3A5F] font-semibold">{entry.title}</p>
                    {entry.desc && <p className="text-xs text-gray-500 mt-1">{entry.desc}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
