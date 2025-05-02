import { DigitalBook } from '../models/digitalBookSchema.js';

export const uploadBook = async (req, res, next) => {
  const { title, author } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;
  try {
    const book = await DigitalBook.create({ title, author, fileUrl });
    res.status(201).json({ success: true, book });
  } catch (err) {
    next(err);
  }
};

export const getAllDigitalBooks = async (req, res, next) => {
  try {
    const books = await DigitalBook.find();
    res.status(200).json({ success: true, books });
  } catch (err) {
    next(err);
  }
};
