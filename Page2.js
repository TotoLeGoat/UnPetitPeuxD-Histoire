const events = [
    {
        icon: "🦠",
        date: "≈ -3,8 milliards d'années",
        title: "Premières cellules (procaryotes)",
        details: "Les premières formes de vie apparaissent dans les océans : des cellules simples sans noyau, ancêtres des bactéries.",
        image: "img/1.PNG"
    },
    {
        icon: "🧬",
        date: "≈ -2,1 milliards d'années",
        title: "Cellules eucaryotes",
        details: "Apparition de cellules plus complexes avec un noyau et des organites, permettant une plus grande diversité biologique.",
        image: "img/2.png"
    },
    {
        icon: "🧫",
        date: "≈ -1,2 milliards d'années",
        title: "Premières cellules multicellulaires",
        details: "Des organismes composés de plusieurs cellules apparaissent, ouvrant la voie à la spécialisation cellulaire.",
        image: "img/3.png"
    },
    {
        icon: "🌊",
        date: "≈ -600 millions d'années",
        title: "Explosion cambrienne",
        details: "Diversification rapide des formes de vie animale dans les océans, apparition des premiers animaux à corps mou.",
        image: "img/4.png"
    },
    {
        icon: "🌱",
        date: "≈ -500 millions d'années",
        title: "Sortie de l'eau",
        details: "Les premières plantes et animaux colonisent la terre ferme, comme les arthropodes et les premiers vertébrés.",
        image: "img/5.png"
    },
    {
        icon: "🦖",
        date: "≈ -250 millions d'années",
        title: "Ère des dinosaures",
        details: "Les dinosaures dominent la Terre pendant plus de 150 millions d'années, aux côtés des premiers mammifères.",
        image: "img/6.png"
    },
    {
        icon: "☄️",
        date: "≈ -65 millions d'années",
        title: "Extinction des dinosaures",
        details: "Un astéroïde provoque une extinction massive, ouvrant la voie à l'expansion des mammifères.",
        image: "img/7.png"
    },
    {
        icon: "🐒",
        date: "≈ -60 millions d'années",
        title: "Premiers primates",
        details: "Les premiers primates apparaissent dans les forêts tropicales, ancêtres lointains des singes et des humains.",
        image: "img/8.png"
    },
    {
        icon: "🧑‍🤝‍🧑",
        date: "≈ -7 millions d'années",
        title: "Séparation Homme/Chimpanzé",
        details: "Les lignées menant à l'Homme et au chimpanzé se séparent en Afrique.",
        image: "img/9.jpg"
    },
    {
        icon: "🛠️",
        date: "≈ -2,5 millions d'années",
        title: "Apparition du genre Homo",
        details: "Les premiers représentants du genre Homo fabriquent des outils en pierre.",
        image: "img/10.jpg"
    },
    {
        icon: "🧠",
        date: "≈ -300 000 ans",
        title: "Homo sapiens",
        details: "Notre espèce apparaît en Afrique, dotée d'un cerveau développé, du langage et de la culture.",
        image: "img/11.jpg"
    }
];

const timeline = document.getElementById('timeline');
const popup = document.getElementById('eventDetailsPopup');
const popupTitle = document.getElementById('popupTitle');
const popupDate = document.getElementById('popupDate');
const popupDetails = document.getElementById('popupDetails');
const closePopupBtn = document.getElementById('closePopupBtn');

// Génère la frise et ajoute les événements avec animations
function generateTimeline() {
    events.forEach((event, idx) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-v';
        eventDiv.style.animationDelay = (idx * 0.13) + 's';
        eventDiv.innerHTML = `
            <div class="event-icon-v">${event.icon}</div>
            <div class="event-dot-v"></div>
            <div class="event-title-v">
                <span class="event-year">${event.date}</span><br>${event.title}
            </div>
        `;

        // Animation rebond sur l'icône au survol
        eventDiv.querySelector('.event-icon-v').addEventListener('mouseenter', (e) => {
            e.currentTarget.classList.remove('animate-bounce');
            void e.currentTarget.offsetWidth;
            e.currentTarget.classList.add('animate-bounce');
        });

        // Animation vague au survol du titre
        eventDiv.querySelector('.event-title-v').addEventListener('mouseenter', (e) => {
            e.currentTarget.classList.remove('animate-wave');
            void e.currentTarget.offsetWidth;
            e.currentTarget.classList.add('animate-wave');
        });
        eventDiv.querySelector('.event-title-v').addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove('animate-wave');
        });

        // Ouvre la popup au clic sur l'événement (hors titre)
        eventDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('event-title-v')) return;
            showPopup(event);
        });

        // Ouvre la popup au clic sur le titre (et joue l'animation pop)
        eventDiv.querySelector('.event-title-v').addEventListener('click', (e) => {
            e.stopPropagation();
            showPopup(event);
            e.currentTarget.classList.add('animate-pop');
            setTimeout(() => {
                e.currentTarget.classList.remove('animate-pop');
            }, 400);
        });

        timeline.appendChild(eventDiv);
    });
}

// Affiche la popup avec animation
function showPopup(event) {
    popupTitle.textContent = event.title;
    popupDate.textContent = event.date;

    let content = '';
    if (event.image) {
        content += `<img src="${event.image}" alt="${event.title}" class="popup-image" loading="lazy">`;
    }
    content += `<p>${event.details}</p>`;

    popupDetails.innerHTML = content;

    // Pour rejouer l'animation à chaque ouverture
    popup.classList.remove('show');
    void popup.offsetWidth;
    popup.classList.add('show');
}

// Ferme la popup
function closePopup() {
    popup.classList.remove('show');
}

// Ferme la popup si clic sur la croix ou en dehors
closePopupBtn.addEventListener('click', closePopup);
window.addEventListener('click', (e) => {
    if (e.target === popup) {
        closePopup();
    }
});

// Initialisation
generateTimeline();