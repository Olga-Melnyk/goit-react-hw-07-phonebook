import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectFiltredContacts } from 'redux/selectors';
import { ContactListItem } from '../ContactListItem/ContactListItem';

import { List } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(selectFiltredContacts);

  if (!contacts) {
    return null;
  }

  return (
    <List>
      {contacts.map(contact => (
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
