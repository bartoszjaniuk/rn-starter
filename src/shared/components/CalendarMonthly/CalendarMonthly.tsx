import * as React from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useStyles } from 'react-native-unistyles';

import { CalendarSlots } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/Monthly/hooks/useCalendarSlots';
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

export const CalendarMonthly = ({
  onMonthChange,
  onDayPress,
  calendarProps,
  calendarSlots,
}: {
  calendarSlots: CalendarSlots;
  onMonthChange: (dateString: string) => void;
  onDayPress: (date: { dateString: string }) => void;
  calendarProps?: CalendarProps;
}) => {
  const { theme } = useStyles();

  return (
    <Calendar
      onMonthChange={(date: { dateString: string }) => {
        onMonthChange(date.dateString);
      }}
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
      onDayPress={onDayPress}
      minDate={today}
      markedDates={calendarSlots.markedDates}
      {...calendarProps}
    />
  );
};
