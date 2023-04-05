import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { ContactListItem } from '../ContactListItem/ContactListItem';

import { List } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const { input } = useSelector(getFilter);

  if (!contacts) {
    return null;
  }

  const visibleContacts = contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <List>
      {visibleContacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  input: PropTypes.string,
};
