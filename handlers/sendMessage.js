import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendMessage = async (event) => {
    const { phoneNumber, message } = JSON.parse(event.body);

    try {
        const messageInstance = await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `whatsapp:${phoneNumber}`,
            body: message
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                messageSid: messageInstance.sid
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: error.message,
            }),
        };
    }
};
