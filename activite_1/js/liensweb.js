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



const liste = document.createElement('ul');
liste.id = 'liste';
liste.style.listStyle = 'none';
liste.style.paddingLeft = '0px';

for (data of listeLiens) {

    const elem = document.createElement('li');
    elem.className = 'lien';
    liste.appendChild(elem);

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

const contenu = document.getElementById('contenu');
contenu.appendChild(liste);
