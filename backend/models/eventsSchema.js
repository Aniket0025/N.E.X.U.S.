import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
});

const Events = mongoose.model('Events', eventsSchema);
export default Events;
