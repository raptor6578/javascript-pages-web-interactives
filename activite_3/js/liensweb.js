/* 
Activité 3
*/

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

const contenu = document.getElementById('contenu');
contenu.appendChild(alerte);
contenu.appendChild(bouton);
contenu.appendChild(liste);

ajaxGet('https://oc-jswebsrv.herokuapp.com/api/liens',res => {
    JSON.parse(res).forEach((data) => {
        ajouterElement(data);
    });
});

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
        const data = new FormData(formulaire);
        ajaxPost('https://oc-jswebsrv.herokuapp.com/api/lien', data, () => {
            const elem = {
                titre: formulaire.elements.titre.value,
                url: formulaire.elements.url.value,
                auteur: formulaire.elements.auteur.value
            };
            ajouterElement(elem, true);
            alerte.innerText = `Le lien "${elem.titre}" a bien été ajouté.`;
            alerte.style.display = 'block';
            setTimeout(() => alerte.style.display = 'none', 2000);
        });
        contenu.replaceChild(bouton, formulaire);
    });

}

function ajouterElement(data, firstChild) {

    const elem = document.createElement('li');
    elem.className = 'lien';
    if (firstChild) {
        liste.insertBefore(elem, liste.firstChild);
    } else {
        liste.appendChild(elem);
    }

    const lien = document.createElement('a');
    lien.href = data.url;
    lien.innerText = data.titre;
    lien.style.textDecoration = 'none';
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

function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", () => {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(`${req.status} ${req.statusText} ${url}`);
        }
    });
    req.addEventListener("error", () => {
        console.error(`Erreur réseau avec l'URL ${url}`);
    });
    req.send(null);
}

function ajaxPost(url, data, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", () => {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(`${req.status} ${req.statusText} ${url}`);
        }
    });
    req.addEventListener("error", () => {
        console.error(`Erreur réseau avec l'URL ${url}`);
    });
    req.send(data);
}
