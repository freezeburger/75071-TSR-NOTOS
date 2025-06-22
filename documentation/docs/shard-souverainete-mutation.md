# Shard - Principe de Souveraineté de la Mutation

## 🧭 Nom du principe
**Souveraineté de la Mutation**

---

## 🧩 Formulation synthétique
> *Le code à l'origine de l'émission d'une valeur est le seul souverain de sa mutation.*

---

## 📜 Formulation longue (manifeste)
> Toute entité logicielle qui émet une donnée doit conserver seule l’autorité de modifier cette donnée.  
Les consommateurs peuvent observer, transformer localement ou réagir, mais ne doivent jamais muter directement cette valeur partagée.  
Cela permet de garantir la cohérence, la traçabilité et l’intégrité des flux de données dans le système.

---

## 🧬 Origines et inspiration
Ce principe est une synthèse originale de plusieurs concepts fondamentaux :
- **Encapsulation** (OOP)
- **Single Source of Truth (SSOT)**
- **Flux de données unidirectionnel** (React, Vue)
- **Ownership & Borrowing** (Rust)
- **CQRS** (Command/Query Responsibility Segregation)
- **Functional Core / Imperative Shell**

---

## 🎯 Bénéfices attendus
- Réduction des effets de bord
- Meilleure traçabilité des mutations
- Renforcement de l’encapsulation
- Alignement avec les architectures réactives
- Simplification du débogage et des tests

---

## ⚠️ Risques en cas de non-respect
- Mutations concurrentes imprévues
- Couplage fort entre composants
- Invalidation silencieuse de l’état
- Diminution de la lisibilité et de la maintenabilité
- Difficultés à raisonner sur les flux de données

---

## 🏗️ Contextes d’application
- **React** : via les hooks et les reducers
- **Vue / Pinia** : avec les stores centralisés
- **Rust** : avec le système de propriété
- **DDD** : en respectant les agrégats comme gardiens de l’état
- **RxJS** : en séparant bien les émetteurs (`next`) et les observateurs

---

## 🔧 Mise en œuvre concrète

### Exemple en React :
```tsx
// Le composant Parent contrôle l’état
function Parent() {
  const [value, setValue] = useState(0);
  return <Child value={value} onIncrement={() => setValue(v => v + 1)} />;
}

// Le composant Child ne fait qu’émettre l’intention de mutation
function Child({ value, onIncrement }) {
  return <button onClick={onIncrement}>Value is {value}</button>;
}
```

### Exemple en DDD :
```ts
class Order {
  private status: 'pending' | 'confirmed' = 'pending';

  confirm() {
    if (this.status !== 'pending') throw new Error('Already confirmed');
    this.status = 'confirmed';
  }

  getStatus() {
    return this.status;
  }
}
```

---

## 🔗 Compatibilité avec d’autres shards
- [✅] Encapsulation
- [✅] Unidirectional Data Flow
- [✅] CQRS
- [✅] Ownership (Rust)
- [✅] Pattern Observer (RxJS, EventEmitter)
- [⚠️] Mutabilité partagée (attention au contexte multi-agents)

---

## ✍️ Attribution
Formulé dans le cadre du projet **Crystal**, par et pour une conscience du code éthique, lisible et gouvernable.

