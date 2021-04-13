"use strict";

/* eslint-disable */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

var serviceAccount = require("./lpbd-team-3-firebase-adminsdk-x564k-4f2d230abe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = "Accessor";

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName);
});
// [END sendByeEmail]

exports.sendPostingAlert = functions.firestore
  .document("postings/{id}")
  .onCreate((snapshot, context) => {
    functions.logger.log(
      "sendPostingAlert: ",
      snapshot._fieldsProto.auditorId.stringValue
    );
    var db = admin.firestore();
    let query = db
      .collection("users")
      .doc(snapshot._fieldsProto.auditorId.stringValue);
    query.get().then((qsnapshot) => {
      functions.logger.log("sendPostingAlert: ", qsnapshot);
      const email = qsnapshot._fieldsProto.email.stringValue;
      const displayName = qsnapshot._fieldsProto.displayName.stringValue;
      return sendNewPostingAlert(email, displayName);
    });
  });

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${
    displayName || ""
  }! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.log("New welcome email sent to:", email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${
    displayName || ""
  }!, We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.log("Account deletion confirmation email sent to:", email);
  return null;
}

async function sendNewPostingAlert(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `You have received new evaluation offer!`;
  mailOptions.text = `Hey ${
    displayName || ""
  }! You have received new evaluation offer. See it from https://lpbd-team-3.web.app/`;
  await mailTransport.sendMail(mailOptions);
  functions.logger.log("New posting alert email sent to:", email);
  return null;
}
