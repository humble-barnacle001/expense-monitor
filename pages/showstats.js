import admin from "../lib/firebase-admin";
import cookies from "next-cookies";
import authMiddleware from "../lib/authMiddleware";

const Page = ({ data }) => {
    return (
        <div className='m-auto'>
            <h1 className='text-center p-10'>
                {data.map((el) => JSON.stringify(el)).toString()}
            </h1>
        </div>
    );
};

// This gets called on every request
export const getServerSideProps = async (Context) => {
    const token = cookies(Context).token;
    // Fetch data
    const db = admin.firestore();
    let res = [];
    try {
        const { status, body } = await authMiddleware(`Bearer ${token}`);
        if (status === 200) {
            const doc = await db.collection("data").doc(body.user.uid).get();
            if (doc.exists) {
                res = doc.data().transaction;
            }
        } else throw new Error("Error!!");
    } catch (e) {
        console.log(e);
    }
    console.log(res);
    return {
        props: { data: res }
    };
};

export default Page;
