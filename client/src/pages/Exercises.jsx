import React, { useState } from 'react';
import { Brain, Heart, Users, BookOpen, Smartphone, Sparkles, Clock, Trophy, ChevronRight, X } from 'lucide-react';

const ExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = [
    { id: 'all', name: 'Semua', icon: Sparkles, color: 'purple' },
    { id: 'school', name: 'Sekolah', icon: BookOpen, color: 'blue' },
    { id: 'friends', name: 'Teman', icon: Users, color: 'green' },
    { id: 'self', name: 'Diri Sendiri', icon: Heart, color: 'pink' },
    { id: 'online', name: 'Dunia Online', icon: Smartphone, color: 'orange' },
    { id: 'mind', name: 'Pikiran', icon: Brain, color: 'indigo' }
  ];

  const exercises = [
    // SEKOLAH
    {
      id: 1,
      title: "Taklukkan Stres Ujian",
      category: 'school',
      duration: '7 hari',
      level: 'Pemula',
      points: 100,
      description: "Program 7 hari untuk mengelola kecemasan sebelum dan saat ujian dengan teknik terbukti efektif.",
      skills: ['Pernapasan', 'Manajemen Waktu', 'Relaksasi'],
      modules: [
        "Hari 1: Kenali Pola Stresmu",
        "Hari 2: Teknik Pernapasan 4-7-8",
        "Hari 3: Buat Jadwal Belajar Realistis",
        "Hari 4: Power Pose Anti-Cemas",
        "Hari 5: Mind Dump Before Sleep",
        "Hari 6: Visualisasi Sukses",
        "Hari 7: Ritual Pagi Hari Ujian"
      ]
    },
    {
      id: 2,
      title: "Belajar Cerdas, Bukan Keras",
      category: 'school',
      duration: '5 hari',
      level: 'Pemula',
      points: 80,
      description: "Teknik belajar efektif menggunakan metode Pomodoro, spaced repetition, dan active recall.",
      skills: ['Fokus', 'Produktivitas', 'Memori'],
      modules: [
        "Modul 1: Teknik Pomodoro (25-5-25-5)",
        "Modul 2: Active Recall vs Re-reading",
        "Modul 3: Mind Mapping untuk Koneksi Konsep",
        "Modul 4: Spaced Repetition Schedule",
        "Modul 5: Teach What You Learn"
      ]
    },
    {
      id: 3,
      title: "Atasi Prokrastinasi",
      category: 'school',
      duration: '10 menit',
      level: 'Pemula',
      points: 50,
      description: "Latihan cepat untuk memecah mental block dan mulai mengerjakan tugas yang tertunda.",
      skills: ['Motivasi', 'Action-Taking', 'Self-Discipline'],
      modules: [
        "Step 1: Identifikasi 'Mengapa Menunda'",
        "Step 2: Break Task into 2-Minute Steps",
        "Step 3: Set Timer 10 Menit - Mulai!",
        "Step 4: Reward Diri Setelah Progress Kecil"
      ]
    },

    // TEMAN
    {
      id: 4,
      title: "Komunikasi Asertif",
      category: 'friends',
      duration: '5 hari',
      level: 'Menengah',
      points: 90,
      description: "Belajar mengungkapkan pendapat dan perasaan dengan jelas tanpa agresif atau pasif.",
      skills: ['Komunikasi', 'Kepercayaan Diri', 'Boundary Setting'],
      modules: [
        "Hari 1: Pasif vs Agresif vs Asertif",
        "Hari 2: Formula 'Saya Merasa... Ketika...'",
        "Hari 3: Berkata 'Tidak' Tanpa Rasa Bersalah",
        "Hari 4: Active Listening Skills",
        "Hari 5: Roleplay Skenario Nyata"
      ]
    },
    {
      id: 5,
      title: "Detox Teman Toxic",
      category: 'friends',
      duration: '3 hari',
      level: 'Menengah',
      points: 70,
      description: "Kenali red flags dalam pertemanan dan pelajari cara menetapkan batasan yang sehat.",
      skills: ['Self-Worth', 'Boundary', 'Self-Protection'],
      modules: [
        "Hari 1: Quiz - Teman atau Toxic?",
        "Hari 2: Strategi Slow Fade vs Direct Talk",
        "Hari 3: Build Your Support Circle"
      ]
    },
    {
      id: 6,
      title: "Konflik? Selesaikan dengan Damai",
      category: 'friends',
      duration: '15 menit',
      level: 'Pemula',
      points: 60,
      description: "Panduan step-by-step menyelesaikan konflik dengan teman tanpa drama berlebihan.",
      skills: ['Problem-Solving', 'Empati', 'Komunikasi'],
      modules: [
        "Step 1: Cool Down Period (24 jam rule)",
        "Step 2: Pahami Perspektif Mereka",
        "Step 3: Gunakan 'I-Statement'",
        "Step 4: Cari Win-Win Solution"
      ]
    },

    // DIRI SENDIRI
    {
      id: 7,
      title: "Level Up Pikiranmu",
      category: 'self',
      duration: '7 hari',
      level: 'Menengah',
      points: 120,
      description: "Teknik Cognitive Behavioral Therapy (CBT) untuk mengubah pola pikir negatif menjadi lebih realistis.",
      skills: ['CBT', 'Restrukturisasi Kognitif', 'Self-Awareness'],
      modules: [
        "Hari 1: Tangkap Pikiran Negatif Otomatis",
        "Hari 2: Identifikasi Cognitive Distortions",
        "Hari 3: Challenge dengan Bukti",
        "Hari 4: Ciptakan Pikiran Alternatif",
        "Hari 5: Behavioral Experiment",
        "Hari 6: Gratitude Journaling",
        "Hari 7: Reflect & Celebrate Progress"
      ]
    },
    {
      id: 8,
      title: "Power-Up Fokusmu",
      category: 'self',
      duration: '5 menit',
      level: 'Pemula',
      points: 40,
      description: "Latihan mindfulness cepat untuk mengembalikan fokus saat pikiran melayang.",
      skills: ['Mindfulness', 'Fokus', 'Grounding'],
      modules: [
        "Teknik 1: 5-4-3-2-1 Grounding",
        "Teknik 2: Body Scan 1 Menit",
        "Teknik 3: Mindful Breathing",
        "Teknik 4: Single-Tasking Challenge"
      ]
    },
    {
      id: 9,
      title: "Self-Compassion 101",
      category: 'self',
      duration: '5 hari',
      level: 'Pemula',
      points: 85,
      description: "Belajar memperlakukan diri sendiri dengan kebaikan yang sama seperti kamu memperlakukan teman.",
      skills: ['Self-Compassion', 'Self-Love', 'Emotional Regulation'],
      modules: [
        "Hari 1: Inner Critic vs Inner Coach",
        "Hari 2: Self-Compassion Break (Kristin Neff)",
        "Hari 3: Write a Letter to Yourself",
        "Hari 4: Mindful Self-Care Activities",
        "Hari 5: Mantra & Affirmations yang Work"
      ]
    },
    {
      id: 10,
      title: "Bangun Rutinitas Pagi",
      category: 'self',
      duration: '21 hari',
      level: 'Menengah',
      points: 150,
      description: "Challenge 21 hari untuk menciptakan morning routine yang boost mood dan produktivitas.",
      skills: ['Habit Building', 'Self-Discipline', 'Wellness'],
      modules: [
        "Week 1: Design Your Ideal Morning",
        "Week 2: Habit Stacking Technique",
        "Week 3: Troubleshoot & Optimize"
      ]
    },

    // DUNIA ONLINE
    {
      id: 11,
      title: "Benteng Digital Anti-Perundungan",
      category: 'online',
      duration: '4 hari',
      level: 'Pemula',
      points: 100,
      description: "Strategi lengkap menghadapi cyberbullying dan melindungi mental health di media sosial.",
      skills: ['Digital Literacy', 'Self-Protection', 'Advocacy'],
      modules: [
        "Hari 1: Kenali Bentuk Cyberbullying",
        "Hari 2: Respond vs React - Pilih Bijaklah",
        "Hari 3: Block, Report, Document",
        "Hari 4: Bicara dengan Orang Dewasa Terpercaya"
      ]
    },
    {
      id: 12,
      title: "Social Media Detox",
      category: 'online',
      duration: '7 hari',
      level: 'Menengah',
      points: 110,
      description: "Program detox bertahap untuk mengurangi kecanduan dan dampak negatif media sosial.",
      skills: ['Digital Wellness', 'Self-Control', 'Mindfulness'],
      modules: [
        "Hari 1: Track Screen Time & Identify Triggers",
        "Hari 2: Turn Off Non-Essential Notifications",
        "Hari 3: Unfollow Accounts yang Bikin Insecure",
        "Hari 4: Set App Time Limits",
        "Hari 5: Create Phone-Free Zones",
        "Hari 6: Find Offline Hobbies",
        "Hari 7: Mindful Scrolling Practice"
      ]
    },
    {
      id: 13,
      title: "FOMO Fighter",
      category: 'online',
      duration: '10 menit',
      level: 'Pemula',
      points: 55,
      description: "Latihan cepat mengatasi Fear of Missing Out saat melihat kehidupan 'sempurna' orang lain online.",
      skills: ['Reality Check', 'Gratitude', 'Self-Acceptance'],
      modules: [
        "Step 1: Ingat - Ini Highlight Reel, Bukan Reality",
        "Step 2: Gratitude untuk Hidupmu Sendiri",
        "Step 3: Unfollow/Mute Temporarily",
        "Step 4: Focus on Your Own Goals"
      ]
    },

    // PIKIRAN
    {
      id: 14,
      title: "Anxiety SOS",
      category: 'mind',
      duration: '5 menit',
      level: 'Pemula',
      points: 50,
      description: "Teknik darurat untuk menenangkan diri saat serangan panik atau kecemasan tinggi.",
      skills: ['Anxiety Management', 'Grounding', 'Breathing'],
      modules: [
        "Teknik 1: Box Breathing (4-4-4-4)",
        "Teknik 2: Cold Water Splash",
        "Teknik 3: Progressive Muscle Relaxation",
        "Teknik 4: Grounding 5-4-3-2-1"
      ]
    },
    {
      id: 15,
      title: "Worry Time Technique",
      category: 'mind',
      duration: '7 hari',
      level: 'Menengah',
      points: 95,
      description: "Metode terjadwal untuk mengelola overthinking dan worry yang tidak produktif.",
      skills: ['Thought Management', 'Time Management', 'Anxiety Control'],
      modules: [
        "Hari 1: Set Your Daily 'Worry Window' (15 menit)",
        "Hari 2: Postpone Worries Outside Window",
        "Hari 3: Journal Worries During Window",
        "Hari 4: Categorize - Real vs Hypothetical",
        "Hari 5: Problem-Solve Real Worries",
        "Hari 6: Let Go Hypothetical Worries",
        "Hari 7: Evaluate Progress"
      ]
    },
    {
      id: 16,
      title: "Sleep Better Tonight",
      category: 'mind',
      duration: '14 hari',
      level: 'Pemula',
      points: 130,
      description: "Program 2 minggu untuk memperbaiki kualitas tidur dengan sleep hygiene yang baik.",
      skills: ['Sleep Hygiene', 'Relaxation', 'Routine'],
      modules: [
        "Week 1: Build Sleep Schedule",
        "Week 2: Optimize Sleep Environment",
        "Bonus: Bedtime Relaxation Ritual"
      ]
    }
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === selectedCategory);

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  const colorClasses = {
    purple: 'bg-purple-100 text-purple-700 border-purple-300',
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    green: 'bg-green-100 text-green-700 border-green-300',
    pink: 'bg-pink-100 text-pink-700 border-pink-300',
    orange: 'bg-orange-100 text-orange-700 border-orange-300',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Perpustakaan Latihan</h1>
          <p className="text-gray-600 mt-1">Pilih latihan dan mulai journey-mu menuju well-being</p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  isActive 
                    ? `${colorClasses[cat.color]} border-2 shadow-md scale-105` 
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => {
            const categoryInfo = categories.find(c => c.id === exercise.category);
            const Icon = categoryInfo.icon;
            const color = getCategoryColor(exercise.category);
            
            return (
              <div
                key={exercise.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedExercise(exercise)}
              >
                {/* Card Header */}
                <div className={`${colorClasses[color]} p-4 border-b-2`}>
                  <div className="flex items-start justify-between">
                    <Icon className="w-8 h-8" />
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Trophy className="w-4 h-4" />
                      {exercise.points}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mt-3 text-gray-900">{exercise.title}</h3>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {exercise.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exercise.duration}
                    </div>
                    <div className={`px-2 py-1 rounded-full ${
                      exercise.level === 'Pemula' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {exercise.level}
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exercise.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
                    Mulai Latihan
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full my-8 shadow-2xl">
            {/* Modal Header */}
            <div className={`${colorClasses[getCategoryColor(selectedExercise.category)]} p-6 border-b-2 relative`}>
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 mb-3">
                {React.createElement(categories.find(c => c.id === selectedExercise.category).icon, {
                  className: "w-10 h-10"
                })}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.title}</h2>
                  <p className="text-sm">{categories.find(c => c.id === selectedExercise.category).name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedExercise.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {selectedExercise.points} poin
                </div>
                <span className={`px-3 py-1 rounded-full ${
                  selectedExercise.level === 'Pemula' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                }`}>
                  {selectedExercise.level}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <p className="text-gray-700 mb-6">{selectedExercise.description}</p>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Keterampilan yang Dipelajari:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.skills.map((skill, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Modul Latihan:</h3>
                <div className="space-y-2">
                  {selectedExercise.modules.map((module, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                      <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 text-sm">{module}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
                Mulai Sekarang
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;