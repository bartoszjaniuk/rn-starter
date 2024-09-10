import * as React from 'react';
import Dropdown from 'react-native-input-select';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import CheckMarkIcon from '../../../../assets/icons/chevron.svg';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  placeholder?: string;
  options: Option[];
};

export const SelectDropdown = (props: Props) => {
  const { label, options, placeholder } = props;
  const [dropdown, setDropdown] = React.useState('');
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Dropdown
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
      selectedValue={dropdown}
      onValueChange={setDropdown}
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
}));
