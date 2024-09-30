import * as React from 'react';
import Dropdown from 'react-native-input-select';
import { CommonDropdownProps } from 'react-native-input-select/lib/typescript/src/types/index.types';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FieldError } from 'react-hook-form';

import CheckMarkIcon from '../../../../assets/icons/chevron.svg';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  placeholder?: string;
  options: Option[];
  selectedValue?: string;
  onValueChange: CommonDropdownProps['onValueChange'];
  error?: FieldError;
};

export const SelectDropdown = (props: Props) => {
  const { label, options, placeholder, selectedValue, onValueChange, error } = props;
  const { styles, theme } = useStyles(stylesheet);
  console.log({ error, selectedValue });

  return (
    <Dropdown
      error={error?.message}
      dropdownErrorTextStyle={styles.dropdownErrorText}
      dropdownErrorStyle={styles.dropdownError}
      label={label}
      labelStyle={styles.label}
      primaryColor={theme.colors.primary}
      placeholder={placeholder}
      placeholderStyle={styles.placeholder}
      selectedItemStyle={{ color: theme.colors.primary, borderColor: theme.colors.primary }}
      options={options}
      dropdownIcon={<CheckMarkIcon width={12} height={12} />}
      dropdownIconStyle={styles.dropdownIcon}
      dropdownStyle={styles.dropdown}
      selectedValue={selectedValue || ''}
      onValueChange={onValueChange}
      modalControls={{
        modalOptionsContainerStyle: styles.modalOptionsContainer,
      }}
      checkboxControls={{
        checkboxLabelStyle: styles.checkboxLabel,
        checkboxDisabledStyle: {
          shadowOpacity: 0.8,
        },
      }}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  dropdownIcon: {
    top: 18,
    right: 20,
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.gray,
  },
  modalOptionsContainer: {
    backgroundColor: '#181A1E',
  },
  placeholder: {
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.satoshiRegular,
  },
  checkboxLabel: {
    color: theme.colors.gray,
    fontFamily: theme.fontFamily.satoshiRegular,
  },
  label: {
    fontFamily: theme.fontFamily.satoshiMedium,
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 21,
  },

  dropdownErrorText: {
    color: theme.colors.error,
    fontFamily: theme.fontFamily.satoshiRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  dropdownError: { borderColor: theme.colors.error, borderWidth: 1 },
}));
