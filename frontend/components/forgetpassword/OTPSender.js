//"use client";
//
//import twilio from 'twilio';
//
//const accountSid = "AC7ddb2e2a3f99a55994554a97ea4e7555";
//const authToken = "366840a2ff73fd023ecf80fc545ce815";
//const twilioPhone = "+16088798709";
//
//const client = twilio(accountSid, authToken);
//
//
//export const sendOTP = async (phone, authToken) => {
//  try {
//    await client.messages.create({
//      body: `Your password reset code is: ${otp}`,
//      from: twilioPhone,
//      to: phone
//    });
//    return { success: true, message: "OTP sent successfully"};
//  } catch (error) {
//    console.error("Twilio Error: ", error);
//    return { success: false, message: "Failed to send OTP"};
//  }
//}
