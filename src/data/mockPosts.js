export const mockPosts = [
  {
    id: 1,
    title: "Aventure dans les Alpes",
    description: "Une magnifique randonnée dans les montagnes alpines avec des paysages à couper le souffle. Le soleil se levait à l'horizon, peignant les sommets en teintes dorées. Chaque pas révélait des vues spectaculaires sur les vallées en contrebas. C'était une expérience inoubliable qui m'a rappelé la beauté brute de la nature.",
    location: "Chamonix, France",
    category: "Aventure",
    date: "2023-10-15",
    author: "User",
    likes: [],
    comments: [],
    images: [
      {
        id: 1,
        url: "https://picsum.photos/seed/alps1/800/600.jpg",
        name: "Vue des Alpes",
        size: 1024000,
        type: "image/jpeg"
      },
      {
        id: 2,
        url: "https://picsum.photos/seed/alps2/800/600.jpg",
        name: "Coucher de soleil",
        size: 950000,
        type: "image/jpeg"
      },
      {
        id: 3,
        url: "https://picsum.photos/seed/alps3/800/600.jpg",
        name: "Montagne enneigée",
        size: 1100000,
        type: "image/jpeg"
      }
    ]
  },
  {
    id: 2,
    title: "Découverte gastronomique à Tokyo",
    description: "Exploration des saveurs uniques de la cuisine japonaise dans les ruelles de Tokyo. Des sushis frais préparés par des maîtres artisans aux ramens fumants dans les petits stands nocturnes. Chaque repas était une célébration de la précision et de l'art culinaire japonais.",
    location: "Tokyo, Japon",
    category: "Nourriture",
    date: "2023-09-22",
    author: "User",
    likes: [],
    comments: [],
    images: [
      {
        id: 4,
        url: "https://picsum.photos/seed/sushi1/800/600.jpg",
        name: "Sushis frais",
        size: 850000,
        type: "image/jpeg"
      },
      {
        id: 5,
        url: "https://picsum.photos/seed/ramen1/800/600.jpg",
        name: "Ramen traditionnel",
        size: 920000,
        type: "image/jpeg"
      }
    ]
  },
  {
    id: 3,
    title: "Trésors cachés de Marrakech",
    description: "Immersion dans la culture marocaine à travers les souks colorés et les riads paisibles. Les épices aromatiques, les tapis tissés à la main et l'architecture mauresque ont créé une expérience sensorielle inoubliable.",
    location: "Marrakech, Maroc",
    category: "Culture",
    date: "2023-08-10",
    author: "User",
    likes: [],
    comments: [],
    images: [
      {
        id: 6,
        url: "https://picsum.photos/seed/marrakech1/800/600.jpg",
        name: "Souk coloré",
        size: 1050000,
        type: "image/jpeg"
      },
      {
        id: 7,
        url: "https://picsum.photos/seed/riad1/800/600.jpg",
        name: "Riad traditionnel",
        size: 980000,
        type: "image/jpeg"
      },
      {
        id: 8,
        url: "https://picsum.photos/seed/marrakech2/800/600.jpg",
        name: "Jardin secret",
        size: 890000,
        type: "image/jpeg"
      },
      {
        id: 9,
        url: "https://picsum.photos/seed/marrakech3/800/600.jpg",
        name: "Architecture mauresque",
        size: 1120000,
        type: "image/jpeg"
      }
    ]
  },
  {
    id: 4,
    title: "Plongée en Grande Barrière",
    description: "Exploration du monde sous-marin de la Grande Barrière de Corail. Des poissons tropicaux colorés, des coraux vibrants et les majestueuses tortues marines ont rendu cette plongée absolument magique.",
    location: "Queensland, Australie",
    category: "Aventure",
    date: "2023-07-05",
    author: "User",
    likes: [],
    comments: [],
    images: [
      {
        id: 10,
        url: "https://picsum.photos/seed/reef1/800/600.jpg",
        name: "Corail tropical",
        size: 1150000,
        type: "image/jpeg"
      }
    ]
  },
  {
    id: 5,
    title: "Safari au Kenya",
    description: "Observation des Big Five dans leur habitat naturel. Le lever du soleil sur la savane kényane, avec les éléphants se déplaçant gracieusement et les lions se préparant pour la chasse, était un spectacle de la nature à son apogée.",
    location: "Masai Mara, Kenya",
    category: "Aventure",
    date: "2023-06-18",
    author: "User",
    likes: [],
    comments: [],
    images: [
      {
        id: 11,
        url: "https://picsum.photos/seed/safari1/800/600.jpg",
        name: "Éléphants au coucher",
        size: 1080000,
        type: "image/jpeg"
      },
      {
        id: 12,
        url: "https://picsum.photos/seed/safari2/800/600.jpg",
        name: "Lions en chasse",
        size: 990000,
        type: "image/jpeg"
      }
    ]
  }
];

export const categories = ["Toutes", "Aventure", "Nourriture", "Culture", "Relaxation"];

export const filterOptions = {
  sort: ["Plus récent", "Plus ancien", "Populaire"],
  dateRange: ["Aujourd'hui", "Cette semaine", "Ce mois", "Cette année"]
};