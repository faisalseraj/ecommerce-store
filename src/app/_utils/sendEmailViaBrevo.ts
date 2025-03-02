"use server"; // Add this at the top

import * as brevo from "@getbrevo/brevo";

const sendEmailViaBrevo = async ({
  subject,
  content,
  to,
}: {
  subject: string;
  content: string;
  to: [{ email: string; name: string }];
}) => {
  const apiInstance = new brevo.TransactionalEmailsApi();
  const apiKey = process.env.BREVO_KEY as string;
  const senderName = process.env.SENDER_NAME as string;
  const senderEmail = process.env.SENDER_EMAIL as string;
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  const sendSmtpEmail = {
    subject,
    htmlContent: content,
    sender: { name: senderName, email: senderEmail },
    to: to,
    // params: { parameter: "My param value", subject: "common subject" },
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(response)
    );
  } catch (error: any) {
    console.dir(error);
  }
};
export default sendEmailViaBrevo;
