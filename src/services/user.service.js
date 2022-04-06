import mongoose from 'mongoose';
import User from '../model/user.model.js';
import s3Service from '../services/s3.service.js';

async function createUser(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, username } = req.body;
    const { uid, file, email } = req;

    //! check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    // //* create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      uid,
      username,
    });

    await newUser.save();
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    console.log('error', error);
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getUserDetail(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { uid } = req;

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
    const { uid, file } = req;
    const { firstName, lastName } = req.body;
    console.log('files', file);
    const user = await User.findOne({ uid });

    if (user) {
      const { _id } = user;
      const imagePath = await s3Service.uploadFiles([file], _id, 'user');
      console.log(file);
      const updatedUser = await User.findOneAndUpdate(
        { uid },
        { firstName, lastName, photoURL: imagePath[0] },
        { new: true },
      );
      res.status(200).json({ message: 'User update successfully', data: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function deleteUser(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { uid } = req;
    console.log(uid);

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

async function updateUserProfileImage(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { uid } = req.body;
    const { file } = req;

    const user = await User.findOne({ uid });

    if (user) {
      const { _id } = user;
      const imagePath = await s3.uploadFiles([file], _id, 'user');
      const updatedUser = await User.findOneAndUpdate({ _id }, { photoURL: imagePath[0] }, { new: true });
      res.status(200).json({ message: 'User update image profile successfully', data: updatedUser });
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

export default {
  createUser,
  getUserDetail,
  updateUserDetail,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUserProfileImage,
};
