const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLastActivities = async (req, res) => {
    try {
      const userId = req.user?.id; 
      if (!userId) {
        return res.status(401).json({ success: false, message: 'unauthorized' });
      }
  
      const [assessments, exercises, stories] = await Promise.all([
        prisma.assessmentSession.findMany({
          where: { userId: String(userId) },
          orderBy: { createdAt: 'desc' },
          take: 3,
        }),
        prisma.exerciseProgress.findMany({
          where: { userId: String(userId) },
          orderBy: { createdAt: 'desc' },
          take: 3,
        }),
        prisma.storyInteraction
          ? prisma.storyInteraction.findMany({
              where: { userId: String(userId) },
              orderBy: { createdAt: 'desc' },
              take: 3,
            })
          : [],
      ]);
  
      const normalized = [
        ...assessments.map((a) => ({
          type: 'assessment',
          title: 'Assessment Jelajah Diri',
          subtitle: 'Selesai',
          createdAt: a.createdAt,
          icon: 'pi pi-compass',
          color: 'bg-violet-50 text-violet-600',
        })),
        ...exercises.map((e) => ({
          type: 'exercise',
          title: e.exerciseTitle || 'Latihan Pernapasan',
          subtitle: e.completed ? 'Selesai' : 'Belum selesai',
          createdAt: e.updatedAt || e.createdAt,
          icon: 'pi pi-check-circle',
          color: 'bg-sky-50 text-sky-600',
        })),
        ...stories.map((s) => ({
          type: 'story',
          title: 'Dinding Cerita',
          subtitle: s.action || 'Memberikan dukungan',
          createdAt: s.createdAt,
          icon: 'pi pi-heart',
          color: 'bg-emerald-50 text-emerald-600',
        })),
      ];
  
      normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      const latest = normalized.slice(0, 3);
  
      return res.json({
        success: true,
        data: latest,
      });
    } catch (err) {
      console.error('getLastActivities error:', err);
      return res.status(500).json({ success: false, message: 'Gagal ambil aktivitas' });
    }
  };
  