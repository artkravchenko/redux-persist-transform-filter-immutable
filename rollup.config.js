import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }

  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
}

export default [
  // CommonJS
  {
    input: 'index.js',
    output: { file: 'dist/index.js', format: 'cjs', indent: false },
    external: makeExternalPredicate([
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]),
    plugins: [
      nodeResolve(),
      babel(),
    ]
  },

  // ES
  {
    input: 'index.js',
    output: { file: 'es/index.js', format: 'es', indent: false },
    external: makeExternalPredicate([
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]),
    plugins: [
      nodeResolve(),
      babel(),
    ],
  },
]
