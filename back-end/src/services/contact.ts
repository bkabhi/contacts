import Contact, { IContact } from "../models/Contact";

/**
 * Create a new contact.
 * @param contactData - The contact data to create.
 * @returns The created contact.
 */
async function createContact(contactData: IContact): Promise<IContact> {
    try {
        const contact: IContact = new Contact(contactData);
        return await contact.save();
    } catch (error) {
        throw new Error("Failed to create a new contact.");
    }
}

/**
 * Get all contacts.
 * @returns An array of contacts.
 */
async function getAllContacts(): Promise<IContact[]> {
    try {
        return await Contact.find();
    } catch (error) {
        throw new Error("Failed to retrieve contacts.");
    }
}

/**
 * Delete a contact by its ID.
 * @param id - The ID of the contact to delete.
 */
async function deleteContactById(id: string): Promise<void> {
    try {
        const deletedContact: IContact | null = await Contact.findByIdAndRemove(id);

        if (!deletedContact) {
            throw new Error("Contact not found");
        }
    } catch (error) {
        throw new Error("Failed to delete the contact.");
    }
}

/**
 * Update a contact by its ID.
 * @param id - The ID of the contact to update.
 * @param contactData - The updated contact data.
 * @returns The updated contact.
 */
async function updateContactById(id: string, contactData: IContact): Promise<IContact> {
    try {
        const updatedContact: IContact | null = await Contact.findByIdAndUpdate(
            id,
            contactData,
            { new: true }
        );

        if (!updatedContact) {
            throw new Error("Contact not found");
        }

        return updatedContact;
    } catch (error) {
        throw new Error("Failed to update the contact.");
    }
}

export {
    createContact,
    getAllContacts,
    deleteContactById,
    updateContactById
}