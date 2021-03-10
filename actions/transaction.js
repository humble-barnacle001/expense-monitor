import firebase from "../firebase";

export const addTransaction = async (data) => {
    const user = firebase.auth().currentUser;
    const ref = firebase
        .firestore()
        .collection(`data/${user ? user.uid : "none"}/transactions`);
    ref.add(data)
        .then(() =>
            window.halfmoon.initStickyAlert({
                content: "Added successfully",
                title: "Success!!",
                alertType: "alert-success",
                fillType: "filled"
            })
        )
        .catch((e) => {
            console.log("ERROR IN ADDING:", e);
            window.halfmoon.initStickyAlert({
                content: "Error adding new transaction",
                title: "Error!!",
                alertType: "alert-danger",
                fillType: "filled"
            });
        });
};

export const delTransaction = async (id) => {
    const user = firebase.auth().currentUser;
    if (id && user) {
        firebase
            .firestore()
            .doc(`data/${user.uid}/transactions/${id}`)
            .delete()
            .then(() =>
                window.halfmoon.initStickyAlert({
                    content: "Deleted successfully",
                    title: "Success!!",
                    alertType: "alert-success",
                    fillType: "filled"
                })
            )
            .catch((e) => {
                console.log("ERROR IN DELETING:", e);
                window.halfmoon.initStickyAlert({
                    content: "Error deleting the transaction",
                    title: "Error!!",
                    alertType: "alert-danger",
                    fillType: "filled"
                });
            });
    }
};
