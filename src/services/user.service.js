import mongoose from 'mongoose';
import User from '../model/user.model.js';

async function createUser(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, uid } = req.body;
    const { file } = req;
    console.log(file);

    //! check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    //* create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      uid,
    });

    await newUser.save();
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getUserDetail(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { uid } = req.body;

    const user = await User.findOne({ uid });
    if (user) {
      res.status(200).json({ message: 'User found successfully', data: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function updateUserDetail(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { uid } = req.body;
    const { firstName, lastName, email, photoURL } = req.body;
    const user = await User.findOne({ uid });

    if (user) {
      const updatedUser = await User.findOneAndUpdate({ uid }, { firstName, lastName, email, photoURL }, { new: true });
      res.status(200).json({ message: 'User update successfully', data: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function deleteUser(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { uid } = req.body;
    const { firstName, lastName, email, photoURL } = req.body;
    const user = await User.findOne({ uid });

    if (user) {
      const deletedUser = await User.deleteOne({ uid });
      res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getAllUsers(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const users = await User.find();

    if (users.length > 0) {
      res.status(200).json({ message: 'Users find successfully', data: users });
    } else {
      res.status(404).json({ message: 'Users in the list are empty', data: users });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getUserById(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });

    if (user) {
      res.status(200).json({ message: 'User found successfully', data: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

export default { createUser, getUserDetail, updateUserDetail, deleteUser, getAllUsers, getUserById };
