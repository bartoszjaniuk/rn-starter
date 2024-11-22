import * as React from 'react';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useStyles } from 'react-native-unistyles';

import { CalendarSlots } from 'src/activatedUser/screens/SearchTrainers/AvailabilitySlots/hooks/useCalendarSlots';
import { today } from 'src/shared/utils';

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
  monthNamesShort: ['Sty.', 'Lut.', 'Mar.', 'Kwi.', 'Maj', 'Cze.', 'Lip.', 'Sie.', 'Wrz.', 'Paź.', 'Lis.', 'Gru.'],
  dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  dayNamesShort: ['Ndz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
  today: 'Dziś',
};

LocaleConfig.defaultLocale = 'pl';

export const CalendarMonthly = ({ calendarSlots }: { calendarSlots: CalendarSlots }) => {
  const { theme } = useStyles();

  return (
    <Calendar
      // hideDayNames={true}
      hideArrows={true}
      disableAllTouchEventsForDisabledDays={true}
      disableArrowLeft={new Date().getMonth() === 0}
      disableArrowRight={new Date().getMonth() === 11}
      disableMonthChange={true}
      enableSwipeMonths={true}
      theme={{
        arrowColor: theme.colors.white,
        disabledArrowColor: theme.colors.disabled,
        calendarBackground: 'transparent',
        textSectionTitleColor: theme.colors.primary,
        monthTextColor: theme.colors.white,

        selectedDayBackgroundColor: theme.colors.transparent,
        selectedDayTextColor: theme.colors.white,
        dotColor: theme.colors.primary,
        markedDayTextColor: theme.colors.error,
        todayTextColor: theme.colors.typography,
        todayBackgroundColor: theme.colors.white,
        dayTextColor: theme.colors.white,
        textDisabledColor: theme.colors.disabled,
        selectedDotColor: theme.colors.primary,
        weekVerticalMargin: 5,
        textDayHeaderFontWeight: '700',
        textDayFontSize: 18,
        textMonthFontSize: 26,
        // textDayHeaderFontSize: 16
      }}
      onDayPress={(day) => {
        console.log({ day });
        // LOG  {"day": {"dateString": "2024-11-28", "day": 28, "month": 11, "timestamp": 1732752000000, "year": 2024}}
        if (calendarSlots.availableSlots.includes(day.dateString)) {
          console.log('true');
        }
      }}
      minDate={today}
      markedDates={calendarSlots.markedDates}
    />
  );
};
