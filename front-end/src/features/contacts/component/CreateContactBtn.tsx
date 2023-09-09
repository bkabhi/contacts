import React, { useState } from 'react';
import { ContactFormModal } from '../../../components/modals/ContactFormModal';
import { Contact } from '../models/Contacts';
import { useCreateContactMutation } from '../../../redux-toolkit/apiSlice';
import { showError, showSuccess } from '../../../utils/toast';

const CreateContactBtn: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false);

    const [createNewContact, { isLoading }] = useCreateContactMutation();


    const closeModal = () => {
        setModal(false);
    }

    const showModal = () => {
        setModal(true);
    }

    const onSubmit = (val: Contact) => {
        createNewContact(val)
            .unwrap() // Unwrap the result
            .then(() => {
                showSuccess('Contact created successfully');
            })
            .catch((error: any) => {
                showError(JSON.stringify(error));
            }).finally(() => {
                closeModal();
            });
    }

    return (
        <>
            <button
                className="text-white bg-primary px-4 py-2 rounded w-45 ml-4 mb-5"
                onClick={showModal}
                disabled={isLoading}
            >
                Create Contact
            </button>
            {
                modal &&
                <ContactFormModal
                    onSubmit={onSubmit}
                    closeModal={closeModal}
                    isLoading={isLoading}
                    text={'Create Contact'}
                />
            }
        </>
    )
}

export default CreateContactBtn