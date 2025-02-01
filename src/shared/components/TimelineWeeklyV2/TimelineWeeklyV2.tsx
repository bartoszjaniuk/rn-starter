/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  AgendaList,
  CalendarProvider,
  TimelineListProps,
  WeekCalendar,
  WeekCalendarProps,
} from 'react-native-calendars';

import { TrainerBookTrainingPostV1Payload, useTrainerBookTrainingMutation } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { useAuth } from 'src/providers/AuthContext';

import AgendaItem from './AgendaItem';

import * as route from '../../../activatedUser/navigation/routes';

const today = new Date().toISOString().slice(0, 10);

type Props = {
  onDateChanged: (date: string) => void;
  date: string;
  trainerId: string;
  weeklyPlanner: TimelineListProps['events'];
  markedDates: WeekCalendarProps['markedDates'];
  isLoading?: boolean;
};

export const TimelineWeeklyV2 = ({ onDateChanged, date, weeklyPlanner, trainerId, isLoading, markedDates }: Props) => {
  const trainerBookTrainingMutation = useTrainerBookTrainingMutation(trainerId);
  const auth = useAuth();

  const handleReservation = React.useCallback(
    (eventDate: string, payload: TrainerBookTrainingPostV1Payload) => {
      if (!payload.traineeId) return;
      goTo(route.toSearchTrainersAvailabilityReservation, {
        traineeId: payload.traineeId,
        trainerId: trainerId,
        dateTime: eventDate,
      });
    },
    [trainerId],
  );

  const renderItem = React.useCallback(
    ({ item }: any) => {
      return (
        <AgendaItem traineeId={auth.user?.traineeId} trainerId={trainerId} onPress={handleReservation} item={item} />
      );
    },
    [handleReservation, trainerId, auth.user?.traineeId],
  );

  const sections = React.useMemo(
    () =>
      Object.entries(weeklyPlanner).map(([date, events]) => ({
        title: date,
        data: events,
      })),
    [weeklyPlanner],
  );

  return (
    <CalendarProvider
      date={date}
      onDateChanged={(_date) => {
        // onDateChanged(date);
      }}
      onMonthChange={(date) => {
        onDateChanged(date.dateString);
      }}
      showTodayButton={true}
    >
      <WeekCalendar
        displayLoadingIndicator={trainerBookTrainingMutation.isPending || isLoading}
        firstDay={1}
        markedDates={markedDates}
        minDate={today}
      />
      {trainerBookTrainingMutation.isPending || isLoading ? (
        <LoadingScreen />
      ) : (
        <AgendaList
          stickySectionHeadersEnabled={true}
          sections={sections}
          infiniteListProps={{
            itemHeight: 80, // The height of the agendaItem without padding. Defaults to 80 I believe
            visibleIndicesChangedDebounce: 250,
          }}
          scrollToNextEvent={true}
          scrollToFirst={true}
          markToday={true}
          renderItem={renderItem}
          sectionStyle={{
            backgroundColor: '#303033',
            color: 'white',
            textTransform: 'capitalize',
          }}
        />
      )}
    </CalendarProvider>
  );
};
