import admin from "./firebase-admin";

export default async function authMiddleware(authHeader) {
    try {
        if (!authHeader) throw new Error("No token!!");
        const token = authHeader.split(" ")[1];
        const type = authHeader.split(" ")[0];
        if (!token || type !== "Bearer")
            throw new Error("Improper authorization header configuration!!");
        const user = await admin.auth().verifyIdToken(token);
        return {
            status: 200,
            body: { user }
        };
    } catch (err) {
        console.log("Error in auth middleware: ", err.message);
        // console.log(err);
        return {
            status: 401,
            body: { errors: [{ msg: "Invalid token, authorisation denied" }] }
        };
    }
}
