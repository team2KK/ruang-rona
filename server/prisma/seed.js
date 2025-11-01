// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Seed Emergency Resources
    await prisma.emergencyResource.createMany({
        data: [
            {
                name: 'Hotline 119 ext 8 (SEJIWA)',
                type: 'hotline',
                phone: '119 ext 8',
                description: 'Layanan konseling kesehatan jiwa 24/7 dari pemerintah Indonesia',
                availability: '24/7',
                isVerified: true,
                sortOrder: 1
            },
            {
                name: 'Ikatan Psikolog Klinis (IPK) Indonesia',
                type: 'psychologist',
                website: 'https://www.ipkindonesia.or.id/',
                description: 'Direktori psikolog klinis berlisensi di seluruh Indonesia',
                availability: 'Bervariasi',
                isVerified: true,
                sortOrder: 2
            },
            {
                name: 'Himpunan Psikologi Indonesia (HIMPSI)',
                type: 'psychologist',
                website: 'https://himpsi.or.id/',
                description: 'Organisasi profesi psikolog Indonesia dengan direktori anggota',
                availability: 'Bervariasi',
                isVerified: true,
                sortOrder: 3
            },
            {
                name: 'Poli Jiwa Puskesmas',
                type: 'clinic',
                description: 'Layanan kesehatan jiwa di Puskesmas terdekat. Cari Puskesmas di wilayahmu.',
                availability: 'Senin-Jumat 08:00-14:00',
                isVerified: true,
                sortOrder: 4
            },
            {
                name: 'Into The Light Indonesia',
                type: 'hotline',
                phone: '021-7884-5787',
                website: 'https://www.intothelightid.org/',
                description: 'Organisasi pencegahan bunuh diri dengan layanan konseling',
                availability: 'Senin-Jumat 09:00-17:00',
                isVerified: true,
                sortOrder: 5
            }
        ]
    });

    console.log('✅ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });