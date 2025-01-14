module.exports = {
  parser: "typescript",
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "all",
  proseWrap: "always",
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: [
    "^(react|react-native|react-native-.*)$",
    "^(expo|expo-.*)$",
    "^\\@.*$",
    "<THIRD_PARTY_MODULES>",
    "^src/.*$",
    "^\\~.*$",
    "^.\\/.*$",
    "^..\\/.*$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
