import moduleAlias from 'module-alias';

console.log({ __dirname });
moduleAlias.addAliases({
  '@config': `${__dirname}/config`,
});
