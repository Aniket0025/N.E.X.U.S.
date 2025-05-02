import Events from '../models/eventsSchema.js';

export const createEvents = async (req, res) => {
  try {
    const { title, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required.' });
    }

    const event = await Events.create({ title, date });
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().sort({ date: 1 });
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};
