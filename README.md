# eslint-plugin-no-state-hooks

Avoid using useState or useReducer

When using an architecture that separates your application state from your UI components (e.g. Flux), it may be desirable to forbid the use of local component state.

## Examples

```tsx
function MyComponent() {
  const [getState, setState] = useState(); // error
  const [state, dispatch] = useReducer(() => {}, undefined); // error
  return <></>;
}
```

## Installation

```sh
npm i -D eslint-plugin-no-state-hooks
```

## Usage

Install and enable typescript-eslint with type linting, see:

- https://typescript-eslint.io/docs
- https://typescript-eslint.io/docs/linting/typed-linting

```sh
npm install -D @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest eslint@latest typescript@latest
```

```json
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "tsconfigRootDir": ".",
    "project": ["./tsconfig.json"]
  },
  "plugins": ["@typescript-eslint"],
```

Configure the plugin in your `.eslintrc`:

```json
{
  "extends": ["plugin:no-state-hooks/recommended"]
}
```

This essentially expands to:

```json
{
  "plugins": ["no-state-hooks"],
  "rules": {
    "no-state-hooks/no-state-hooks": "error"
  }
}
```

## Credit

Inspired by:

- https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
- https://github.com/jsx-eslint/eslint-plugin-react/blob/master/lib/rules/no-set-state.js
