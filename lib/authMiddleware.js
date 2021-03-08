import admin from "./firebase-admin";

export default async function authMiddleware(req, res) {
    try {
        if (!req.headers.authorization) throw new Error("No token!!");
        const token = req.headers["authorization"].split(" ")[1];
        const type = req.headers["authorization"].split(" ")[0];
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
