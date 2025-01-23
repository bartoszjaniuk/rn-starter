import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useAlert } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useAlert';
import { useDeleteTrainerAvailabilityMutation } from 'src/api/trainer/hooks';
import { TrainerBookTrainingPostV1Payload } from 'src/api/trainer/models';

import { Icon } from '../Icon';
import { PressableScale } from '../Pressable';

interface ItemProps {
  item: {
    id: string;
    title: string;
    range: string;
    duration: string;
  } | null;
  onPress: (eventDate: string, payload: TrainerBookTrainingPostV1Payload) => void;
  trainerId: string;
  traineeId?: string;
}

const AgendaItem = ({ item, trainerId, traineeId, onPress }: ItemProps) => {
  const deleteTrainerAvailabilityMutation = useDeleteTrainerAvailabilityMutation(trainerId);

  const alert = useAlert({
    title: 'Czy na pewno chcesz usunąć dostępność?',
    message: '',
    options: {
      userInterfaceStyle: 'dark',
    },
  });
  const { styles } = useStyles(stylesheet);
  const handlePress = useCallback(() => {
    if (!item || !traineeId) return;
    onPress(item.title, {
      availabilitySlotsIds: [item.id!],
      traineeId: traineeId || '',
    });
  }, [item, onPress, traineeId]);

  if (!item) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>Brak wydarzeń</Text>
      </View>
    );
  }

  const handleDelete = () => {
    alert(item.title, () => {
      deleteTrainerAvailabilityMutation.mutate({ availabilitySlotsIds: [item.id] });
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.item}>
      <View>
        <Text style={styles.itemHourText}>{item.range}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      {!traineeId ? (
        <View style={styles.itemButtonContainer}>
          <PressableScale onPress={handleDelete}>
            <Icon name="bin" color="error" />
          </PressableScale>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const stylesheet = createStyleSheet((_theme) => ({
  item: {
    padding: 20,
    backgroundColor: '#181A1E',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'white',
  },
  itemDurationText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'white',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
}));
