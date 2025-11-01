const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[^a-z0-9\- ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/\-+/g, '-');
}

const exercises = [
  // school
  {
    title: "Taklukkan Stres Ujian",
    category: 'school',
    description: "Program 7 hari untuk mengelola kecemasan sebelum dan saat ujian dengan teknik terbukti efektif.",
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
    title: "Belajar Cerdas, Bukan Keras",
    category: 'school',
    description: "Teknik belajar efektif menggunakan metode Pomodoro, spaced repetition, dan active recall.",
    modules: [
      "Modul 1: Teknik Pomodoro (25-5-25-5)",
      "Modul 2: Active Recall vs Re-reading",
      "Modul 3: Mind Mapping untuk Koneksi Konsep",
      "Modul 4: Spaced Repetition Schedule",
      "Modul 5: Teach What You Learn"
    ]
  },
  {
    title: "Atasi Prokrastinasi",
    category: 'school',
    description: "Latihan cepat untuk memecah mental block dan mulai mengerjakan tugas yang tertunda.",
    modules: [
      "Step 1: Identifikasi 'Mengapa Menunda'",
      "Step 2: Break Task into 2-Minute Steps",
      "Step 3: Set Timer 10 Menit - Mulai!",
      "Step 4: Reward Diri Setelah Progress Kecil"
    ]
  },

  // friends
  {
    title: "Komunikasi Asertif",
    category: 'friends',
    description: "Belajar mengungkapkan pendapat dan perasaan dengan jelas tanpa agresif atau pasif.",
    modules: [
      "Hari 1: Pasif vs Agresif vs Asertif",
      "Hari 2: Formula 'Saya Merasa... Ketika...'",
      "Hari 3: Berkata 'Tidak' Tanpa Rasa Bersalah",
      "Hari 4: Active Listening Skills",
      "Hari 5: Roleplay Skenario Nyata"
    ]
  },
  {
    title: "Detox Teman Toxic",
    category: 'friends',
    description: "Kenali red flags dalam pertemanan dan pelajari cara menetapkan batasan yang sehat.",
    modules: [
      "Hari 1: Quiz - Teman atau Toxic?",
      "Hari 2: Strategi Slow Fade vs Direct Talk",
      "Hari 3: Build Your Support Circle"
    ]
  },
  {
    title: "Konflik? Selesaikan dengan Damai",
    category: 'friends',
    description: "Panduan step-by-step menyelesaikan konflik dengan teman tanpa drama berlebihan.",
    modules: [
      "Step 1: Cool Down Period (24 jam rule)",
      "Step 2: Pahami Perspektif Mereka",
      "Step 3: Gunakan 'I-Statement'",
      "Step 4: Cari Win-Win Solution"
    ]
  },

  // self
  {
    title: "Level Up Pikiranmu",
    category: 'self',
    description: "Teknik Cognitive Behavioral Therapy (CBT) untuk mengubah pola pikir negatif menjadi lebih realistis.",
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
    title: "Power-Up Fokusmu",
    category: 'self',
    description: "Latihan mindfulness cepat untuk mengembalikan fokus saat pikiran melayang.",
    modules: [
      "Teknik 1: 5-4-3-2-1 Grounding",
      "Teknik 2: Body Scan 1 Menit",
      "Teknik 3: Mindful Breathing",
      "Teknik 4: Single-Tasking Challenge"
    ]
  },
  {
    title: "Self-Compassion 101",
    category: 'self',
    description: "Belajar memperlakukan diri sendiri dengan kebaikan yang sama seperti kamu memperlakukan teman.",
    modules: [
      "Hari 1: Inner Critic vs Inner Coach",
      "Hari 2: Self-Compassion Break (Kristin Neff)",
      "Hari 3: Write a Letter to Yourself",
      "Hari 4: Mindful Self-Care Activities",
      "Hari 5: Mantra & Affirmations yang Work"
    ]
  },
  {
    title: "Bangun Rutinitas Pagi",
    category: 'self',
    description: "Challenge 21 hari untuk menciptakan morning routine yang boost mood dan produktivitas.",
    modules: [
      "Week 1: Design Your Ideal Morning",
      "Week 2: Habit Stacking Technique",
      "Week 3: Troubleshoot & Optimize"
    ]
  },

  // online
  {
    title: "Benteng Digital Anti-Perundungan",
    category: 'online',
    description: "Strategi lengkap menghadapi cyberbullying dan melindungi mental health di media sosial.",
    modules: [
      "Hari 1: Kenali Bentuk Cyberbullying",
      "Hari 2: Respond vs React - Pilih Bijaklah",
      "Hari 3: Block, Report, Document",
      "Hari 4: Bicara dengan Orang Dewasa Terpercaya"
    ]
  },
  {
    title: "Social Media Detox",
    category: 'online',
    description: "Program detox bertahap untuk mengurangi kecanduan dan dampak negatif media sosial.",
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
    title: "FOMO Fighter",
    category: 'online',
    description: "Latihan cepat mengatasi Fear of Missing Out saat melihat kehidupan 'sempurna' orang lain online.",
    modules: [
      "Step 1: Ingat - Ini Highlight Reel, Bukan Reality",
      "Step 2: Gratitude untuk Hidupmu Sendiri",
      "Step 3: Unfollow/Mute Temporarily",
      "Step 4: Focus on Your Own Goals"
    ]
  },

  // mind
  {
    title: "Anxiety SOS",
    category: 'mind',
    description: "Teknik darurat untuk menenangkan diri saat serangan panik atau kecemasan tinggi.",
    modules: [
      "Teknik 1: Box Breathing (4-4-4-4)",
      "Teknik 2: Cold Water Splash",
      "Teknik 3: Progressive Muscle Relaxation",
      "Teknik 4: Grounding 5-4-3-2-1"
    ]
  },
  {
    title: "Worry Time Technique",
    category: 'mind',
    description: "Metode terjadwal untuk mengelola overthinking dan worry yang tidak produktif.",
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
    title: "Sleep Better Tonight",
    category: 'mind',
    description: "Program 2 minggu untuk memperbaiki kualitas tidur dengan sleep hygiene yang baik.",
    modules: [
      "Week 1: Build Sleep Schedule",
      "Week 2: Optimize Sleep Environment",
      "Bonus: Bedtime Relaxation Ritual"
    ]
  }
];

