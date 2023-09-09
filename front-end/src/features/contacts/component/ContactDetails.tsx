import React from 'react';
import { Contact } from '../models/Contacts';
import { useDeleteContactMutation } from '../../../redux-toolkit/apiSlice';
import { showSuccess } from '../../../utils/toast';
import EditContactBtn from './EditContactBtn';
import LoadingCustomBtn from '../../../common/Loader/LoadingCustomBtn';

const getStatusClass = (status: string) => {
    return status === 'active' ? 'text-[#34D399]' : 'text-[#CD5D5D]';
}

interface Props {
    contact: Contact;
}

const ContactDetails: React.FC<Props> = ({ contact }) => {
    const [deleteContact, { isLoading }] = useDeleteContactMutation();

    const handleDelete = async (contactId: string) => {
        await deleteContact(contactId);
        showSuccess('Contact deleted successfully');
    }

    return (
        <>
            <div
                key={contact._id}
                className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300 ease-in-out"
            >
                <div className="text-center">
                    <p className="text-lg font-semibold">
                        {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-gray-600">Mob: {contact.mobileNo}</p>
                    <p className="text-gray-600">
                        Status: <span className={getStatusClass(contact.status)}>{contact.status}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 xl:gap-2 m-2 mt-8 xl:px-5 lg:px-5">
                        <EditContactBtn contactFormData={contact} />
                        <button
                            className={`inline-flex items-center justify-center rounded-md bg-meta-1 py-1 w-full text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                                }`}
                            onClick={() => handleDelete(contact._id || '')}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <LoadingCustomBtn />
                            ) : (
                                'Delete'
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactDetails