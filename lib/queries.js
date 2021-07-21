'use strict';

const connectDb = require('./db');
const { ObjectId } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  getCourses: async () => {
    let db;
    let courses = [];
    try {
      db = await connectDb();
      courses = await db.collection('courses').find().toArray();
      return courses;
    } catch (error) {
      errorHandler(error);
    }
  },
  getCourse: async (root, { id }) => {
    let db;
    let course;
    try {
      db = await connectDb();
      course = await db.collection('courses').findOne({ _id: ObjectId(id) });
      return course;
    } catch (error) {
      errorHandler(error);
    }
  },
  getPeople: async () => {
    let db;
    let students = [];
    try {
      db = await connectDb();
      students = await db.collection('students').find().toArray();
      return students;
    } catch (error) {
      errorHandler(error);
    }
  },
  getPerson: async (root, { id }) => {
    let db;
    let student;
    try {
      db = await connectDb();
      student = await db.collection('students').findOne({ _id: ObjectId(id) });
      return student;
    } catch (error) {
      errorHandler(error);
    }
  },
  searchItems: async (root, { keyword }) => {
    let db;
    let items;
    let courses;
    let people;

    try {
      db = await connectDb();
      courses = await db
        .collection('courses')
        .find({ $text: { $search: keyword } })
        .toArray();
      people = await db
        .collection('students')
        .find({ $text: { $search: keyword } })
        .toArray();

      items = [...courses, ...people];
    } catch (error) {
      errorHandler(error);
    }
    return items;
  }
};
