import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

import { Item, Span, Button } from './ContactListItem.styled';

export const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(contact.id));

  return (
    <Item>
      <Span>
        {contact.name}: <Span>{contact.number}</Span>
      </Span>
      <Button onClick={handleDelete}>Delete</Button>
    </Item>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
