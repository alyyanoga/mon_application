// ======================================================
// CONNEXION
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    // Exécuter uniquement sur connexion.html
    if (form) {

        const message =
            document.getElementById("message");


        form.addEventListener("submit", function (event) {

            event.preventDefault();


            const username =
                document.getElementById("username")
                    .value.trim();

            const password =
                document.getElementById("password")
                    .value;


            if (username === "" || password === "") {

                message.textContent =
                    "Veuillez remplir tous les champs.";

                message.style.color = "red";

                return;
            }


            // TEST
            if (username === "admin" &&
                password === "1234") {


                sessionStorage.setItem(
                    "utilisateur",
                    username
                );


                message.textContent =
                    "Connexion réussie !";

                message.style.color =
                    "green";


                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 500);


            } else {

                message.textContent =
                    "Nom d'utilisateur ou mot de passe incorrect.";

                message.style.color =
                    "red";

            }

        });

    }

});


// ======================================================
// DASHBOARD
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const logout =
        document.getElementById("logout");


    // Exécuter uniquement si le bouton existe
    if (logout) {

        console.log("Dashboard chargé");


        logout.addEventListener("click", function () {

            sessionStorage.removeItem("utilisateur");

            window.location.href =
                "connexion.html";

        });

    }

});


// ======================================================
// NAVIGATION
// ======================================================

function ouvrirPage(page) {

    if (page === "produits") {

        window.location.href =
            "produits.html";

    } else {

        alert(
            "La page " +
            page +
            " sera créée prochainement."
        );

    }

}


// ======================================================
// PRODUITS
// ======================================================

let produits =
    JSON.parse(
        localStorage.getItem("produits")
    ) || [];


// ======================================================
// AFFICHER LES PRODUITS
// ======================================================

function afficherProduits(liste = produits) {

    const tableau =
        document.getElementById("listeProduits");


    // Important :
    // si on n'est pas sur produits.html,
    // on ne fait rien.
    if (!tableau) {
        return;
    }


    tableau.innerHTML = "";


    if (liste.length === 0) {

        tableau.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;">
                    Aucun produit
                </td>
            </tr>
        `;

        return;
    }


    liste.forEach(function (produit, index) {

        const ligne =
            document.createElement("tr");


        ligne.innerHTML = `

            <td>${produit.code}</td>

            <td>${produit.designation}</td>

            <td>${produit.categorie}</td>

            <td>
                ${Number(produit.prix)
                    .toLocaleString("fr-FR")}
            </td>

            <td>${produit.stock}</td>

            <td>

                <button
                    class="btn-modifier"
                    onclick="modifierProduit(${index})">

                    Modifier

                </button>

                <button
                    class="btn-supprimer"
                    onclick="supprimerProduit(${index})">

                    Supprimer

                </button>

            </td>

        `;


        tableau.appendChild(ligne);

    });

}


// ======================================================
// OUVRIR FORMULAIRE
// ======================================================

function ouvrirFormulaire() {

    const modal =
        document.getElementById("modal");

    const formulaire =
        document.getElementById("produitForm");


    if (!modal || !formulaire) {
        return;
    }


    modal.style.display = "flex";


    document.getElementById("titreFormulaire")
        .textContent = "Nouveau produit";


    formulaire.reset();


    document.getElementById("indexProduit")
        .value = "";

}


// ======================================================
// FERMER FORMULAIRE
// ======================================================

function fermerFormulaire() {

    const modal =
        document.getElementById("modal");


    if (modal) {

        modal.style.display = "none";

    }

}


// ======================================================
// ENREGISTRER PRODUIT
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const formulaire =
        document.getElementById("produitForm");


    // Uniquement sur produits.html
    if (!formulaire) {
        return;
    }


    formulaire.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const produit = {

                code:
                    document.getElementById("code")
                        .value.trim(),

                designation:
                    document.getElementById("designation")
                        .value.trim(),

                categorie:
                    document.getElementById("categorie")
                        .value.trim(),

                prix:
                    Number(
                        document.getElementById("prix")
                            .value
                            .replace(/,/g, "")
                    ),

                stock:
                    Number(
                        document.getElementById("stock")
                            .value
                            .replace(/,/g, "")
                    )

            };


            const index =
                document.getElementById("indexProduit")
                    .value;


            if (index === "") {

                produits.push(produit);

            } else {

                produits[Number(index)] =
                    produit;

            }


            localStorage.setItem(
                "produits",
                JSON.stringify(produits)
            );


            afficherProduits();

            fermerFormulaire();

        }
    );

});


// ======================================================
// MODIFIER
// ======================================================

function modifierProduit(index) {

    const produit =
        produits[index];


    if (!produit) {
        return;
    }


    document.getElementById("titreFormulaire")
        .textContent =
        "Modifier le produit";


    document.getElementById("indexProduit")
        .value = index;


    document.getElementById("code")
        .value = produit.code;


    document.getElementById("designation")
        .value = produit.designation;


    document.getElementById("categorie")
        .value = produit.categorie;


    document.getElementById("prix")
        .value = produit.prix;


    document.getElementById("stock")
        .value = produit.stock;


    document.getElementById("modal")
        .style.display = "flex";

}


// ======================================================
// SUPPRIMER
// ======================================================

function supprimerProduit(index) {

    const confirmation =
        confirm(
            "Voulez-vous vraiment supprimer ce produit ?"
        );


    if (!confirmation) {
        return;
    }


    produits.splice(index, 1);


    localStorage.setItem(
        "produits",
        JSON.stringify(produits)
    );


    afficherProduits();

}


// ======================================================
// RECHERCHE
// ======================================================

function rechercherProduit() {

    const champ =
        document.getElementById("recherche");


    if (!champ) {
        return;
    }


    const recherche =
        champ.value.toLowerCase();


    const resultat =
        produits.filter(function (produit) {

            return (

                produit.code
                    .toLowerCase()
                    .includes(recherche)

                ||

                produit.designation
                    .toLowerCase()
                    .includes(recherche)

                ||

                produit.categorie
                    .toLowerCase()
                    .includes(recherche)

            );

        });


    afficherProduits(resultat);

}


// ======================================================
// RETOUR DASHBOARD
// ======================================================

function retourDashboard() {

    window.location.href =
        "dashboard.html";

}


// ======================================================
// CHARGEMENT PRODUITS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    afficherProduits();

});


// ======================================================
// PWA - SERVICE WORKER
// ======================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(function (registration) {

                console.log(
                    "PWA : Service Worker enregistré",
                    registration.scope
                );

            })

            .catch(function (error) {

                console.error(
                    "PWA : erreur Service Worker",
                    error
                );

            });

    });

}
