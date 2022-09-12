import { TSESLint } from '@typescript-eslint/utils';
import { rule } from '../src';

const parserOptions: TSESLint.ParserOptions = {
  sourceType: 'module',
  ecmaVersion: 'latest',
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions,
});

ruleTester.run('no-state-hooks', rule, {
  valid: [
    {
      code: `
        const Component = () => {
          return <></>;
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const Component = () => {
          const [get, set] = useState('');
          return <>{t && <p>test</p>}</>;
        };
      `,
    },
    {
      code: `
        const Component = () => {
          const [get, set] = useState<T>('');
          return <>{t && <p>test</p>}</>;
        };
      `,
    },
    {
      code: `
        const Component = () => {
          const [get, set] = useReducer({});
          return <>{t && <p>test</p>}</>;
        };
      `,
    },
  ]
    // Auto map errors
    .map(o => ({
      ...o,
      errors: [
        {
          messageId: 'no-state&&',
        },
      ],
    })),
});
