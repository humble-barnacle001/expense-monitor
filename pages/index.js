import { useContext, useEffect, useRef } from "react";
import { delTransaction, addTransaction } from "../actions/transaction";
import Loader from "../components/Loader";
import withAuth from "../components/PrivateRoute";
import { Context } from "../context";
import firebase from "../firebase";

const Home = () => {
    const {
        state: { transaction, tload },
        dispatch,
    } = useContext(Context);
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const ref = db.collection("data").doc(user.uid).collection("transactions");

    const importRef = useRef(null);

    const exportCSV = () => {
        const header = "timestamp,description,credit,amount";
        const rows = transaction.map(
            (t) =>
                `${new Date(t.timestamp).toISOString()},"${t.description.replace(/"/g, '""')}",${t.credit},${t.amount}`,
        );
        const blob = new Blob([[header, ...rows].join("\n")], {
            type: "text/csv",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const importCSV = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ({ target: { result } }) => {
            const [headerLine, ...lines] = result.trim().split("\n");
            lines.forEach((line) => {
                // parse quoted description field
                const match = line.match(
                    /^([^,]+),"?((?:[^"]|"")*?)"?,([^,]+),([^,]+)$/,
                );
                if (!match) return;
                const [, ts, description, credit, amount] = match;
                addTransaction({
                    timestamp: new Date(ts.trim()).getTime(),
                    description: description.replace(/""/g, '"'),
                    credit: credit.trim() === "true",
                    amount: parseInt(amount.trim(), 10),
                });
            });
        };
        reader.readAsText(file);
        e.target.value = "";
    };

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
                                    cr,
                                });
                            });
                        dispatch({
                            type: "TRANSACTION_FETCHED",
                            payload: transaction,
                        });
                    },
                    (err) => {
                        if (user) {
                            console.log(err);
                            window.halfmoon.initStickyAlert({
                                content: "Error while fetching from database",
                                title: "Error!!",
                                alertType: "alert-danger",
                                fillType: "filled",
                            });
                        }
                    },
                ),
            )
            .catch((e) =>
                console.log("Error while waiting for backend update", e),
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
                                                    t.timestamp,
                                                ).toLocaleString("en-IN", {
                                                    dateStyle: "short",
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
                                                            e.target.id,
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
                <div className='m-auto d-flex' style={{ gap: "0.5rem" }}>
                    <button
                        className='btn btn-primary btn-rounded'
                        onClick={() =>
                            window.halfmoon.toggleModal("addTransaction")
                        }
                    >
                        ADD
                    </button>
                    <button
                        className='btn btn-secondary btn-rounded'
                        onClick={exportCSV}
                        disabled={transaction.length === 0}
                    >
                        Export CSV
                    </button>
                    <input
                        ref={importRef}
                        type='file'
                        accept='.csv'
                        style={{ display: "none" }}
                        onChange={importCSV}
                    />
                    <button
                        className='btn btn-secondary btn-rounded'
                        onClick={() => importRef.current.click()}
                    >
                        Import CSV
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Home);
