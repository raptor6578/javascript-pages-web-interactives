/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
const listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

const alerte = document.createElement('div');
alerte.id = 'alerte';
alerte.style.padding = '15px';
alerte.style.marginBottom = '10px';
alerte.style.backgroundColor = ' #e2f1fe';
alerte.style.display = 'none';

const bouton = document.createElement('button');
bouton.innerText = 'Ajouter un lien';
bouton.style.fontSize = '12px';
bouton.addEventListener('click', creerFormulaire);

const liste = document.createElement('ul');
liste.id = 'liste';
liste.style.listStyle = 'none';
liste.style.paddingLeft = '0px';
listeLiens.forEach(ajouterElement);

const contenu = document.getElementById('contenu');
contenu.appendChild(alerte);
contenu.appendChild(bouton);
contenu.appendChild(liste);

function creerFormulaire() {

    if (alerte.style.display === 'block') {
        alerte.style.display = 'none';
    }

    const formulaire = document.createElement('form');

    const auteur = document.createElement('input');
    auteur.type = 'text';
    auteur.name = 'auteur';
    auteur.id = 'auteur';
    auteur.required = true;
    auteur.placeholder = 'Entrez votre nom';
    auteur.style.marginRight = '10px';
    formulaire.appendChild(auteur);

    const titre = document.createElement('input');
    titre.type = 'text';
    titre.name = 'titre';
    titre.id = 'titre';
    titre.required = true;
    titre.placeholder = 'Entrez le titre du lien';
    titre.style.marginRight = '10px';
    formulaire.appendChild(titre);

    const url = document.createElement('input');
    url.type = 'url';
    url.name = 'url';
    url.id = 'url';
    url.required = true;
    url.placeholder = 'Entrez l\'URL du lien';
    url.style.marginRight = '10px';
    formulaire.appendChild(url);

    const boutonAjouter = document.createElement('button');
    boutonAjouter.innerText = 'Ajouter';
    boutonAjouter.type = 'submit';
    formulaire.appendChild(boutonAjouter);

    contenu.replaceChild(formulaire, bouton);

    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const elem = {
            titre: formulaire.elements.titre.value,
            url: formulaire.elements.url.value,
            auteur: formulaire.elements.auteur.value
        };
        listeLiens.push(elem);
        ajouterElement(elem);
        alerte.innerText = `Le lien "${formulaire.elements.titre.value}" a bien été ajouté.`;
        alerte.style.display = 'block';
        setTimeout(() => alerte.style.display = 'none', 2000);
        contenu.replaceChild(bouton, formulaire);
    });
}

function ajouterElement(data) {
    const elem = document.createElement('li');
    elem.className = 'lien';
    liste.insertBefore(elem, liste.firstChild);

    const lien = document.createElement('a');
    lien.href = data.url;
    lien.innerText = data.titre;
    lien.style.color = "#428bca";
    elem.appendChild(lien);

    const url = document.createElement('span');
    url.innerText = ` ${data.url}`;
    elem.appendChild(url);

    elem.appendChild(document.createElement('br'));

    const auteur = document.createElement('span');
    auteur.innerText = `Ajouté par ${data.auteur}`;
    elem.appendChild(auteur);
}


