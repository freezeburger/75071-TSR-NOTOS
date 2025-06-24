# Synthèse TypeScript

## JavaScript

* Ne plus utliser `var`
* Matriser le `byRef` ou `byVal`
* Préferer les fonctions flechees `() => {}`
* Utiliser la **JSDoc**
* Preferer le `===`
* Valeurs de retour cohérente.
* Utilise la modularisation du code.

## TypeScript

* Eviter `any`
* Preferer `unknwon` a `any`

## TypeScript : Typage

* Le typage structurel (conforme a une structure)
* Le typage nominal (conforme a un type d'orgine)

> TypeScript met en oeuvre un un typage **structurel**

## TypeScript Modelisation

> Décrire l'intention structurelle du code.

* `interface`
* alias de type.
* *extraction de type*
* `class` si necessaire.
* Définir des *types primitifs applicatifs*


## TypeScript Syntaxe

```ts

class User{}

const user:User;

const dev = {
    typescript:true,
    social:true
}

type Dev = typeof dev;

const key:TYPE = value;

type MyTypeAlias = /* Expression de Type */

/** Clé optionelle vs valeur otpionelle */
interface MyType{
    valueA?:string
    valueB:string | null
}

const codes:number[] = [];
const codes:Array<number> = []; // Generic Type Notation

fetch('ENDPOINT').then<string[]>( res => res.json()) // Generic Type Notation


const doSomenthing = () => {
    window.api!.process() // pseudo code
}

```