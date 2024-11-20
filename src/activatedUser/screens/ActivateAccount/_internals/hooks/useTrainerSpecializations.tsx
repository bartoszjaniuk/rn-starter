import * as React from 'react';

import { useTrainerSpecializationsQuery } from 'src/api/trainer';

import { Specialization } from '../models/specialization';

const makeSpecializations = (dataFromBackend: string[]): Specialization[] =>
  dataFromBackend.map((spec, i) => ({
    label: spec,
    value: i + 1,
    isSelected: false,
  }));

export const useTrainerSpecializations = () => {
  const [specializations, setSpecializations] = React.useState<Specialization[]>([]);

  const trainerSpecializationsQuery = useTrainerSpecializationsQuery();

  React.useEffect(() => {
    if (trainerSpecializationsQuery.data?.data && trainerSpecializationsQuery.data.data.length > 0)
      setSpecializations(makeSpecializations(trainerSpecializationsQuery.data.data));
  }, [trainerSpecializationsQuery.data?.data]);

  return {
    ...trainerSpecializationsQuery,
    specializations,
    setSpecializations,
  };
};
