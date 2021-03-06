import { useContext, useEffect } from "react";
import { delTransaction } from "../actions/transaction";
import Loader from "../components/Loader";
import withAuth from "../components/PrivateRoute";
import { Context } from "../context";
import firebase from "../firebase";

const Home = () => {
    const {
        state: { transaction, tload },
        dispatch
    } = useContext(Context);
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const ref = db.collection("data").doc(user.uid).collection("transactions");

    useEffect(() => {
        dispatch({ type: "LOAD_TRANSACTION" });
        db.waitForPendingWrites()
            .then(() =>
                ref.orderBy("timestamp").onSnapshot(
                    (doc) => {
                        const transaction = [];
                        let bal = 0,
                            cr = 0;
                        if (!doc.empty)
                            doc.docs.forEach((d) => {
                                const data = d.data();
                                if (data.credit) {
                                    bal += data.amount;
                                    cr += data.amount;
                                } else bal -= data.amount;
                                transaction.push({
                                    ...data,
                                    bal,
                                    id: d.id,
                                    cr
                                });
                            });
                        dispatch({
                            type: "TRANSACTION_FETCHED",
                            payload: transaction
                        });
                    },
                    (err) => {
                        if (user) {
                            console.log(err);
                            window.halfmoon.initStickyAlert({
                                content: "Error while fetching from database",
                                title: "Error!!",
                                alertType: "alert-danger",
                                fillType: "filled"
                            });
                        }
                    }
                )
            )
            .catch((e) =>
                console.log("Error while waiting for backend update", e)
            );
    }, [user]);

    return (
        <div className='container'>
            <h1 className='text-center p-10'>Balance Sheet</h1>
            <div className='row'>
                <div className='col-11 col-lg-8 m-auto'>
                    {!tload ? (
                        transaction.length > 0 ? (
                            <table className='table table-bordered'>
                                <thead>
                                    <tr className='text-primary'>
                                        <th>Date</th>
                                        <th className='text-center'>Credit</th>
                                        <th className='text-center'>Debit</th>
                                        <th className='text-center d-none d-sm-flex'>
                                            Purpose
                                        </th>
                                        <th className='text-right'>Balance</th>
                                        <th className='text-center d-none d-sm-flex'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <style jsx>
                                        {`
                                            .hover:hover {
                                                cursor: pointer;
                                            }
                                        `}
                                    </style>
                                    {transaction.map((t, i) => (
                                        <tr key={t.id}>
                                            <th className='text-primary'>
                                                {new Date(
                                                    t.timestamp
                                                ).toLocaleString("en-IN", {
                                                    dateStyle: "short"
                                                })}
                                            </th>
                                            <td className='text-center'>
                                                {t.credit ? t.amount : ""}
                                            </td>
                                            <td className='text-center'>
                                                {t.credit ? "" : t.amount}
                                            </td>
                                            <td className='text-center text-secondary-dm d-none d-sm-flex'>
                                                {t.description}
                                            </td>
                                            <td
                                                className={`text-right text-${
                                                    t.bal < 0
                                                        ? "danger"
                                                        : "success"
                                                }-dm bg-${
                                                    t.bal < 0
                                                        ? "danger"
                                                        : "success"
                                                }-lm`}
                                            >
                                                {t.bal}
                                            </td>
                                            <td className='text-center d-none d-sm-flex'>
                                                <span
                                                    className='text-danger m-auto hover'
                                                    onClick={(e) =>
                                                        delTransaction(
                                                            e.target.id
                                                        )
                                                    }
                                                >
                                                    <i
                                                        className='bi bi-x-circle'
                                                        id={t.id}
                                                    ></i>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {
                                        <tr
                                            key={new Date().getTime()}
                                            className='bg-very-dark-dm bg-light-lm'
                                        >
                                            <th></th>
                                            <td className='text-center text-success'>
                                                {
                                                    transaction[
                                                        transaction.length - 1
                                                    ].cr
                                                }
                                            </td>
                                            <td className='text-center text-danger'>
                                                {transaction[
                                                    transaction.length - 1
                                                ].cr -
                                                    transaction[
                                                        transaction.length - 1
                                                    ].bal}
                                            </td>
                                            <td className='d-none d-sm-flex'></td>
                                            <td></td>
                                            <td className='d-none d-sm-flex'></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <p>
                                <b>Nothing added!! Add some data to start.</b>
                            </p>
                        )
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
            <div className='row my-20'>
                <div className='m-auto'>
                    <button
                        className='btn btn-primary btn-rounded btn-block'
                        onClick={() =>
                            window.halfmoon.toggleModal("addTransaction")
                        }
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home);
