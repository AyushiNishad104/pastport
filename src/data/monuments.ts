export const monuments = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.",
    emoji: "🕌",
    // Added imageUrl for Explore/Cards thumbnails
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1587135497273-1a86b09fe70e?q=80&w=1000&auto=format&fit=crop&h=600", 
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop"  
    ],
    audioUrl: "/assets/audio/taj-mahal.mp3",
    arModel: "/assets/models/taj-mahal/",
    quiz: [
      { question: "Who commissioned the construction of the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"], correct: 1 },
      { question: "In which year was the construction of the Taj Mahal completed?", options: ["1631", "1648", "1658", "1670"], correct: 1 },
      { question: "The Taj Mahal was built in memory of whom?", options: ["Noor Jahan", "Mumtaz Mahal", "Jodha Bai", "Roshanara"], correct: 1 },
      { question: "What material is the Taj Mahal primarily made of?", options: ["Red Sandstone", "White Marble", "Granite", "Limestone"], correct: 1 },
      { question: "Who was the chief architect of the Taj Mahal?", options: ["Ismail Afandi", "Ustad Ahmad Lahauri", "Makramat Khan", "Abdul Karim"], correct: 1 },
      { question: "Which river flows near the Taj Mahal?", options: ["Ganga", "Yamuna", "Godavari", "Saraswati"], correct: 1 },
      { question: "How many minarets are there in the Taj Mahal complex?", options: ["2", "4", "6", "8"], correct: 1 },
      { question: "The Taj Mahal is a perfect example of which architectural style?", options: ["Gothic", "Mughal", "Dravidian", "Roman"], correct: 1 },
      { question: "How many years did it take to complete the main mausoleum?", options: ["10 years", "12 years", "17 years", "22 years"], correct: 2 },
      { question: "The gardens of the Taj Mahal are designed in which style?", options: ["Persian Charbagh", "English Landscape", "Japanese Zen", "French Formal"], correct: 0 },
      { question: "Approximately how many workers were involved in the construction?", options: ["1,000", "10,000", "20,000", "50,000"], correct: 2 },
      { question: "The calligraphy on the Taj Mahal is primarily from which text?", options: ["The Mahabharata", "The Bible", "The Quran", "The Ramayana"], correct: 2 },
      { question: "In which year was the Taj Mahal designated as a UNESCO World Heritage Site?", options: ["1973", "1983", "1993", "2003"], correct: 1 },
      { question: "The cenotaphs of Shah Jahan and Mumtaz Mahal are located in which part of the monument?", options: ["The Mosque", "The Main Hall", "The Garden", "The Gate"], correct: 1 },
      { question: "Which precious stone is extensively used in the decoration (Pietra Dura)?", options: ["Diamond", "Emerald", "Semi-precious stones (28 types)", "Ruby"], correct: 2 }
    ],
    points: 50,
    badge: "History Master"
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    city: "Delhi",
    description: "The Qutub Minar is a towering 73 meter high tower built by Qutub-ud-Din Aibak in 1193. The tower has five distinct storeys, each marked by a projecting balcony.",
    emoji: "🗼",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1599550633499-3c6ebd2d9c2e?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1609766856921-7e0a0c06284d?q=80&w=1000&auto=format&fit=crop"  
    ],
    audioUrl: "/assets/audio/qutub-minar.mp3",
    arModel: "/assets/models/qutub-minar/",
    quiz: [
      { question: "Who started the construction of Qutub Minar?", options: ["Qutub-ud-Din Aibak", "Iltutmish", "Firoz Shah Tughlaq", "Alauddin Khilji"], correct: 0 },
      { question: "What is the height of Qutub Minar?", options: ["63 meters", "73 meters", "83 meters", "93 meters"], correct: 1 },
      { question: "How many storeys does the Qutub Minar have?", options: ["3", "4", "5", "6"], correct: 2 },
      { question: "In which year was Qutub Minar built?", options: ["1193", "1206", "1210", "1220"], correct: 0 },
      { question: "Which famous pillar stands in the Qutub complex?", options: ["Ashoka Pillar", "Iron Pillar", "Victory Pillar", "Sun Pillar"], correct: 1 },
      { question: "The Iron Pillar is famous for its:", options: ["Height", "Rust resistance", "Gold plating", "Age"], correct: 1 },
      { question: "Which dynasty commissioned the Qutub Minar?", options: ["Mughal", "Slave Dynasty (Mamluk)", "Tughlaq", "Lodhi"], correct: 1 },
      { question: "The diameter of the Qutub Minar is:", options: ["Same at top and bottom", "Wider at the base, narrower at top", "Narrower at base, wider at top", "Irregular"], correct: 1 },
      { question: "Which material is primarily used in Qutub Minar?", options: ["White Marble", "Red Sandstone and Marble", "Granite", "Brick"], correct: 1 },
      { question: "Who added the fifth storey to the Minar?", options: ["Qutub-ud-Din Aibak", "Iltutmish", "Firoz Shah Tughlaq", "Alauddin Khilji"], correct: 2 },
      { question: "The Quwwat-ul-Islam Mosque is located:", options: ["Inside the Minar", "At the base of the Minar", "1 km away", "On the roof"], correct: 1 },
      { question: "The Qutub complex is a UNESCO World Heritage Site since:", options: ["1993", "2003", "1983", "1973"], correct: 1 },
      { question: "Which ruler started the Alai Minar which stands unfinished?", options: ["Iltutmish", "Alauddin Khilji", "Firoz Shah Tughlaq", "Muhammad bin Tughlaq"], correct: 1 },
      { question: "The balconies of the Qutub Minar are supported by:", options: ["Wooden beams", "Stone brackets (Muqarnas)", "Iron chains", "Pillars"], correct: 1 },
      { question: "The Qutub Minar is tilted towards:", options: ["North", "South", "East", "West"], correct: 1 }
    ],
    points: 25,
    badge: "Explorer"
  },
  {
    id: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    description: "The Red Fort is a historic fort in the city of Delhi that served as the main residence of the Mughal Emperors. It was constructed in 1648 by the fifth Mughal Emperor Shah Jahan.",
    emoji: "🏰",
    imageUrl: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1609766856921-7e0a0c06284d?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop"  
    ],
    audioUrl: "/assets/audio/red-fort.mp3",
    arModel: "/assets/models/red-fort/",
    quiz: [
      { question: "Who commissioned the Red Fort?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"], correct: 1 },
      { question: "In which year was the Red Fort completed?", options: ["1638", "1648", "1658", "1668"], correct: 1 },
      { question: "The Red Fort is made primarily of which material?", options: ["White marble", "Red sandstone", "Granite", "Limestone"], correct: 1 },
      { question: "Which river flows near the Red Fort?", options: ["Ganga", "Yamuna", "Godavari", "Saraswati"], correct: 1 },
      { question: "The main entrance to the Red Fort is known as:", options: ["Delhi Gate", "Lahore Gate", "Ajmeri Gate", "Turkman Gate"], correct: 1 }
    ],
    points: 30,
    badge: "Explorer"
  },
  {
    id: "gateway-of-india",
    name: "Gateway of India",
    city: "Mumbai",
    description: "The Gateway of India is an arch-monument built in the early 20th century in Mumbai. It was erected to commemorate the landing of King George V and Queen Mary.",
    emoji: "🚪",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop"
    ],
    audioUrl: "/assets/audio/gateway-of-india.mp3",
    arModel: "/assets/models/gateway-of-india/",
    quiz: [
      { question: "In which year was the Gateway of India built?", options: ["1911", "1924", "1931", "1947"], correct: 1 },
      { question: "The Gateway of India commemorates the visit of which British monarchs?", options: ["King Edward VII", "King George V and Queen Mary", "Queen Victoria", "King George VI"], correct: 1 },
      { question: "Which architectural style is the Gateway of India inspired by?", options: ["Gothic", "Indo-Saracenic", "Mughal", "Dravidian"], correct: 1 },
      { question: "The Gateway of India is located overlooking which body of water?", options: ["Bay of Bengal", "Arabian Sea", "Indian Ocean", "Gulf of Mannar"], correct: 1 },
      { question: "Who was the architect of the Gateway of India?", options: ["George Wittet", "Edwin Lutyens", "Herbert Baker", "Claude Batley"], correct: 0 }
    ],
    points: 25,
    badge: "Explorer"
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    city: "Jaipur",
    description: "Hawa Mahal is a palace in Jaipur, made of red and pink sandstone. It was constructed in 1799 by Maharaja Sawai Pratap Singh. Its unique five-storey exterior resembles a honeycomb.",
    emoji: "🏛️",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop"
    ],
    audioUrl: "/assets/audio/hawa-mahal.mp3",
    arModel: "/assets/models/hawa-mahal/",
    quiz: [
      { question: "Who built the Hawa Mahal?", options: ["Sawai Jai Singh II", "Sawai Pratap Singh", "Sawai Ram Singh", "Sawai Madho Singh"], correct: 1 },
      { question: "In which year was Hawa Mahal constructed?", options: ["1779", "1799", "1819", "1839"], correct: 1 },
      { question: "What is Hawa Mahal also known as?", options: ["Palace of Winds", "Palace of Dreams", "Palace of Lights", "Palace of Kings"], correct: 0 },
      { question: "How many windows does Hawa Mahal have?", options: ["753", "853", "953", "1053"], correct: 2 }
    ],
    points: 30,
    badge: "Explorer"
  },
  {
    id: "golden-temple",
    name: "Golden Temple",
    city: "Amritsar",
    description: "The Golden Temple, also known as Harmandir Sahib, is the holiest gurdwara and the most important pilgrimage site of Sikhism. It is covered in gold.",
    emoji: "✨",
    imageUrl: "https://images.unsplash.com/photo-1589669666522-0193244c9cc8?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1589669666522-0193244c9cc8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop"
    ],
    audioUrl: "/assets/audio/golden-temple.mp3",
    arModel: "/assets/models/golden-temple/",
    quiz: [
      { question: "Who laid the foundation of the Golden Temple?", options: ["Guru Nanak", "Guru Angad", "Guru Ram Das", "Guru Arjan"], correct: 2 },
      { question: "The Golden Temple is also known as?", options: ["Harmandir Sahib", "Darbar Sahib", "Both A and B", "None of the above"], correct: 2 },
      { question: "In which city is the Golden Temple located?", options: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"], correct: 1 },
      { question: "The Golden Temple is built in the center of which tank?", options: ["Sarovar", "Pushkar", "Ghagara", "None"], correct: 0 }
    ],
    points: 40,
    badge: "History Master"
  }
];