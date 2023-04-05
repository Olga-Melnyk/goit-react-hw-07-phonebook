import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

import {
  ContainerForm,
  Label,
  Input,
  ErrorForm,
  FormBtn,
} from './ContactForm.styled';

const RecipeSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      excludeEmptyString: true,
    })
    .required('Required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        excludeEmptyString: true,
      }
    )
    .required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, actions) => {
    let newContact = values;
    const { name, number } = newContact;
    actions.resetForm({
      name: '',
      number: '',
    });
    if (contacts.value.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    dispatch(addContact(name, number));
    return true;
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={RecipeSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values, actions);
      }}
    >
      <ContainerForm>
        <Label>
          Name
          <Input type="text" name="name" />
          <ErrorForm name="name" component="span" />
        </Label>
        <Label>
          Number
          <Input type="tel" name="number" />
          <ErrorForm name="number" component="span" />
        </Label>

        <FormBtn type="submit">Add contact</FormBtn>
      </ContainerForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.object,
};
