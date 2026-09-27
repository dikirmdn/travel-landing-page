// Demo photography: replace image/credit together with licensed brand assets.
// Full source and attribution links are also available in each destination dialog.
export const destinations = [
  {
    id: "bali",
    name: "Bali",
    region: "Pulau Dewata, Indonesia",
    category: "Budaya & alam",
    tagline: "Temukan tenang. Bawa pulang cerita.",
    description:
      "Pagi berkabut di tepi danau, pura yang menyimpan cerita, dan jalan kecil yang selalu mengajakmu menjelajah lebih jauh.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=85",
    position: "center 52%",
    credit: "Foto Bali · Unsplash",
    creditUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    highlights: ["Menyusuri pura dan danau di Bedugul", "Menjelajah sawah dan desa sekitar Ubud", "Menikmati senja di pesisir Bali"],
  },
  {
    id: "bromo",
    name: "Bromo",
    region: "Jawa Timur, Indonesia",
    category: "Gunung & petualangan",
    tagline: "Bangun lebih pagi. Rasakan lebih banyak.",
    description:
      "Kejar cahaya pertama di atas lautan pasir. Di antara kabut dan gunung, temukan pagi yang ingin kamu ingat lebih lama.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bromo-Semeru-Batok-Widodaren.jpg",
    position: "center 48%",
    credit: "Bromo–Semeru–Batok–Widodaren · Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Bromo-Semeru-Batok-Widodaren.jpg",
    highlights: ["Menyambut sunrise dari kawasan penanjakan", "Menjelajah lautan pasir Bromo", "Melihat bentang alam kaldera Tengger"],
  },
  {
    id: "labuan-bajo",
    name: "Labuan Bajo",
    region: "Nusa Tenggara Timur, Indonesia",
    category: "Pulau & laut",
    tagline: "Ikuti angin. Temukan horizon baru.",
    description:
      "Berangkat dari pelabuhan kecil menuju pulau-pulau yang memanggil. Hari berjalan pelan, di antara bukit dan birunya laut Flores.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Labuan_Bajo%2C_a_port_in_West_Flores%2C_Nusa_Tenggara%2C_Indonesia%3B_January_2020.jpg",
    position: "center 50%",
    credit: "Labuan Bajo, January 2020 · Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Labuan_Bajo,_a_port_in_West_Flores,_Nusa_Tenggara,_Indonesia;_January_2020.jpg",
    highlights: ["Menikmati suasana pelabuhan Labuan Bajo", "Menjelajah kepulauan sekitar Flores", "Merencanakan kunjungan ke kawasan Komodo"],
  },
  {
    id: "raja-ampat",
    name: "Raja Ampat",
    region: "Papua Barat Daya, Indonesia",
    category: "Bahari & konservasi",
    tagline: "Jauh dari ramai. Dekat dengan alam.",
    description:
      "Pulau-pulau hijau di atas laut sebening kaca. Beri dirimu waktu untuk berhenti sejenak, menyelam, dan benar-benar hadir.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png",
    position: "center 45%",
    credit: "Raja Ampat Islands · PLOS Biology / Wikimedia Commons",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png",
    highlights: ["Melihat gugusan pulau karst", "Mengenal ekosistem terumbu karang", "Menikmati perjalanan bahari dengan bertanggung jawab"],
  },
] as const;

export type Destination = (typeof destinations)[number];
