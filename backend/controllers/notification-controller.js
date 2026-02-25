const Notification =
require("../models/notificationModel");


// Create notification
exports.createNotification =
async (req, res) => {

 try {

  const notification =
  await Notification.create(req.body);

  res.status(201).json(notification);

 }
 catch (error) {

  res.status(500).json({
   message:error.message
  });

 }

};


// Get notifications by user
exports.getNotifications =
async (req, res) => {

 try {

  const notifications =
  await Notification.find({
   userId:req.params.userId
  })
  .sort({createdAt:-1});

  res.json(notifications);

 }
 catch (error){

  res.status(500).json({
   message:error.message
  });

 }

};


// ADMIN VIEW ALL
exports.getAllNotifications =
async (req, res) => {

 try {

  const notifications =
  await Notification.find()
  .sort({createdAt:-1});

  res.json(notifications);

 }
 catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};