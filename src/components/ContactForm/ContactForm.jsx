import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

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
  phone: Yup.string()
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
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: '',
    phone: '',
  };

  const handleSubmit = (values, actions) => {
    const addedContacts = contacts.filter(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (addedContacts.length) {
      alert(`${values.name} is already in contacts`);
    } else {
      dispatch(addContact(values));
      console.log(values);
      actions.resetForm({
        name: '',
        phone: '',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
          <Input type="tel" name="phone" />
          <ErrorForm name="phone" component="span" />
        </Label>

        <FormBtn type="submit">Add contact</FormBtn>
      </ContainerForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.object,
};
