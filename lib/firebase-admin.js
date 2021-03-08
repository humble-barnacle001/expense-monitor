import admin from "firebase-admin";

if (!admin.apps.length)
    admin.initializeApp({
        credential: admin.credential.cert(
            JSON.parse(new Buffer.from(process.env.FRB_CONFIG_BASE64, "base64"))
        )
    });

export default admin;
