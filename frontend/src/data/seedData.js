export const seedData = {
  users: [
    {
      id: "u-admin-001",
      name: "Dekar Admin",
      email: "admin@dekar.co.ke",
      phone: "+254700000000",
      password: "Admin@123",
      role: "admin",
      createdAt: "2026-01-01T08:00:00.000Z"
    }
  ],
  services: [
    {
      id: "svc-001",
      title: "eCitizen & KRA Applications",
      description: "Passport forms, KRA PIN updates, and related online processing support.",
      price: 800
    },
    {
      id: "svc-002",
      title: "NTSA & Driving Services",
      description: "Driving license renewal, test booking, and NTSA profile services.",
      price: 1200
    },
    {
      id: "svc-003",
      title: "HELB/Scholarship Support",
      description: "Application guidance for HELB loans and county scholarship forms.",
      price: 700
    }
  ],
  books: [
    {
      id: "bk-001",
      title: "KCSE Revision Pack - Mathematics",
      syllabus: "Form 1-4 complete topical revision with exam practice.",
      price: 950
    },
    {
      id: "bk-002",
      title: "CBC Digital Skills Handbook",
      syllabus: "Practical digital literacy reference for upper primary and junior school.",
      price: 1200
    },
    {
      id: "bk-003",
      title: "Business Tender Writing Guide",
      syllabus: "How to prepare compliant bids, profiles, and supporting documents.",
      price: 1500
    }
  ],
  sermons: [
    {
      id: "ser-001",
      title: "Faith for New Seasons",
      preacher: "Rev. Samuel Kariuki",
      date: "2026-02-15",
      videoUrl: "https://www.youtube.com/embed/9No-FiEInLA"
    },
    {
      id: "ser-002",
      title: "Prayer and Persistence",
      preacher: "Pastor Ruth Njeri",
      date: "2026-02-22",
      videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY"
    },
    {
      id: "ser-003",
      title: "Walking in Wisdom",
      preacher: "Bishop Daniel Mwangi",
      date: "2026-03-01",
      videoUrl: "https://www.youtube.com/embed/xvFZjo5PgG0"
    }
  ],
  openRequests: [],
  orders: []
};
