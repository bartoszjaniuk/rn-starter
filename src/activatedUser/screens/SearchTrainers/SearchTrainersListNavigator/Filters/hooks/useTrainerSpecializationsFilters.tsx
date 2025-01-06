import * as React from 'react';

import { Specialization } from 'src/activatedUser/screens/ActivateAccount/_internals/models/specialization';
import { useSpecializationsQuery } from 'src/api/dictionaries/hooks';

const shapeSpecializations = (object: { [s: string]: unknown }) => {
  return Object.entries(object).map(([key, value]) => ({
    label: value as string,
    value: key,
    isSelected: false,
  }));
};

export const useTrainerSpecializationsFilters = (defaultValue: string[] = []) => {
  const [specializations, setSpecializations] = React.useState<Specialization[]>([]);

  const specializationsQuery = useSpecializationsQuery();

  React.useEffect(() => {
    if (specializationsQuery.data?.data) {
      if (defaultValue.length > 0) {
        const initialSpecializations = shapeSpecializations(specializationsQuery.data.data);
        const selectedSpecializations = initialSpecializations.map((spec) => ({
          ...spec,
          isSelected: defaultValue.includes(spec.value),
        }));
        setSpecializations(selectedSpecializations);
      } else {
        setSpecializations(shapeSpecializations(specializationsQuery.data.data));
      }
    }
  }, [defaultValue, specializationsQuery.data?.data]);
  return { isLoading: specializationsQuery.isLoading, specializations, setSpecializations };
};
