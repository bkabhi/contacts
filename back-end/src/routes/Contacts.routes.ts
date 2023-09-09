import express, { Router, Request, Response } from "express";
import Contact, { IContact } from "../models/Contact";

const router: Router = express.Router();

// Create a new contact
router.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, mobileNo, status } = req.body;
    const contact: IContact = new Contact({ firstName, lastName, mobileNo, status });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error. Failed to create a new contact." });
  }
});

// Get all contacts
router.get("/", async (req: Request, res: Response) => {
  try {
    const contacts: IContact[] = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error. Failed to retrieve contacts." });
  }
});

// Delete a contact by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletedContact: IContact | null = await Contact.findByIdAndRemove(id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.sendStatus(204); // No content
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error. Failed to delete the contact." });
  }
});

// Update a contact by id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const { firstName, lastName, mobileNo, status } = req.body;

    const updatedContact: IContact | null = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, mobileNo, status },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error. Failed to update the contact." });
  }
});

export default router;
