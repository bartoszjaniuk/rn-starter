import * as React from 'react';

import { useTrainerSpecializationsQuery } from 'src/api/trainer';

type Specialization = {
  label: string;
  value: number;
  isSelected: boolean;
};

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
