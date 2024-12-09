import * as React from 'react';
import { View } from 'react-native';
import { CommonDropdownProps } from 'react-native-input-select/lib/typescript/src/types/index.types';
import SelectDropdown from 'react-native-select-dropdown';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Inline, Stack } from '@grapp/stacks';

import { FieldError } from 'react-hook-form';

import { Icon } from '../Icon';
import { Text } from '../Text';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  onValueChange: CommonDropdownProps['onValueChange'];
  error?: FieldError;
  selectedValue?: string;
  placeholder?: string;
  isRequired?: boolean;
};

export const SelectDropdownRN = (props: Props) => {
  const { label, options, selectedValue, onValueChange, isRequired, error, placeholder = 'Wybierz' } = props;
  const { styles, theme } = useStyles(styleSheet, { error: !!error });
  return (
    <Stack space={2} style={{ flexGrow: 1 }}>
      <Inline>
        <Text fontWeight="500" size="xs">
          {label}
        </Text>
        {isRequired ? (
          <Text fontWeight="500" size="xs" color="asteriskError">
            *
          </Text>
        ) : null}
      </Inline>
      <SelectDropdown
        defaultValue={selectedValue}
        data={options}
        onSelect={(selectedItem, _index) => {
          onValueChange(selectedItem.value);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={{ ...styles.dropdownButtonTxtStyle, ...(selectedItem && { color: theme.colors.white }) }}>
                {(selectedItem && selectedItem.label) || placeholder}
              </Text>
              <Icon
                name="chevron"
                style={isOpened ? { transform: [{ rotate: '180deg' }] } : undefined}
                svgProps={{ width: 28 }}
              />
            </View>
          );
        }}
        renderItem={(item, _index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: theme.colors.primary }) }}>
              <Text style={{ ...styles.dropdownItemTxtStyle, ...(isSelected && { color: theme.colors.typography }) }}>
                {item.label}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
        statusBarTranslucent={true}
      />
      {!!error ? (
        <Text fontWeight="400" size="xs" color="error">
          {error.message}
        </Text>
      ) : null}
    </Stack>
  );
};

const styleSheet = createStyleSheet((theme) => ({
  dropdownButtonStyle: {
    paddingLeft: 14,
    paddingRight: 7,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    variants: {
      error: {
        true: {
          borderColor: theme.colors.error,
          borderWidth: 1,
        },
      },
    },
  },
  dropdownButtonTxtStyle: {
    fontFamily: theme.fontFamily.satoshiRegular,
    color: theme.colors.gray,
  },

  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#181A1E',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: theme.fontFamily.satoshiRegular,
    color: theme.colors.white,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
}));
