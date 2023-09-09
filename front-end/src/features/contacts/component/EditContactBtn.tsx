import React, { useState } from 'react'
import { Contact } from '../models/Contacts'
import { useEditContactsMutation } from '../../../redux-toolkit/apiSlice';
import { showError, showSuccess } from '../../../utils/toast';
import { ContactFormModal } from '../../../components/modals/ContactFormModal';


interface Props {
    contactFormData: Contact
}

const EditContactBtn: React.FC<Props> = ({ contactFormData }) => {
    const [modal, setModal] = useState<boolean>(false);

    const [editContact, { isLoading }] = useEditContactsMutation();

    const closeModal = () => {
        setModal(false);
    }

    const showModal = () => {
        setModal(true);
    }

    const onSubmit = (val: Contact) => {
        editContact({ id: contactFormData._id, ...val })
            .unwrap()
            .then(() => {
                showSuccess('Contact Edit Successfully');
            })
            .catch((error: any) => {
                showError(JSON.stringify(error));
            });
    }

    return (
        <>
            <button
                className="inline-flex items-center justify-center rounded-md bg-meta-3 py-1 w-full text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                onClick={showModal}
                disabled={isLoading}
            >
                Edit
            </button>
            <div className='text-left'>
                {
                    modal && <ContactFormModal closeModal={closeModal} onSubmit={onSubmit} defaultValue={contactFormData} />
                }
            </div>
        </>
    )
}

export default EditContactBtn