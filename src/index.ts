import { ESLintUtils } from '@typescript-eslint/utils';

export function assertType<T>(_value: unknown): asserts _value is T {}

const createRule = ESLintUtils.RuleCreator(name => name);

export const rule = createRule<[], 'no-state&&'>({
  name: 'no-state-hooks',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow usage of useState or useReducer',
      recommended: 'error',
      requiresTypeChecking: false,
    },
    messages: {
      'no-state&&': 'Do not use useState or useReducer',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression: node => {
        assertType<{ name: string }>(node.callee);
        const name = node.callee.name;
        if (name === 'useState' || name === 'useReducer') {
          context.report({
            node,
            messageId: 'no-state&&',
          });
        }
      },
    };
  },
});

export const configs = {
  recommended: {
    plugins: ['no-state-hooks'],
    rules: {
      'no-state-hooks/no-state-hooks': 'error',
    },
  },
};

export const rules = {
  'no-state-hooks': rule,
};
