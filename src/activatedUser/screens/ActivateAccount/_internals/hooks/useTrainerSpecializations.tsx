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

  const { data, isLoading } = useTrainerSpecializationsQuery();

  React.useEffect(() => {
    if (data?.data && data.data.length > 0) setSpecializations(makeSpecializations(data.data));
  }, [data?.data]);

  return { isLoading, specializations, setSpecializations };
};
