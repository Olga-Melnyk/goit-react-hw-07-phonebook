import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/filterSlice';

import { FilterText, FilterInput } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.value;
    dispatch(addFilter(name));
  };

  return (
    <div>
      <FilterText>Find contacts by name</FilterText>
      <FilterInput
        type="text"
        autoComplete="off"
        onChange={handleChange}
        name="name"
      />
    </div>
  );
};
