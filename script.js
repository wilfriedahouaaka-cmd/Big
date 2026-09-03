/* ================================================= */
/* TABLEAU DES DONNÉES : FICHIERS, TEXTES GRILLE ET POP-UP */
/* ================================================= */
const donneesVideos = [
    { 
        src: "1.mp4", 
        texteGrille: "Le début de nos plus beaux rires.", 
        textePopup: "Un premier petit souvenir rien qu'à nous qui j'espère te fera sourire. Tu es magnifique. ❤️" 
    },
    { 
        src: "2.mp4", 
        texteGrille: "Une pensée rien que pour toi.", 
        textePopup: "Pense à quel point tu comptes pour moi. Ne l'oublie jamais, mon cœur. ✨" 
    },
    { 
        src: "3.mp4", 
        texteGrille: "Quand tu as besoin de force.", 
        textePopup: "Je serai toujours là pour te redonner de la force quand tu en auras besoin. 💍" 
    },
    { 
        src: "4.mp4", 
        texteGrille: "Nos éclats de soleil.", 
        textePopup: "Chaque instant partagé avec toi illumine mes journées. Tu es extraordinaire. 🌟" 
    },
    { 
        src: "5.mp4", 
        texteGrille: "Un instant hors du temps.", 
        textePopup: "Accroche-toi, mon amour, tu n'es jamais seule face aux difficultés. 💪" 
    },
    { 
        src: "6.mp4", 
        texteGrille: "Ton si beau sourire.", 
        textePopup: "Ton sourire est la plus belle chose au monde. Garde confiance en toi. 🥰" 
    },
    { 
        src: "7.mp4", 
        texteGrille: "Une vague de tendresse.", 
        textePopup: "Ensemble, on peut surmonter n'importe quelle tempête. Je t'inonde de bisous. 😘" 
    },
    { 
        src: "8.mp4", 
        texteGrille: "Pour l'éternité.", 
        textePopup: "Une douce attention de plus pour te rappeler à quel point je t'aime infiniment. ❤️" 
    }
];

let indexVideoActuelle = 0;

/* Tableau contenant toutes les différentes animations de coins */
const listeAnimationsCoins = [
    "anim-coin-haut-droit",
    "anim-coin-haut-gauche",
    "anim-coin-bas-droit",
    "anim-coin-bas-gauche",
    "anim-tout-en-haut"
];

/* ================================================= */
/* FONCTION DE NAVIGATION ENTRE LES PAGES            */
/* ================================================= */
function allerVers(idPageCible) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    
    const pageVoulue = document.getElementById(idPageCible);
    if (pageVoulue) {
        pageVoulue.classList.add("active");
        window.scrollTo(0, 0);

        if (idPageCible === "page-transition") {
            lancerMachineAEcrire("texte-machine-1", "J'ai remarqué que ton cœur était un peu lourd ces derniers temps, et je voulais te rappeler que tu n'es pas seule. Prends une grande inspiration, je suis là pour toi.", 30);
        } else if (idPageCible === "page-galerie") {
            mettreAJourCarrousel();
        } else if (idPageCible === "page-message-final") {
            const messageFinal = "La femme de ma vie ❤️💍\n\n" +
                "Je veux que tu saches une chose, du fond du cœur : tu n’es pas seule. Je suis là, avec toi, dans chaque larme, dans chaque peur, dans chaque battement de ton cœur.\n\n" +
                "Tu es une femme forte, même si aujourd’hui tu ne la sens pas, cette force. Tu as déjà surmonté tellement d’épreuves dans ta vie, et celle-ci, aussi dure soit-elle, ne définira pas qui tu es.\n\n" +
                "Je crois en toi, mon cœur. Respire, mon amour. Ça va aller, et moi, je ne te lâche pas.\n\n" +
                "Je t’aime plus que tout.";
            lancerMachineAEcrire("texte-machine-2", messageFinal, 15);
        }
    }
}

