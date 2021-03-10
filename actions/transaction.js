import firebase from "../firebase";

export const addTransaction = async (data) => {
    const ref = firebase
        .firestore()
        .collection(`data/${firebase.auth().currentUser.uid}/transactions`);
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
