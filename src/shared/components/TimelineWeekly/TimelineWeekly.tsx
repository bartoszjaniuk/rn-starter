import * as React from 'react';
import {
  CalendarProvider,
  CalendarUtils,
  TimelineList,
  TimelineListProps,
  WeekCalendar,
  WeekCalendarProps,
} from 'react-native-calendars';

import { useAlert } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useAlert';
import { TrainerBookTrainingPostV1Payload, useTrainerBookTrainingMutation } from 'src/api/trainer';
import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';

import * as route from '../../../activatedUser/navigation/routes';

const today = new Date();
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

type Props = {
  onDateChanged: (date: string) => void;
  date: string;
  trainerId: string;
  weeklyPlanner: TimelineListProps['events'];
  markedDates: WeekCalendarProps['markedDates'];
  isLoading?: boolean;
};

export const TimelineWeekly = ({ onDateChanged, date, weeklyPlanner, trainerId, isLoading, markedDates }: Props) => {
  const trainerBookTrainingMutation = useTrainerBookTrainingMutation(trainerId);

  const userInfoQuery = useGetUserInfoQuery();

  const alert = useAlert({
    title: 'Zarezerwować termin?',
    message: 'Trening będzie widoczny na ekranie głównym lub w kalendarzu',
    options: {
      userInterfaceStyle: 'dark',
    },
  });

  const handleReservation = (eventDate: string, payload: TrainerBookTrainingPostV1Payload) => {
    // alert(eventDate, () => trainerBookTrainingMutation.mutate(payload));
    if (!payload.traineeId) return;
    goTo(route.toSearchTrainersAvailabilityReservation, {
      traineeId: payload.traineeId,
      trainerId: trainerId,
      dateTime: eventDate,
    });
  };

  return (
    <CalendarProvider
      date={date}
      onDateChanged={onDateChanged}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton={true}
      // disabledOpacity={0.6}
      //   theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      //   style={{ backgroundColor: 'transparent' }}
      //   theme={{
      //     agendaKnobColor: 'green',
      //     agendaDayNumColor: 'green',
      //     backgroundColor: 'transparent',
      //     calendarBackground: 'transparent',
      //     todayBackgroundColor: 'green',
      //     reservationsBackgroundColor: 'green',
      //     selectedDayBackgroundColor: 'green',
      //     contentStyle: {
      //       backgroundColor: 'transparent',
      //     },
      //   }}
    >
      <WeekCalendar
        displayLoadingIndicator={trainerBookTrainingMutation.isPending || isLoading}
        firstDay={1}
        markedDates={markedDates}
        minDate={today}

        // theme={{ backgroundColor: 'transparent' }}
        // columnWrapperStyle={{ backgroundColor: 'transparent' }}
        // ListHeaderComponentStyle={{ backgroundColor: 'transparent' }}
        // contentContainerStyle={{ backgroundColor: 'transparent' }}
        // calendarStyle={{ backgroundColor: 'transparent' }}
        // headerStyle={{ backgroundColor: 'transparent' }}
        // style={{
        //   backgroundColor: 'transparent',
        // }}
        //   markedDates={marked.current}
      />
      {trainerBookTrainingMutation.isPending || isLoading ? (
        <LoadingScreen />
      ) : (
        <TimelineList
          events={weeklyPlanner}
          timelineProps={{
            format24h: true,
            start: 6,
            end: 24,
            overlapEventsSpacing: 8,
            rightEdgeSpacing: 24,
            onEventPress: (event) => {
              handleReservation(event.start, {
                availabilitySlotsIds: [event.id!],
                traineeId: userInfoQuery.data?.traineeId || '',
              });
            },
            //   onBackgroundLongPress: this.createNewEvent,
            //   onBackgroundLongPressOut: this.approveNewEvent,
            //   unavailableHours: [
            //     { start: 0, end: 6 },
            //     { start: 22, end: 24 },
            //   ],
          }}
          showNowIndicator={true}
          // initialTime={INITIAL_TIME}
        />
      )}
    </CalendarProvider>
  );
};
