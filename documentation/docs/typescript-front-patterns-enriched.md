# 📘 Typologie des Types & Patterns en Front-End TypeScript (version enrichie)

## Objectif

Ce document structure les types et patterns utilisés dans une application front-end moderne en TypeScript, en intégrant :

- Les **primitives applicatives** (domain primitives),
- Les **types structurants** (DTO, VO, Props…),
- Des **design patterns** typiques (EventBus, Observer, StateMachine, Memento…),
- Des **conventions de structuration** et d’extension multi-projet.

---

## 🧩 1. Primitifs Applicatifs (Domain Primitives)

| Nom du type      | Type réel     | Description sémantique                                   |
|------------------|---------------|-----------------------------------------------------------|
| `UserId`         | `number`      | Identifiant unique d’un utilisateur                      |
| `Email`          | `string`      | Email valide                                              |
| `Slug`           | `string`      | URL-safe string                                           |
| `TimeStamp`      | `number`      | Timestamp en ms                                           |
| `CurrencyEUR`    | `number`      | Montant monétaire exprimé en EUR                         |

---

## 🧠 2. Types Utilitaires

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

## 🧱 3. Types par Couche

### Métier (`types/domain/`)

```ts
type User = {
  id: UserId;
  email: Email;
  role: 'admin' | 'editor';
};
```

### DTO (`types/dto/`)

```ts
type UserDTO = {
  id: number;
  email: string;
  role: string;
};
```

### UI / ViewModel (`types/ui/`)

```ts
type UserCardProps = {
  displayName: string;
  isActive: boolean;
};
```

---

## 🔁 4. Mapping Types

```ts
function mapFromDTO(dto: UserDTO): User {
  return { id: dto.id, email: dto.email as Email, role: dto.role as 'admin' | 'editor' };
}

function mapToDTO(user: User): UserDTO {
  return { id: user.id, email: user.email, role: user.role };
}
```

---

## ✅ 5. Validation & Schéma

```ts
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type UserForm = z.infer<typeof UserSchema>;
```

---

## 🛑 6. Gestion des Erreurs

```ts
type AppError = {
  code: string;
  message: string;
  source?: 'api' | 'validation' | 'client';
};
```

---

## 🧰 7. Patterns Typiques

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

### EventBus

```ts
type EventMap = {
  'user:login': { id: number };
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

### StateMachine

```ts
type State = 'idle' | 'loading' | 'success' | 'error';

class StateMachine {
  state: State = 'idle';

  transition(event: 'fetch' | 'resolve' | 'fail') {
    switch (this.state) {
      case 'idle': if (event === 'fetch') this.state = 'loading'; break;
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

### Strategy Pattern (ex. affichage conditionnel)

```ts
interface RendererStrategy {
  render(data: any): string;
}

class JsonRenderer implements RendererStrategy {
  render(data: any) {
    return JSON.stringify(data, null, 2);
  }
}

class HtmlRenderer implements RendererStrategy {
  render(data: any) {
    return `<pre>${data}</pre>`;
  }
}

function useRenderer(strategy: RendererStrategy, data: any) {
  return strategy.render(data);
}
```

---

## 🔄 8. Configuration & Feature Flags

```ts
type AppConfig = {
  apiUrl: string;
  featureFlags: FeatureFlags;
};

type FeatureFlags = {
  enableExperimentalUI: boolean;
};
```

---

## 🗂 9. Recommandations de Structuration

```
/types
  /primitives
  /dto
  /domain
  /ui
  /validation
  /shared
```

---

## 📚 Références

- https://basarat.gitbook.io/typescript/
- https://refactoring.guru/design-patterns
- https://zod.dev
