export const dictionariesQueryKeys = {
  dictionaries: () => 'dictionaries',
  getSpecializations: () => `${dictionariesQueryKeys.dictionaries()}/specializations`,
};
