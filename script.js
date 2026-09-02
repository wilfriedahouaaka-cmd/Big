/* ==========================================================
   GESTION DE LA NAVIGATION, DE LA MUSIQUE ET DES POP-UPS
   ========================================== */

/* Fonction principale pour changer de page de manière fluide */
function allerVers(idPageCible) {
    // Sélectionne toutes les sections de pages
    const toutesLesPages = document.querySelectorAll(".page");
    
    // Retire la classe 'active' de chaque page pour les masquer
    toutesLesPages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Recherche la page spécifique que l'on souhaite afficher
    const pageVoulue = document.getElementById(idPageCible);
    
    if (pageVoulue) {
        // Active la page cible
        pageVoulue.classList.add("active");
        // Remonte tout en haut de la page instantanément
        window.scrollTo(0, 0);

        // Déclenche des actions spécifiques selon la page atteinte
        if (idPageCible === "page-transition") {
            // Lance l'effet machine à écrire sur le premier texte de soutien
            lancerMachineAEcrire("texte-machine-1", "J'ai remarqué que ton cœur était un peu lourd ces derniers temps, et je voulais te rappeler que tu n'es pas seule. Prends une grande inspiration, je suis là pour toi.", 35);
        } else if (idPageCible === "page-message-final") {
            // Texte complet du message final affiché progressivement
            const messageFinal = "La femme de ma vie ❤️💍\n\n" +
                "Je veux que tu saches une chose, du fond du cœur : tu n’es pas seule. Je suis là, avec toi, dans chaque larme, dans chaque peur, dans chaque battement de ton cœur.\n\n" +
                "Tu es une femme forte, même si aujourd’hui tu ne la sens pas, cette force. Tu as déjà surmonté tellement d’épreuves dans ta vie, et celle-ci, aussi dure soit-elle, ne définira pas qui tu es.\n\n" +
                "Je crois en toi, mon cœur. Respire, mon amour. Ça va aller, et moi, je ne te lâche pas.\n\n" +
                "Je t’aime plus que tout.";
            lancerMachineAEcrire("texte-machine-2", messageFinal, 20);
        }
    } else {
        console.error("Impossible de trouver la page avec l'ID : " + idPageCible);
    }
}

/* Fonction réutilisable pour simuler l'effet d'une machine à écrire lettre par lettre */
function lancerMachineAEcrire(elementId, texteComplet, vitesse) {
    const elementTexte = document.getElementById(elementId);
    if (!elementTexte) return;

    elementTexte.textContent = ""; // Réinitialise le texte de l'élément
    let index = 0;

    function ecrire() {
        if (index < texteComplet.length) {
            // Ajoute le caractère suivant au contenu textuel
            elementTexte.textContent += texteComplet.charAt(index);
            index++;
            // Rappelle la fonction après un court délai (vitesse)
            setTimeout(ecrire, vitesse);
        }
    }

    ecrire();
}

/* Gestionnaire d'événements global pour intercepter tous les clics de l'application */
document.addEventListener("click", function(event) {
    const target = event.target;
    const id = target.id;
    const audio = document.getElementById("musique-fond");
    const btnAudio = document.getElementById("btnAudioControle");

    // 1. Bouton d'accueil : Démarrage de la musique et transition vers la page suivante
    if (id === "btnVersPage2") {
        if (audio) {
            audio.play().then(() => {
                if (btnAudio) btnAudio.style.display = "block"; // Affiche le bouton de contrôle audio
            }).catch(error => {
                console.log("Erreur de lecture audio : ", error);
            });
        }
        allerVers("page-transition");
    } 
    // 2. Bouton de contrôle du son (Activer / Couper)
    else if (id === "btnAudioControle") {
        if (audio.muted) {
            audio.muted = false; 
            btnAudio.textContent = "🔊 Couper le son";
        } else {
            audio.muted = true;  
            btnAudio.textContent = "🔇 Activer le son";
        }
    }
    // 3. Boutons de navigation entre les différentes pages
    else if (id === "btnVersPage3") {
        allerVers("page-galerie");
    } 
    else if (id === "btnRetour1") {
        allerVers("page-accueil");
    } 
    else if (id === "btnVersPage4") {
        allerVers("page-message-final");
    } 
    else if (id === "btnRetour2") {
        allerVers("page-transition");
    } 
    else if (id === "btnRetourAccueil") {
        allerVers("page-accueil");
    }

    // 4. Ouverture des pop-ups des 8 vidéos et déclenchement dynamique du texte associé
    const carteDeclencheur = target.closest(".video-carte-declencheur");
    if (carteDeclencheur) {
        const popupId = carteDeclencheur.getAttribute("data-video");
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "flex"; // Affiche le pop-up en modale

            // Lancement de la machine à écrire adaptée pour chaque vidéo de 1 à 8
            if (popupId === "popup-1") {
                lancerMachineAEcrire("texte-modal-1", "Un premier petit souvenir rien qu'à nous qui j'espère te fera sourire. Tu es magnifique. ❤️", 30);
            } else if (popupId === "popup-2") {
                lancerMachineAEcrire("texte-modal-2", "Pense à quel point tu comptes pour moi. Ne l'oublie jamais, mon cœur. ✨", 30);
            } else if (popupId === "popup-3") {
                lancerMachineAEcrire("texte-modal-3", "Je serai toujours là pour te redonner de la force quand tu en auras besoin. 💍", 30);
            } else if (popupId === "popup-4") {
                lancerMachineAEcrire("texte-modal-4", "Chaque instant partagé avec toi illumine mes journées. Tu es extraordinaire. 🌟", 30);
            } else if (popupId === "popup-5") {
                lancerMachineAEcrire("texte-modal-5", "Accroche-toi, mon amour, tu n'es jamais seule face aux difficultés. 💪", 30);
            } else if (popupId === "popup-6") {
                lancerMachineAEcrire("texte-modal-6", "Ton sourire est la plus belle chose au monde. Garde confiances en toi. 🥰", 30);
            } else if (popupId === "popup-7") {
                lancerMachineAEcrire("texte-modal-7", "Ensemble, on peut surmonter n'importe quelle tempête. Je t'inonde de bisous. 😘", 30);
            } else if (popupId === "popup-8") {
                lancerMachineAEcrire("texte-modal-8", "Une douce attention de plus pour te rappeler à quel point je t'aime infiniment. ❤️", 30);
            }
        }
    }

    // 5. Fermeture des pop-ups (via la croix ou en cliquant sur l'arrière-plan sombre)
    if (target.classList.contains("modal-fermer") || target.classList.contains("modal-overlay")) {
        const modal = target.closest(".modal-overlay");
        if (modal) {
            modal.style.display = "none"; // Masque le pop-up
            // Met en pause la vidéo et réinitialise sa lecture à zéro
            const video = modal.querySelector("video");
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    }
});