const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const stateInput = document.getElementById('stateInput');
const showCitiesButton = document.getElementById('showCities');
const cityImagesSection = document.getElementById('cityImages');

// Check for stored theme preference
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    body.classList.toggle('dark', storedTheme === 'dark');
    themeToggle.textContent = storedTheme === 'dark' ? '🌜' : '🌞';
    themeToggle.setAttribute('aria-pressed', storedTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '🌜' : '🌞';
    themeToggle.setAttribute('aria-pressed', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Function to show cities based on state input
const tourismData = {
    "Andaman and Nicobar Islands": {
        image: "images/Andaman and Nicobar Islands",
        capital: "Port Blair",
        description: "Andaman and Nicobar are very much close to Thailand and Myanmar. The perfect time to visit the Island is between October and May. Here you can find flourishing culture, the tribal culture of India. Andaman has its Beach festival, food festival, film festival, monsoon music festival, which attract tourists from all around the world.",
        places: [
            { name: "Radhanagar Beach", image: "images/Radhanagar Beach.jpg" },
            { name: "Havelock Island", image: "images/Havelock Island.jpg" },
            { name: "Cellular Jail", image: "images/Cellular Jail.jpg" }
        ]
    },
    "Andhra Pradesh": {
        image: "images/Andhra Pradesh.jpg",
        capital: "Hyderabad",
        description: "Andhra Pradesh is a place for ultimate eco-friendly destinations with caves, rivers, and hills that are a must to visit for all explorers. The best time to visit is from October to February. Known for its rich royal heritage and Nizami tradition, the state is famous for spicy South Indian food and the largest religious spring festival named Pongal.",
        places: [
            { name: "Birla Mandir", image: "images/Birla Mandir.jpg" },
            { name: "Ramoji Film City", image: "images/Ramoji Film City.jpeg" },
            { name: "Venkateswara Temple", image: "images/Venkateswara Temple.jpg" }
        ]
    },
    "Arunachal Pradesh": {
        image: "images/Arunachal Pradesh.jpg",
        capital: "Itanagar",
        description: "Arunachal Pradesh, situated in the north-eastern part of India, is known as the land of the rising sun. The best time to visit is between October and April. The region showcases a blend of Buddhist, Hindu, and indigenous cultures. Must-try local food includes Thukpa, and the Losar festival is celebrated by the Monpa tribe.",
        places: [
            { name: "Tawang", image: "images/Tawang.jpg" },
            { name: "Bombdila", image: "images/Bombdila.jpg" },
            { name: "Ziro", image: "Ziro.jpg" }
        ]
    },
    "Assam": {
        image: "images/Assam.jpg",
        capital: "Guwahati",
        description: "Assam is known as the queen among the north-eastern provinces and is a prime state for tourism in India. The best time to visit is during the Bihu festival in March and October. Guwahati is famous for its beautiful tea gardens and the majestic Brahmaputra River.",
        places: [
            { name: "Kaziranga National Park", image: "images/Kaziranga National Park.jpg" },
            { name: "Pobitora Wildlife Sanctuary", image: "images/Pobitora Wildlife Sanctuary.jpg" },
            { name: "Kamakhya Temple", image: "images/Kamakhya Temple.jpg" }
        ]
    },
    "Bihar": {
        image: "images/Bihar.jpg",
        capital: "Patna",
        description: "Bihar is a culturally rich place with a perfect blend of Buddhism and Hinduism. It is well connected by air and rail. The best time to visit is during the summer, monsoon, and winter seasons. Famous for its folk songs and traditional dishes like Sattu Paratha and Bihari kebab.",
        places: [
            { name: "Mahabodhi Temple", image: "images/Mahabodhi Temple.jpeg" },
            { name: "Nalanda", image: "images/Nalanda.jpg" },
            { name: "Great Buddha Statue", image: "images/Great Buddha Statue.jpg" }
        ]
    },
    "Chhattisgarh": {
        image: "images/Chhattisgarh.jpg",
        capital: "Raipur",
        description: "Chhattisgarh is known for its tribal dances, waterfalls, and architectural marvels. The best time to visit is during the winter. Major attractions include the Chitrakote Waterfalls and various wildlife sanctuaries.",
        places: [
            { name: "Chittrakote Waterfalls", image: "images/Chittrakote Waterfalls.jpg" },
            { name: "Bhoramdeo Temple", image: "images/Bhoramdeo Temple.jpg"}
        ]
    },
    "Dadra and Nagar Haveli": {
        image: "images/Dadra and Nagar Haveli.jpg",
        capital: "Silvassa",
        description: "This Union Territory is nestled between Gujarat and Maharashtra and is best visited during winters. It features lush forests, waterfalls, and numerous tourist spots including tribal museums and gardens.",
        places: [
            { name: "Swaminarayan Temple", image: "images/Swaminarayan Temple.jpg" },
            { name: "Dudhani Lake", image: "images/Dudhani Lake.jpg" }
        ]
    },
    "Daman and Diu": {
        image: "images/Daman and Diu.jpg",
        capital: "Daman",
        description: "Daman and Diu are known for their beaches, churches, and seafood. The places offer a peaceful environment and are well connected to other regions of India.",
        places: [
            { name: "Diu Fort", image: "images/Diu Fort.jpg" },
            { name: "Gangeshwar Temple", image: "images/Gangeshwar Temple.jpg" }
        ]
    },
    "Delhi": {
        image: "images/Delhi.jpg",
        capital: "New Delhi",
        description: "Delhi is a mesmerizing city that offers a mix of historical monuments and modern attractions. The best places to visit include the Red Fort, Lotus Temple, and India Gate.",
        places: [
            { name: "Red Fort", image: "images/Red Fort.jpg" },
            { name: "Lotus Temple", image: "images/Lotus Temple.jpg" },
            { name: "Humayun’s Tomb", image: "images/Humayun’s Tomb.jpg" }
        ]
    },
    "Goa": {
        image: "images/Goa.jpg",
        capital: "Panaji",
        description: "Goa is famous for its beaches, churches, and nightlife. It is a paradise for travelers with its beautiful coastline and vibrant culture.",
        places: [
            { name: "Palolem Beach", image: "images/Palolem Beach.jpg" },
            { name: "Basilica of Bom Jesus", image: "images/Basilica of Bom Jesus.jpg" }
        ]
    },
    "Gujarat": {
        image: "images/Gujarat.jpg",
        capital: "Gandhinagar",
        description: "Gujarat is a state rich in heritage, culture, and natural beauty. Known for its festivals, it is best visited between October and March.",
        places: [
            { name: "Sabarmati Ashram", image: "images/Sabarmati Ashram.jpg" },
            { name: "Lakhota Museum", image: "images/Lakhota Museum.jpg" }
        ]
    },
    "Haryana": {
        image: "images/Haryana.jpg",
        capital: "Chandigarh",
        description: "Haryana offers numerous tourist attractions maintained by the government. The best time to visit is from October to March.",
        places: [
            { name: "Sultanpur Bird Sanctuary", image: "images/Sultanpur Bird Sanctuary.jpg" },
            { name: "Kingdom of Dreams", image: "images/Kingdom of Dreams.jpg" }
        ]
    },
    "Himachal Pradesh": {
        image: "images/Himachal Pradesh.jpg",
        capital: "Shimla",
        description: "Himachal Pradesh is famous for its stunning landscapes and pleasant climate. Ideal to visit during the spring and summer seasons.",
        places: [
            { name: "Shimla", image: "images/Shimla.jpg" },
            { name: "Manali", image: "images/Manali.jpg" }
        ]
    },
    "Jammu and Kashmir": {
        image: "images/Jammu and Kashmir.jpg",
        capital: "Srinagar",
        description: "Known for its natural beauty and amazing climate, Jammu & Kashmir is a famous tourist destination in India. The best time to visit is during the winter season, especially in April. Must-visit places include Sonamarg, Gulmarg, Pahalgam, and Vaishno Devi.",
        places: [
            { name: "Gulmarg", image: "images/Gulmarg.jpg" },
            { name: "Tulip Garden", image: "images/Tulip Garden.jpg" },
            { name: "Sonamarg", image: "images/Sonamarg.jpg" },
            { name: "Dal Lake", image: "images/Dal Lake.jpg" }
        ]
    },
    "Jharkhand": {
        image: "images/Jharkhand.jpg",
        capital: "Ranchi",
        description: "Jharkhand is rich in flora, fauna, and minerals. The best time to visit is from October to February, with attractions like Hazaribagh Wildlife Sanctuary and various temples.",
        places: [
            { name: "Hazaribagh Wildlife Sanctuary", image: "images/Hazaribagh Wildlife Sanctuary.jpg" },
            { name: "Parasnath", image: "images/Parasnath.jpg" },
            { name: "Deoghar", image: "images/Deoghar.jpg" },
            { name: "Canary Hill", image: "images/Canary Hill.jpg" }
        ]
    },
    "Karnataka": {
        image: "images/Karnataka.jpg",
        capital: "Bangalore",
        description: "Karnataka is known for its wildlife, historical palaces, and rich culture. Ideal for visits between November and April, with popular foods like Idli and chutney.",
        places: [
            { name: "Keshava Temple", image: "images/Keshava Temple.jpg" },
            { name: "Coorg Hills", image: "images/Coorg Hills.jpg" },
            { name: "Mysore Palace", image: "images/Mysore Palace.jpg" },
            { name: "Gol Gumbaz", image: "images/Gol Gumbaz.jpg" }
        ]
    },
    "Kerala": {
        image: "images/Kerala.jpg",
        capital: "Thiruvananthapuram",
        description: "Known as God's Own Country, Kerala offers rich culture and heritage with coconut-filled beaches. Best visited between November and February.",
        places: [
            { name: "Munnar", image: "images/Munnar.jpg" },
            { name: "Kumarakom", image: "images/Kumarakom.jpg" },
            { name: "Kerala Folklore Theatre & Museum", image: "images/Kerala Folklore Theatre & Museum.jpg" },
            { name: "Arthirampally", image: "images/Arthirampally.jpg" }
        ]
    },
    "Lakshadweep": {
        image: "images/Lakshadweep.jpg",
        capital: "Kavaratti",
        description: "Lakshadweep offers stunning coral reefs, marine life, and resorts. The best time to visit is between October and May.",
        places: [
            { name: "Kavaratti Island", image: "images/Kavaratti Island.jpg" },
            { name: "Amindivi Island", image: "images/Amindivi Island.jpg" },
            { name: "Agatti Island", image: "images/Agatti Island.jpg" },
            { name: "Lighthouse", image: "images/Lighthouse.jpg" }
        ]
    },
    "Madhya Pradesh": {
        image: "images/Madhya Pradesh.jpg",
        capital: "Bhopal",
        description: "Famous for its wildlife and rich history, Madhya Pradesh has attractions like Khajuraho Temples and Kanha National Park. Visit during winter for pleasant weather.",
        places: [
            { name: "Khajuraho Temples", image: "images/Khajuraho Temples.jpg" },
            { name: "Buddhist Monuments", image: "images/Buddhist Monuments.jpg" },
            { name: "Taj ul Masajid", image: "images/Taj ul Masajid.jpg" },
            { name: "Orchha Fort", image: "images/Orchha Fort.jpg" }
        ]
    },
    "Maharashtra": {
        image: "images/Maharashtra.jpg",
        capital: "Mumbai",
        description: "With its rich culture and famous cuisine, Maharashtra is a great destination year-round. Key places include Mumbai, Pune, and the beaches.",
        places: [
            { name: "Gateway of India", image: "images/Gateway of India.jpg" },
            { name: "Mumbadevi Temple", image: "images/Mumbadevi Temple.jpg" },
            { name: "Panhala Hills", image: "images/Panhala Hills.jpg" },
            { name: "Ajanta Caves", image: "images/Ajanta Caves.jpg" }
        ]
    },
    "Manipur": {
        image: "images/Manipur.jpg",
        capital: "Imphal",
        description: "Known for its tranquility, Manipur offers a peaceful retreat with attractions like Loktak Lake and Kangla Fort. Best visited from October to March.",
        places: [
            { name: "Sri Sri Govindajee Temple", image: "images/Sri Sri Govindajee Temple.jpg" },
            { name: "Loktak Lake", image: "images/Loktak Lake.jpg" },
            { name: "Sirohi National Park", image: "images/Sirohi National Park.jpg" },
            { name: "Manipur State Museum", image: "images/Manipur State Museum.jpg" }
        ]
    },
    "Meghalaya": {
        image: "images/Meghalaya.jpg",
        capital: "Shillong",
        description: "Famous for its rich natural beauty, Meghalaya is best visited outside of the monsoon season. Key attractions include Umiam Lake and Mawsmai Caves.",
        places: [
            { name: "Butterfly Museum", image: "images/Butterfly Museum.jpg" },
            { name: "Umiam Lake", image: "images/Umiam Lake.jpg" },
            { name: "Mawsmai Caves", image: "images/Mawsmai Caves.jpg" },
            { name: "Elephant Falls", image: "images/Elephant Falls.jpg" }
        ]
    },
    "Mizoram": {
        image: "images/Mizoram.jpg",
        capital: "Aizawl",
        description: "Mizoram offers a unique blend of cultures, with delicious cuisines and stunning landscapes. Best visited from October to March.",
        places: [
            { name: "Durtlang Hills", image: "images/Durtlang Hills.jpg" },
            { name: "Champhai", image: "images/Champhai.jpg" },
            { name: "Dampa Wildlife Sanctuary", image: "images/Dampa Wildlife Sanctuary.jpg" }
        ]
    },
    "Nagaland": {
        image: "images/Nagaland.jpg",
        capital: "Kohima",
        description: "With its scenic beauty and vibrant culture, Nagaland is a great destination in October. Key attractions include Naga Heritage Village and Kohima War Cemetery.",
        places: [
            { name: "Naga Heritage Village", image: "images/Naga Heritage Village.jpg" },
            { name: "Kohima War Cemetery", image: "images/Kohima War Cemetery.jpg" },
            { name: "Kisama Heritage Village", image: "images/Kisama Heritage Village.jpg" },
            { name: "Kohima Museum", image: "images/Kohima Museum.jpg" }
        ]
    },
    "Orissa": {
        image: "images/Orissa.jpg",
        capital: "Bhubaneswar",
        description: "Home to the famous Jagannath Temple, Orissa offers a mix of spirituality and stunning landscapes. Best visited between October and January.",
        places: [
            { name: "Lingaraja Temple", image: "images/Lingaraja Temple.jpg" },
            { name: "Hanuman Vatika", image: "images/Hanuman Vatika.jpg" },
            { name: "Mahanadi Barrage", image: "images/Mahanadi Barrage.jpg" },
            { name: "Puri Beach", image: "images/Puri Beach.jpg" }
        ]
    },
    "Pondicherry": {
        image: "images/Pondicherry.jpg",
        capital: "Pondicherry Town",
        description: "A former French colony, Pondicherry boasts beautiful beaches and a spiritual ambiance. Ideal for visits between October and January.",
        places: [
            { name: "Seaside Promenade", image: "images/Seaside Promenade.jpg" },
            { name: "Church of the Sacred Heart of Jesus", image: "images/Church of the Sacred Heart of Jesus.jpg" },
            { name: "Paradise Beach", image: "images/Paradise Beach.jpg" },
            { name: "Pondicherry Botanical Garden", image: "images/Pondicherry Botanical Garden.jpg" }
        ]
    },
    "Punjab": {
        image: "images/Punjab.jpg",
        capital: "Chandigarh",
        description: "The land of Sikhs, Punjab is famous for its vibrant culture and delicious food. Visit between October and March for the best experience.",
        places: [
            { name: "Golden Temple (Harmandir Sahib)", image: "images/Golden Temple (Harmandir Sahib).jpg" },
            { name: "Akal Takht", image: "images/Akal Takht.jpg" },
            { name: "Rangla Punjab Haveli", image: "images/Rangla Punjab Haveli.jpg" },
            { name: "Bhatinda Zoological Park", image: "images/Bhatinda Zoological Park.jpg" }
        ]
    },
    "Rajasthan": {
        image: "images/Rajasthan.jpg",
        capital: "Jaipur",
        description: "Famous for its royal history, Rajasthan is home to majestic forts and vibrant culture. Best visited in October and November.",
        places: [
            { name: "Jaipur – The Pink City", image: "images/Jaipur – The Pink City.jpg" },
            { name: "Gadisar Lake", image: "images/Gadisar Lake.jpg" },
            { name: "Hawa Mahal", image: "images/Hawa Mahal.jpg" },
            { name: "Thar Desert", image: "images/Thar Desert.jpg" }
        ]
    },
    "Sikkim": {
        image: "images/Sikkim.jpg",
        capital: "Gangtok",
        description: "Known for its stunning landscapes and Buddhist monasteries, Sikkim is best visited between March and May.",
        places: [
            { name: "Gangtok", image: "images/Gangtok.jpg" },
            { name: "Tsomgo Lake", image: "images/Tsomgo Lake.jpg" },
            { name: "Ranka Monastery", image: "images/Ranka Monastery.jpg" },
            { name: "Do Drul Chorten Stupa", image: "images/Do Drul Chorten Stupa.jpg" }
        ]
    },
    "Tamil Nadu": {
        image: "images/Tamil Nadu.jpg",
        capital: "Chennai",
        description: "Famous for its temples and rich culture, Tamil Nadu is ideal for visits in October and November.",
        places: [
            { name: "Bragadeeshwara Temple", image: "images/Bragadeeshwara Temple.jpg" },
            { name: "Mahabalipuram monuments", image: "images/Mahabalipuram monuments.jpg" },
            { name: "Ooty Botanical Gardens", image: "images/Ooty Botanical Gardens.jpg" }
        ]
    },
    "Tripura": {
        image: "images/Tripura.jpg",
        capital: "Agartala",
        description: "A small yet interesting state, Tripura offers cultural diversity and beautiful landscapes. Best visited in winter.",
        places: [
            { name: "Jagannath Temple", image: "images/Jagannath Temple.jpg" },
            { name: "Iskcon Radha-Govinda Mandir", image: "images/Iskcon Radha-Govinda Mandir.jpg" },
            { name: "Neermahal Palace", image: "images/Neermahal Palace.jpg" }
        ]
    },
    "Uttar Pradesh": {
        image: "images/Uttar Pradesh.jpg",
        capital: "Lucknow",
        description: "Home to the Taj Mahal and other historical landmarks, Uttar Pradesh offers a rich cultural experience. Best visited during the winter months.",
        places: [
            { name: "Taj Mahal", image: "images/Taj Mahal.jpg" },
            { name: "Agra Fort", image: "images/Agra Fort.jpg" },
            { name: "Bara Imambara", image: "images/Bara Imambara.jpg" }
        ]
    },
    "Uttarakhand": {
        image: "images/Uttarakhand.jpg",
        capital: "Dehradun",
        description: "Known for its stunning hills and lakes, Uttarakhand is ideal for visitors year-round but especially in summer and winter.",
        places: [
            { name: "Nainital", image: "images/Nainital.jpg" },
            { name: "Gun Hill", image: "images/Gun Hill.jpg" },
            { name: "Badrinath Temple", image: "images/Badrinath Temple.jpg" }
        ]
    },
    "West Bengal": {
        image: "images/West Bengal.jpg",
        capital: "Kolkata",
        description: "Rich in culture and history, West Bengal is known for its handicrafts and famous landmarks. Best visited from October to March.",
        places: [
            { name: "Darjeeling Mountain Hills", image: "images/Darjeeling Mountain Hills.jpg" },
            { name: "Digha Sea Beach", image: "images/Digha Sea Beach.jpg" },
            { name: "Murshidabad Historical City", image: "images/Murshidabad Historical City.jpg" },
            { name: "Kurseong", image: "images/Kurseong.jpg" }
        ]
    }
};

// Update the event listener for showing cities
showCitiesButton.addEventListener('click', () => {
    const state = stateInput.value.trim();
    cityImagesSection.innerHTML = ''; // Clear previous images

    if (tourismData[state]) {
        const { capital, description, image, places } = tourismData[state];

        const stateInfo = document.createElement('div');
        stateInfo.className = 'city-info';
        stateInfo.innerHTML = `
            <img src="${image}" alt="${state}" />
            <h3>${state} (Capital: ${capital})</h3>
            <p>${description}</p>
        `;
        cityImagesSection.appendChild(stateInfo);

        const placesContainer = document.createElement('div');
        placesContainer.className = 'tourist-places';
        
        places.forEach(place => {
            const card = document.createElement('div');
            card.className = 'place-card';
            card.innerHTML = `
                <img src="${place.image}" alt="${place.name}" />
                <h4>${place.name}</h4>
            `;
            placesContainer.appendChild(card);
        });
        
        cityImagesSection.appendChild(placesContainer);
    } else {
        cityImagesSection.innerHTML = '<p>State not found. Please try another.</p>';
    }
});
