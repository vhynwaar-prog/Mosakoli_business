// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function() {

    /* ----------------- SCROLL & STICKY HEADER ----------------- */
    const header = document.querySelector("header"); // Assurez-vous d'avoir un <header> dans vos pages
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.innerText = "⬆️";
    backToTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; 
        padding: 10px 15px; border:none; border-radius:50%; 
        background-color:#007bff; color:white; font-size:18px;
        cursor:pointer; display:none; z-index:1000;
    `;
    document.body.appendChild(backToTopBtn);

    window.addEventListener("scroll", () => {
        // Sticky header
        if(header) {
            if(window.scrollY > 50) header.classList.add("sticky");
            else header.classList.remove("sticky");
        }
        // Afficher le bouton retour en haut
        if(window.scrollY > 300) backToTopBtn.style.display = "block";
        else backToTopBtn.style.display = "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({top:0, behavior:"smooth"});
    });
    /* ----------------- ANIMATIONS FADE-IN ----------------- */
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    /* ----------------- FORMULAIRE CONTACT ----------------- */
    const contactForm = document.getElementById("contactForm");
    if(contactForm){
        contactForm.addEventListener("submit", function(e){
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            const messageBox = document.getElementById("successMessage");

            // Affiche un beau message
            if(messageBox){
                messageBox.innerHTML = `
                    <div class="alert alert-success text-center" role="alert" 
                        style="border-radius:10px; animation: fadeIn 0.5s;">
                        Merci <strong>${name}</strong> 🙏 pour votre message !<br>
                        Nous vous répondrons très rapidement.<br>
                        Nous apprécions votre confiance 💚
                    </div>
                `;
            }

            // Optionnel : envoyer sur WhatsApp
            const phoneNumber = "243812345678"; // votre numéro
            const whatsappMessage = encodeURIComponent(`Bonjour, je m'appelle ${name}. Email: ${email}. Sujet: ${subject}. Message: ${message}`
            );
            window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");

            contactForm.reset();
        });
    }

    /* ----------------- COMMANDE PRODUIT WHATSAPP ----------------- */
    const orderButtons = document.querySelectorAll(".order-btn");
    orderButtons.forEach(button => {
        button.addEventListener("click", function(){
            const productName = this.closest(".product").querySelector(".product-name").innerText;
            const phoneNumber = "243812345678";
            const message = encodeURIComponent(`Bonjour, je veux commander : ${productName}`);
            if(confirm(`Voulez-vous commander : ${productName} ?`)){
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
            }
        });
    });
    /* ----------------- SMOOTH SCROLL POUR LES LIENS INTERNE ----------------- */
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener("click", function(e){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if(target){
                target.scrollIntoView({behavior:"smooth"});
            }
        });
    });

});