/* ================================================= */
/* MISE À JOUR DE LA VIDÉO AVEC ROTATION DES MOUVEMENTS*/
/* ================================================= */
function mettreAJourCarrousel() {
    const videoElement = document.getElementById("videoCarrouselActive");
    const sourceElement = videoElement.querySelector("source");
    const wrapperElement = document.getElementById("declencheurPopup");
    const infoCourante = donneesVideos[indexVideoActuelle];
    
    sourceElement.src = infoCourante.src;
    videoElement.load();
    videoElement.pause();

    const elementTexteLateral = document.getElementById("texte-carrousel-actif");
    if (elementTexteLateral) {
        elementTexteLateral.textContent = infoCourante.texteGrille;
    }

    /* On choisit une animation différente à chaque changement pour que chaque mouvement soit unique et visible */
    const animationChoisie = listeAnimationsCoins[indexVideoActuelle % listeAnimationsCoins.length];

    /* Nettoyage de toutes les anciennes classes d'animation */
    wrapperElement.classList.remove(
        "anim-coin-haut-droit", 
        "anim-coin-haut-gauche", 
        "anim-coin-bas-droit", 
        "anim-coin-bas-gauche", 
        "anim-tout-en-haut"
    );
    
    /* Réinitialisation forcée du DOM pour déclencher l'effet visuel */
    void wrapperElement.offsetWidth; 
    
    /* Application de la nouvelle animation de coin */
    wrapperElement.classList.add(animationChoisie);
}

/* ================================================= */
/* EFFET MACHINE À ÉCRIRE                            */
/* ================================================= */
function lancerMachineAEcrire(elementId, texteComplet, vitesse) {
    const elementTexte = document.getElementById(elementId);
    if (!elementTexte) return;

    elementTexte.textContent = "";
    let index = 0;

    function ecrire() {
        if (index < texteComplet.length) {
            elementTexte.textContent += texteComplet.charAt(index);
            index++;
            setTimeout(ecrire, vitesse);
        }
    }
    ecrire();
}

/* ================================================= */
/* GESTIONNAIRE DES CLICS                            */
/* ================================================= */
document.addEventListener("click", function(event) {
    const target = event.target;
    const id = target.id;
    const audio = document.getElementById("musique-fond");
    const btnAudio = document.getElementById("btnAudioControle");

    if (id === "btnVersPage2") {
        if (audio) {
            audio.play().then(() => {
                if (btnAudio) btnAudio.style.display = "block";
            }).catch(error => { console.log(error); });
        }
        allerVers("page-transition");
    } 
    else if (id === "btnAudioControle") {
        if (audio.muted) {
            audio.muted = false; 
            btnAudio.textContent = "🔊 Couper le son";
        } else {
            audio.muted = true;  
            btnAudio.textContent = "🔇 Activer le son";
        }
    }
    else if (id === "btnVersPage3") { allerVers("page-galerie"); } 
    else if (id === "btnRetour1") { allerVers("page-accueil"); } 
    else if (id === "btnVersPage4") { allerVers("page-message-final"); } 
    else if (id === "btnRetour2") { allerVers("page-transition"); } 
    else if (id === "btnRetourAccueil") { allerVers("page-accueil"); }
    else if (id === "btnCarrouselPrecedent") {
        indexVideoActuelle = (indexVideoActuelle - 1 + donneesVideos.length) % donneesVideos.length;
        mettreAJourCarrousel();
    } 
    else if (id === "btnCarrouselSuivant") {
        indexVideoActuelle = (indexVideoActuelle + 1 + donneesVideos.length) % donneesVideos.length;
        mettreAJourCarrousel();
    }
    else if (target.closest("#declencheurPopup")) {
        const popupModal = document.getElementById("popup-video-global");
        const videoModal = document.getElementById("videoPopupModal");
        const sourceModal = document.getElementById("sourceVideoModal");
        
        if (audio && !audio.muted) {
            audio.muted = true;
            window.musiqueEtaitActive = true;
        }

        const infoCourante = donneesVideos[indexVideoActuelle];
        sourceModal.src = infoCourante.src;
        videoModal.load();
        videoModal.play();

        lancerMachineAEcrire("texte-modal-actif", infoCourante.textePopup, 20);
        popupModal.style.display = "flex";
    }
    else if (target.id === "fermerPopupModal" || target.id === "popup-video-global") {
        const popupModal = document.getElementById("popup-video-global");
        const videoModal = document.getElementById("videoPopupModal");
        
        if (popupModal) {
            popupModal.style.display = "none";
            if (videoModal) {
                videoModal.pause();
                videoModal.currentTime = 0;
            }
            if (window.musiqueEtaitActive && audio) {
                audio.muted = false;
                window.musiqueEtaitActive = false;
                if (btnAudio) btnAudio.textContent = "🔊 Couper le son";
            }
        }
    }
});