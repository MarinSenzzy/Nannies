import { type GroupBase, type StylesConfig } from 'react-select';
export interface FilterOption {
  value: string;
  label: string;
}
export const customStyles: StylesConfig<FilterOption, false, GroupBase<FilterOption>> = {
  control: baseStyles => ({
    ...baseStyles,
    backgroundColor: 'var(--accent)',
    borderColor: 'transparent',
    borderRadius: '14px',
    padding: '10px 14px',
    cursor: 'pointer',
    boxShadow: 'none',
    fontFamily: 'var(--font-family)',

    '&:hover': {
      borderColor: 'transparent',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08))',
    },
  }),

  singleValue: baseStyles => ({
    ...baseStyles,
    color: 'var(--white)',
    fontFamily: 'var(--font-family)',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '111%',
    padding: '0px',
  }),

  dropdownIndicator: baseStyles => ({
    ...baseStyles,
    padding: '0px',
    color: 'var(--white)',
    '&:hover': {
      color: 'var(--white)',
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  menu: baseStyles => ({
    ...baseStyles,
    backgroundColor: 'var(--white)',
    borderRadius: '14px',
    boxShadow: ' 0 20px 69px 0 rgba(0, 0, 0, 0.07)',
    padding: '8px',
    marginTop: '8px',
  }),

  option: (baseStyles, state) => ({
    ...baseStyles,
    fontFamily: 'var(--font-family)',
    backgroundColor: 'transparent',
    color: state.isSelected ? 'var(--text)' : state.isFocused ? 'var(--text)' : 'var(--text-sub)',
    fontWeight: '400',
    borderRadius: '8px',
    padding: '10px 14px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--accent-light)',
    },
    '&:active': {
      backgroundColor: 'var(--accent-light)',
    },
  }),
};