async function main() {
  for (const ex of exercises) {
    const exSlug = slugify(ex.title);
    // make a unique code per exercise to satisfy unique constraint
    const code = `${ex.category}-${exSlug}`;

    console.log('Upserting exercise:', ex.title);

    await prisma.exerciseRecommendation.upsert({
      where: { code },
      update: {
        title: ex.title,
        slug: exSlug,
        content: ex.description
      },
      create: {
        code,
        title: ex.title,
        slug: exSlug,
        content: ex.description,
        modules: {
          create: ex.modules.map((m, idx) => ({
            title: m,
            slug: `${exSlug}-mod-${idx + 1}`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis dolor non dolor commodo viverra quis in nisi. Pellentesque facilisis est nibh, eget molestie augue eleifend quis. Donec sollicitudin lacus leo, nec tincidunt mauris interdum vel. Nulla lacinia ante vel imperdiet facilisis. Praesent consectetur ut magna eu rhoncus. Phasellus dapibus vel magna vel dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus finibus tellus rutrum erat consequat, quis eleifend nibh bibendum. Sed faucibus enim ac tincidunt facilisis. Morbi vitae justo vel arcu cursus posuere hendrerit nec orci. Quisque rhoncus sapien nisi, blandit sodales tellus finibus eget. Morbi suscipit porttitor sapien sit amet finibus. Nullam at congue libero.

Nunc facilisis tortor eget suscipit malesuada. Aenean tincidunt lorem eros, quis malesuada urna volutpat nec. Vivamus ut enim est. Donec nisl diam, euismod quis dui faucibus, tempor porta nunc. Sed nisl nibh, gravida ut urna sed, sagittis cursus lacus. Suspendisse consectetur, ante vel tristique hendrerit, purus nisi eleifend magna, sodales volutpat magna libero eget tortor. Proin placerat ipsum vitae nulla cursus mattis. Vivamus eu enim id nunc volutpat feugiat vitae eget augue. Nam orci justo, luctus vitae diam vel, sollicitudin viverra lorem. Donec ante libero, facilisis ut ornare eget, vulputate luctus augue. Vivamus rutrum nulla id risus feugiat, ut tincidunt lectus semper.

Suspendisse ullamcorper enim sapien, tincidunt dignissim nulla euismod eu. In euismod orci ut turpis tincidunt, sed pellentesque turpis malesuada. Donec dictum blandit nisl in tempor. Vivamus porta ex non risus rhoncus consequat. Curabitur congue quam non erat euismod, eget lobortis velit consequat. Mauris venenatis est vitae leo sagittis aliquet. Donec at ligula a augue sodales congue. Aenean condimentum augue eget sodales semper.

Aenean ullamcorper feugiat nisl, at mollis orci feugiat a. Curabitur mollis vel lectus nec consectetur. Aenean pulvinar ullamcorper vehicula. Vivamus porttitor eu nunc eget vestibulum. Curabitur feugiat, sapien lacinia vulputate molestie, justo mi aliquam nisl, in interdum enim tortor sit amet est. Duis id vulputate purus, luctus viverra ex. Donec eu consequat felis, feugiat congue libero. Curabitur est purus, vestibulum sit amet nisi at, volutpat eleifend lorem. Proin sit amet tincidunt orci. Ut condimentum magna et scelerisque posuere.

Nam eu quam quis urna pellentesque ultrices nec eget felis. Etiam pharetra lacus sed dui condimentum elementum. Curabitur malesuada ut massa vel efficitur. Ut at auctor sem. Mauris commodo magna id viverra consequat. Proin ut lacus nunc. Duis eu gravida elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec cursus ex eget condimentum sagittis. Nulla vitae aliquam magna. Donec bibendum tortor non eros viverra dapibus. Morbi varius venenatis lorem, lacinia vulputate arcu finibus ut.

Mauris pellentesque ullamcorper risus ut accumsan. Integer accumsan porta ipsum, eu auctor diam consectetur ac. Donec faucibus, nulla eget lacinia commodo, urna ligula hendrerit ipsum, eget venenatis nisi sem et nisl. Fusce malesuada malesuada congue. Nunc et auctor tellus, id dictum purus. Donec iaculis sapien ante, in interdum lacus finibus ac. Morbi eget odio massa. Fusce id molestie purus, a dictum ligula. Duis congue nisi dolor, quis molestie arcu porttitor vel. Proin quis maximus turpis. Nunc dignissim dui eget dolor blandit, in feugiat mi semper. Morbi in dignissim tellus, nec semper mauris.`, 
          }))
        }
      }
    });
  }

  console.log('Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });