import { createStyles } from '@mantine/core';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem'
  },

  selectTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },

  selectOptions: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '300px',
    maxHeight: '200px',
    overflow: 'auto'
  },
  selectOption: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#eee'
    }
  },
  optionIndicator: {
    marginLeft: '0.5rem'
  },
  selectedContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1rem'
  },
  selectedOption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: '4px',
    padding: '0.5rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    cursor: 'pointer'
  },
  removeButton: {
    marginLeft: '0.5rem'
  }
}));

interface Option {
  label: string;
  value: string;
  children?: Option[];
  parent?: Option;
}

interface Props {
  options: Option[];
}

export const MultiSelect = ({ options }: Props) => {
  const { classes } = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);

  const handleOptionSelect = (option: Option) => {
    if (option.children) {
      setCurrentOptions(option.children);
    } else {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    }
  };

  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
    setSelectedOptions(updatedOptions);

    if (option.parent) {
      setCurrentOptions(option.parent.children!);
    } else {
      setCurrentOptions(options);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.selectContainer}>
        <div className={classes.selectTitle}>Select Options</div>
        <div className={classes.selectOptions}>
          {currentOptions.map((option) => (
            <div
              className={classes.selectOption}
              key={option.value}
              onClick={() => handleOptionSelect(option)}>
              <div>{option.label}</div>
            </div>
          ))}
        </div>
      </div>
      {selectedOptions.length > 0 && (
        <div className={classes.selectedContainer}>
          {selectedOptions.map((option) => (
            <div
              className={classes.selectedOption}
              key={option.value}
              onClick={() => handleRemoveOption(option)}>
              <div>{`${option.parent?.label}:${option.label}`}</div>
              <div className={classes.removeButton}>×</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
