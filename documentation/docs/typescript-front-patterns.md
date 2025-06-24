# 📘 Typologie des Types & Patterns en Front-End TypeScript

## Objectif

Ce document recense et structure les **types et patterns les plus couramment utilisés** dans une application front-end moderne (Vue, React, Svelte…), en TypeScript.

---

## 🧩 1. Primitifs Applicatifs (Domain Primitives)

| Nom du type      | Type réel     | Description sémantique                                   |
|------------------|---------------|-----------------------------------------------------------|
| `UserId`         | `number`      | Identifiant unique d’un utilisateur                      |
| `Email`          | `string`      | Email valide, potentiellement validé par regex           |
| `PhoneNumber`    | `string`      | Numéro de téléphone au format international              |
| `Slug`           | `string`      | Chaîne lisible dans une URL (`ex: article-mon-blog`)     |
| `TimeStamp`      | `number`      | Date exprimée en millisecondes depuis l’epoch            |
| `TextShort`      | `string`      | Texte court (titre, champ réduit)                        |
| `TextLong`       | `string`      | Texte long (description, commentaire, contenu riche)     |
| `CurrencyEUR`    | `number`      | Montant exprimé en euros, sans taxe                      |

---

## 🧠 2. Types Utilitaires & Transverses

```ts
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type WithId<T> = T & { id: number };
type WithMeta<T> = T & { meta: { createdAt: number; updatedAt?: number } };
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
```

---

## 🧱 3. Niveaux de Destination

### Métier

```ts
type User = {
  id: UserId;
  email: Email;
  role: 'admin' | 'editor';
};
```

### DTO

```ts
type UserDTO = {
  id: number;
  email: string;
  role: string;
};
```

### UI

```ts
type UserCardProps = {
  displayName: string;
  isActive: boolean;
};
```

---

## 🧰 4. Design Patterns Typiques

### VO – Value Object

```ts
class Email {
  constructor(private value: string) {
    if (!value.includes('@')) throw new Error('Invalid email');
  }
  toString() {
    return this.value;
  }
}
```

---

### DTO – Data Transfer Object

Objet simple utilisé pour transmettre les données.

---

### Observer

```ts
type Listener<T> = (data: T) => void;

class Observable<T> {
  private listeners: Listener<T>[] = [];

  subscribe(listener: Listener<T>) {
    this.listeners.push(listener);
  }

  notify(data: T) {
    for (const l of this.listeners) l(data);
  }
}
```

---

### EventBus

```ts
type EventMap = {
  'user:login': { id: number };
  'user:logout': void;
};

class EventBus<T extends Record<string, any>> {
  private listeners = new Map<keyof T, Function[]>();

  on<K extends keyof T>(event: K, fn: (payload: T[K]) => void) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(fn);
  }

  emit<K extends keyof T>(event: K, payload: T[K]) {
    this.listeners.get(event)?.forEach(fn => fn(payload));
  }
}
```

---

### StateMachine

```ts
type State = 'idle' | 'loading' | 'success' | 'error';

class StateMachine {
  state: State = 'idle';

  transition(event: 'fetch' | 'resolve' | 'fail') {
    switch (this.state) {
      case 'idle':
        if (event === 'fetch') this.state = 'loading';
        break;
      case 'loading':
        if (event === 'resolve') this.state = 'success';
        else if (event === 'fail') this.state = 'error';
        break;
      case 'error':
      case 'success':
        if (event === 'fetch') this.state = 'loading';
        break;
    }
  }
}
```

---

### Memento

```ts
class Editor {
  private content = '';
  private history: string[] = [];

  write(text: string) {
    this.history.push(this.content);
    this.content += text;
  }

  undo() {
    this.content = this.history.pop() || '';
  }

  getContent() {
    return this.content;
  }
}
```

---

## 🧠 Recommandations

- Nommer les types selon leur usage (`DTO`, `VO`, `Props`, etc.),
- Utiliser des types `FromDTO<T>` / `ToDTO<T>` pour convertir entre couches,
- Séparer `primitives`, `ui`, `dto`, `services`, `stores`.

---

## 📚 Pour aller plus loin

- TypeScript Deep Dive – https://basarat.gitbook.io/typescript/
- Design Patterns – https://refactoring.guru/design-patterns
- Zod / Yup pour valider dynamiquement les objets métiers
