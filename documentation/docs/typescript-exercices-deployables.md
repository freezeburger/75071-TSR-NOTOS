# Liste d'exercices pour apprendre TypeScript

Voici une série d'exercices pour vous aider à maîtriser TypeScript, allant de la découverte des bases aux concepts plus avancés.

---

## 1. Types de base

### Exercice 1.1 : Déclaration de variables avec types

**Énoncé :**  
Déclarez une variable `nom` de type `string` et assignez-lui votre nom. Ensuite, déclarez une variable `age` de type `number` et assignez-lui votre âge.

<details>
<summary>Correction</summary>

```ts
let nom: string = 'VotreNom';
let age: number = 25;
```
</details>

---

### Exercice 1.2 : Utilisation de types unifiés

**Énoncé :**  
Créez une variable `personne` qui peut être soit un `string` pour le nom, soit un `number` pour l'âge. Utilisez l'union type `string | number`.

<details>
<summary>Correction</summary>

```ts
let personne: string | number;
personne = 'Alice';
personne = 30;
```
</details>

---

## 2. Interfaces

### Exercice 2.1 : Définir une interface simple

**Énoncé :**  
Définissez une interface `Employe` avec les propriétés `nom` (string), `poste` (string) et `salaire` (number). Créez un objet `employe` conforme à cette interface.

<details>
<summary>Correction</summary>

```ts
interface Employe {
    nom: string;
    poste: string;
    salaire: number;
}

let employe: Employe = {
    nom: 'Jean Dupont',
    poste: 'Développeur',
    salaire: 3000
};
```
</details>

---

### Exercice 2.2 : Interface avec méthodes

**Énoncé :**  
Ajoutez une méthode `afficherDetails()` à l'interface `Employe`, qui retourne une chaîne de caractères avec les détails de l'employé. Modifiez l'objet `employe` pour implémenter cette méthode.

<details>
<summary>Correction</summary>

```ts
interface Employe {
    nom: string;
    poste: string;
    salaire: number;
    afficherDetails(): string;
}

let employe: Employe = {
    nom: 'Jean Dupont',
    poste: 'Développeur',
    salaire: 3000,
    afficherDetails() {
        return `${this.nom} travaille comme ${this.poste} et gagne ${this.salaire} euros.`;
    }
};

console.log(employe.afficherDetails());
```
</details>

---

## 3. Fonctions

### Exercice 3.1 : Fonction avec types de paramètres et de retour

**Énoncé :**  
Écrivez une fonction `additionner` qui prend deux paramètres `a` et `b` de type `number` et retourne leur somme.

<details>
<summary>Correction</summary>

```ts
function additionner(a: number, b: number): number {
    return a + b;
}

console.log(additionner(5, 10));
```
</details>

---

### Exercice 3.2 : Fonction avec types optionnels

**Énoncé :**  
Modifiez la fonction `additionner` pour que le deuxième paramètre `b` soit optionnel.

<details>
<summary>Correction</summary>

```ts
function additionner(a: number, b?: number): number {
    return b !== undefined ? a + b : a;
}

console.log(additionner(5));
console.log(additionner(5, 10));
```
</details>

---

## 4. Classes

### Exercice 4.1 : Déclaration de classe

**Énoncé :**  
Déclarez une classe `Voiture` avec les propriétés `marque` et `modele`.

<details>
<summary>Correction</summary>

```ts
class Voiture {
    marque: string;
    modele: string;

    constructor(marque: string, modele: string) {
        this.marque = marque;
        this.modele = modele;
    }
}

let voiture = new Voiture('Toyota', 'Corolla');
console.log(voiture);
```
</details>

---

### Exercice 4.2 : Méthode dans une classe

**Énoncé :**  
Ajoutez une méthode `afficherDetails` à la classe `Voiture`.

<details>
<summary>Correction</summary>

```ts
class Voiture {
    marque: string;
    modele: string;

    constructor(marque: string, modele: string) {
        this.marque = marque;
        this.modele = modele;
    }

    afficherDetails(): string {
        return `Voiture: ${this.marque} ${this.modele}`;
    }
}

let voiture = new Voiture('Toyota', 'Corolla');
console.log(voiture.afficherDetails());
```
</details>

---

## 5. Génériques

### Exercice 5.1 : Fonction générique

**Énoncé :**  
Créez une fonction `identite` qui retourne le paramètre reçu.

<details>
<summary>Correction</summary>

```ts
function identite<T>(val: T): T {
    return val;
}

console.log(identite<string>('Hello'));
console.log(identite<number>(42));
```
</details>

---

### Exercice 5.2 : Interface générique

**Énoncé :**  
Créez une interface `Boite<T>` contenant un champ `contenu` de type `T`.

<details>
<summary>Correction</summary>

```ts
interface Boite<T> {
    contenu: T;
}

const boiteNombre: Boite<number> = { contenu: 100 };
const boiteTexte: Boite<string> = { contenu: 'Bonjour' };
```
</details>

---

## 6. Modules

### Exercice 6.1 : Export / Import

**Énoncé :**  
Créez une fonction `additionner` dans un fichier `math.ts`, puis importez-la dans `main.ts`.

<details>
<summary>Correction</summary>

```ts
// math.ts
export function additionner(a: number, b: number): number {
    return a + b;
}

// main.ts
import { additionner } from './math';

console.log(additionner(2, 3));
```
</details>

---

### Exercice 6.2 : Export par défaut

**Énoncé :**  
Créez un module `utils.ts` avec une fonction `multiplier` en export par défaut.

<details>
<summary>Correction</summary>

```ts
// utils.ts
export default function multiplier(a: number, b: number): number {
    return a * b;
}

// main.ts
import multiplier from './utils';

console.log(multiplier(2, 3));
```
</details>

---

## 7. Décorateurs

### Exercice 7.1 : Décorateur de classe

**Énoncé :**  
Créez un décorateur `logClass` qui affiche un message à l’instanciation.

<details>
<summary>Correction</summary>

```ts
function logClass(constructor: Function) {
    console.log(`Classe instanciée: ${constructor.name}`);
}

@logClass
class Test {
    constructor() {}
}
```
</details>

---

### Exercice 7.2 : Décorateur de méthode

**Énoncé :**  
Créez un décorateur `logMethod` pour afficher les arguments de la méthode.

<details>
<summary>Correction</summary>

```ts
function logMethod(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Méthode ${key} appelée avec:`, args);
        return original.apply(this, args);
    };
}

class Calcul {
    @logMethod
    somme(a: number, b: number) {
        return a + b;
    }
}
```
</details>

---

## 8. Types avancés

### Exercice 8.1 : Type conditionnel

**Énoncé :**  
Créez un type `Valeur<T>` qui est `string` si `T` est `string`, sinon `number`.

<details>
<summary>Correction</summary>

```ts
type Valeur<T> = T extends string ? string : number;

let a: Valeur<string> = 'test';
let b: Valeur<boolean> = 123;
```
</details>

---

### Exercice 8.2 : Type mappé

**Énoncé :**  
Créez un type `Readonly<T>` rendant toutes les propriétés de `T` en lecture seule.

<details>
<summary>Correction</summary>

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface Point {
    x: number;
    y: number;
}

const p: Readonly<Point> = { x: 1, y: 2 };
// p.x = 3; // Erreur
```
</details>
