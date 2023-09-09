import React from "react";
import { Contact } from "../models/Contacts";
import Error from "../../../components/Error";
import CreateContactBtn from "./CreateContactBtn";
import { alertMessages } from "../../../utils/constants";
import { useGetAllContactsQuery } from "../../../redux-toolkit/apiSlice";
import Loader from "../../../common/Loader";
import ContactDetails from "./ContactDetails";

const Contacts: React.FC = () => {
    const { data: contacts, isLoading, isError, isSuccess } = useGetAllContactsQuery();

    return (
        <div className="p-4">
            <CreateContactBtn />
            {
                isLoading ? <>
                    <Loader />
                </>
                    : isError ? <>
                        <Error text={alertMessages.apiError} />
                    </> : isSuccess &&
                    <>
                        {contacts.length === 0 ? (
                            <Error text={alertMessages.contactsNotFound} />
                        ) :
                            (
                                <div className="flex justify-center items-center">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                                        {contacts.map((contact: Contact) => (
                                            <ContactDetails key={contact._id} contact={contact} />
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </>
            }
        </div>
    );
};

export default Contacts;
