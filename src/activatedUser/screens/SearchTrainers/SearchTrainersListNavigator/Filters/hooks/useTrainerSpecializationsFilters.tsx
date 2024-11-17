import * as React from 'react';

import { Specialization } from 'src/activatedUser/screens/ActivateAccount/_internals/models/specialization';
import { useTrainerSpecializationsQuery } from 'src/api/trainer';

const makeSpecializations = (dataFromBackend: string[]): Specialization[] =>
  dataFromBackend.map((spec, i) => ({
    label: spec,
    value: i + 1,
    isSelected: false,
  }));

export const useTrainerSpecializationsFilters = (defaultValue: string[] = []) => {
  const [specializations, setSpecializations] = React.useState<Specialization[]>([]);

  const { data, isLoading } = useTrainerSpecializationsQuery();

  React.useEffect(() => {
    if (data?.data && data.data.length > 0) {
      if (defaultValue.length > 0) {
        const initialSpecializations = makeSpecializations(data.data);
        const selectedSpecializations = initialSpecializations.map((spec) => ({
          ...spec,
          isSelected: defaultValue.includes(spec.label),
        }));
        setSpecializations(selectedSpecializations);
      } else {
        setSpecializations(makeSpecializations(data.data));
      }
    }
  }, [data?.data, defaultValue]);

  return { isLoading, specializations, setSpecializations };
};
