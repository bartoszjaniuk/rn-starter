import * as React from 'react';
import { CalendarProvider, CalendarUtils, TimelineList, TimelineListProps, WeekCalendar } from 'react-native-calendars';

const today = new Date();
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

type Props = {
  onDateChanged: (date: string) => void;
  date: string;
  weeklyPlanner: TimelineListProps['events'];
};

export const TimelineWeekly = ({ onDateChanged, date, weeklyPlanner }: Props) => {
  const INITIAL_TIME = { hour: 12, minutes: 0 };

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
