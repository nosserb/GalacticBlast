<p align="center">
  <a href="https://ibb.co/20swhkhL">
    <img src="https://i.ibb.co/20swhkhL/2f70d3760058.png" alt="Galactic Blast Logo" width="400">
  </a>
</p>

![Static Badge](https://img.shields.io/badge/GITHUB-nosserb-brightgreen?logo=Github)


---

<div align="center" style="
  border: 2px solid hsla(39, 100%, 50%, 0.57);
  border-radius: 12px;
  padding: 12px 18px;
  width: fit-content;
  margin: auto;
">
  
<p align="center">
<strong>GALACTIC BLAST</strong> est un générateur de titre haute qualité.
Saisissez du texte, choisissez votre police, couleur et taille,
et l'application génère automatiquement une image premium.
L'image est téléchargée sur ImgBB et un lien public est généré.
Trois formats d'export sont disponibles : URL brute, Markdown et HTML.
</p>
</div>

---

<p align="center">
  <a href="https://i.ibb.co/Kp65ZBvK/fc33a1588035.png">
    <img src="https://i.ibb.co/Kp65ZBvK/fc33a1588035.png" alt="Architecture">
  </a>
</p>

<div align="center" style="
  border: 2px solid hsla(39, 100%, 50%, 0.57);
  border-radius: 12px;
  padding: 12px 18px;
  width: fit-content;
  margin: auto;
">

<pre style="
  margin: 0;
  font-family: Consolas, monospace;
  text-align: left;
">
/GalacticBlast
  │─ app/
  │  │─ page.tsx
  │  └─ api/upload/route.ts
  │─ public/fonts/
  │  │─ HIGHSPEED.TTF
  │  └─ Lady Radical.ttf
  │─ package.json
  │─ .env.local
  │─ README.md
</pre>

</div>

---

<p align="center">
  <a href="https://i.ibb.co/NdrJSMcw/48cfb9373001.png">
    <img src="https://i.ibb.co/NdrJSMcw/48cfb9373001.png" alt="Features">
  </a>
</p>

<p align="center">
<strong>Génération d'images Canvas 1200×400px
</p>
<p align="center">
Support de 2 polices premium (HIGHSPEED, Lady Radical)
<p align="center">
Couleur personnalisable avec effet de lueur (glow)
<p align="center">
Taille de police ajustable (30px - 200px)
<p align="center">
Intégration automatique avec ImgBB API
<p align="center">
Export en 3 formats (URL, Markdown, HTML)
</p>
<p align="center">
Interface minimaliste avec thème orange/or premium
</p>

---

<p align="center">
  <a href="https://i.ibb.co/WN5frxd6/2ee3d1b24181.png">
    <img src="https://i.ibb.co/WN5frxd6/2ee3d1b24181.png" alt="How it works">
  </a>
</p>

<div align="center" style="
  border: 2px solid hsla(39, 100%, 50%, 0.57);
  border-radius: 12px;
  padding: 12px 18px;
  width: fit-content;
  margin: auto;
">

## Étape 1 : Saisir le texte

***Entrez votre texte dans la textarea***

```javascript
const texte = "GALACTIC BLAST";
```

## Étape 2 : Personnaliser

***Choisissez votre police, couleur hexadécimale et taille***

```javascript
const font = "HIGHSPEED";      // ou "Lady Radical"
const color = "#ff9500";       // couleur hex
const fontSize = 120;           // 30 - 200px
```

## Étape 3 : Générer l'image

***Cliquez sur le bouton "Générer" ou appuyez sur Ctrl+Entrée***

```javascript
const response = await fetch('/api/upload', {
  method: 'POST',
  body: JSON.stringify({ texte, font, color, fontSize })
});
const { success, imageUrl } = await response.json();
```

## Étape 4 : Copier le lien

***L'image est générée, uploadée et un lien public est retourné***

```javascript
// Format URL brute
const url = "https://ibb.co/xxxxx";

// Format Markdown
const markdown = "![texte](https://ibb.co/xxxxx)";

// Format HTML
const html = "<img src='https://ibb.co/xxxxx' alt='texte'>";
```

## Résultat attendu

***Une image haute qualité est générée, uploadée sur ImgBB, et un lien public est retourné.***

</p>
</div>

---

<p align="center">
  <a href="https://i.ibb.co/vCLfdPFj/38d53e21994c.png">
    <img src="https://i.ibb.co/vCLfdPFj/38d53e21994c.png" alt="Technical details">
  </a>
</p>

<div align="center" style="
  border: 2px solid hsla(39, 100%, 50%, 0.57);
  border-radius: 12px;
  padding: 12px 18px;
  width: fit-content;
  margin: auto;
">

## Architecture

### Frontend (`app/page.tsx`)

***État React pour gérer :***

**texte** : contenu à générer

**font** : police sélectionnée (HIGHSPEED ou Lady Radical)

**color** : couleur hexadécimale

**fontSize** : taille en pixels (30-200)

**generatedUrl** : lien de l'image générée

**isLoading** : état de chargement

**error** : gestion des erreurs

***Trois fonctions de copie :***

**copyToClipboard()** : Copie l'URL brute

**copyMarkdown()** : Copie le format Markdown

**copyHTML()** : Copie le code HTML

### Backend (`app/api/upload/route.ts`)

#### 1. Génération d'image Canvas

***`generateImage(texte, fontType, color, fontSize)`***

**Crée un canvas 1200×400px**

**Enregistre les polices TTF depuis `/public/fonts/`**

**Applique la couleur et l'effet de lueur (glow)**

**Convertit en PNG base64**

#### 2. Upload ImgBB

***Envoie l'image à ImgBB et récupère l'URL publique***

```
POST /upload HTTP/1.1
Content-Type: multipart/form-data

image: <base64_data>
key: <IMGBB_API_KEY>
```

#### 3. Retour du résultat

```json
{
  "success": true,
  "imageUrl": "https://ibb.co/xxxxx"
}
```

## Configuration

### 1. Clé API ImgBB

***Créez un fichier `.env.local` à la racine du projet :***

```
IMGBB_API_KEY=votre_clé_api_ici
```

### 2. Polices personnalisées

***Les polices TrueType sont stockées dans `/public/fonts/` :***

**HIGHSPEED.TTF** - Police moderne épurée

**Lady Radical.ttf** - Police stylisée

***Pour ajouter une police :***

**1. Placez le fichier `.ttf` dans `/public/fonts/`**

**2. Importez-la dans le backend avec `registerFont()`**

**3. Ajoutez l'option dans le sélecteur frontend**

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **Next.js** | 15.5.6 | Framework full-stack |
| **React** | 19 | Interface utilisateur |
| **TypeScript** | - | Typage statique |
| **Canvas** | 3.2.0 | Génération d'images |
| **Tailwind CSS** | 4 | Styling/Responsive |
| **ImgBB API** | v1 | Hébergement images |

## Thème de couleurs

**Orange principal** : #ff9500

**Bleu fond** : #0f172a

**Marron dégradé** : #78350f

**Texte clair** : #e0e0e0

## Gestion des erreurs

***Le programme retourne une erreur si :***

**La clé API ImgBB est invalide**

**Le texte est vide ou trop long**

**La police sélectionnée n'existe pas**

**L'upload vers ImgBB échoue**

**Le serveur ImgBB est indisponible**

</p>
</div>

---

<p align="center">
  © 2025 <a href="https://github.com/nosserb/GalacticBlast">GALACTIC BLAST</a>
</p>

<p align="center">
  Created by <a href="https://github.com/nosserb">nosserb</a>
</p>

