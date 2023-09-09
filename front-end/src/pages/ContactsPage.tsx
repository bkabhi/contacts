import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { rootService } from '../routes/RootService'
import Contacts from '../features/contacts/component/Contacts'

const ContactsPage = () => {
    return (
        <>
            <Breadcrumb pageName={rootService.Contacts} />
            <Contacts />
        </>
    )
}

export default ContactsPage