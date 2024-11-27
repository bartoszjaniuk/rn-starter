import * as React from 'react';
import { CalendarProvider, CalendarUtils, TimelineList, TimelineListProps, WeekCalendar } from 'react-native-calendars';

import { useAlert } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Weekly/hooks/useAlert';
import { TrainerBookTrainingPostV1Payload, useTrainerBookTrainingMutation } from 'src/api/trainer';
import { useGetUserInfoQuery } from 'src/api/user/hooks';

const today = new Date();
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

type Props = {
  onDateChanged: (date: string) => void;
  date: string;
  trainerId: string;
  weeklyPlanner: TimelineListProps['events'];
};

export const TimelineWeekly = ({ onDateChanged, date, weeklyPlanner, trainerId }: Props) => {
  const INITIAL_TIME = { hour: 12, minutes: 0 };
  const trainerBookTrainingMutation = useTrainerBookTrainingMutation(trainerId);

  const userInfoQuery = useGetUserInfoQuery();

  const alert = useAlert({
    title: 'Zarezerwować termin?',
    message: 'Trening będzie widoczny na ekranie głównym lub w kalendarzu',
    options: {
      userInterfaceStyle: 'dark',
    },
  });

  const handleReservation = (payload: TrainerBookTrainingPostV1Payload) => {
    alert(() => trainerBookTrainingMutation.mutate(payload));
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
        firstDay={1}
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

      <TimelineList
        events={weeklyPlanner}
        timelineProps={{
          format24h: true,
          start: 6,
          end: 24,
          overlapEventsSpacing: 8,
          rightEdgeSpacing: 24,
          onEventPress: (event) => {
            console.log('event.id', event.id);
            console.log('userInfoQuery.data?.id || ', userInfoQuery.data?.id || '');
            handleReservation({
              availabilitySlotsIds: [event.id!],
              // traineeId: userInfoQuery.data?.id || '',
              traineeId: '5417f115-20ed-4c7a-8554-9bca272420d7',
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
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
};
