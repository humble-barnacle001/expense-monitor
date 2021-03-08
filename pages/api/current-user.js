import authMiddleware from "../../lib/authMiddleware";

export default async function handler(req, res) {
    try {
        const {
            status,
            body: { user, errors }
        } = await authMiddleware(req, res);
        const uid = user ? user.uid : "";
        if (status === 200) res.json({ status, body: { user: { uid } } });
        else res.json({ status, body: { errors } });
    } catch (err) {
        console.log(
            "Error in fetching data from firebase (Internal error): ",
            err.message
        );
        // console.log(err);
        res.json({
            status: 500,
            body: {
                errors: [{ msg: "Temporary problems in server" }]
            }
        });
    }
}
