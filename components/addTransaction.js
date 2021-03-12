import { addTransaction } from "../actions/transaction";

const AddTransaction = () => {
    return (
        <div
            className='modal'
            id='addTransaction'
            tabIndex='-1'
            role='dialog'
            data-overlay-dismissal-disabled='true'
            data-esc-dismissal-disabled='true'
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <button
                        className='btn close'
                        role='button'
                        aria-label='Close'
                        onClick={() =>
                            window.halfmoon.toggleModal("addTransaction")
                        }
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    <h5 className='modal-title'>Add a new transaction</h5>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            let data = {};
                            Array.from(e.target).map(
                                (input) =>
                                    (data[input.id] =
                                        input.id.indexOf("it") != -1
                                            ? input.checked
                                            : input.value)
                            );
                            const {
                                purpose: description,
                                credit,
                                debit
                            } = data;
                            const amount = parseInt(data.amount),
                                timestamp = new Date(data.timestamp).getTime();
                            const pdata = {
                                description,
                                credit,
                                amount,
                                timestamp
                            };
                            if (credit === debit)
                                window.alert("Error detected");
                            else {
                                e.target.reset();
                                addTransaction(pdata);
                                window.halfmoon.toggleModal("addTransaction");
                            }
                        }}
                    >
                        <div className='form-group'>
                            <label htmlFor='purpose' className='required'>
                                Purpose
                            </label>
                            <input
                                type='text'
                                id='purpose'
                                className='form-control'
                                placeholder='Short description of the transaction'
                                required='required'
                                autoComplete='none'
                                maxLength='30'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='radio-set-1' className='required'>
                                Type of transaction
                            </label>
                            <div>
                                <div className='custom-radio d-inline-block mr-10'>
                                    <input
                                        type='radio'
                                        name='radio-set-1'
                                        id='credit'
                                        value='credit'
                                        defaultChecked
                                    />
                                    <label htmlFor='credit'>Credit</label>
                                </div>
                                <div className='custom-radio d-inline-block'>
                                    <input
                                        type='radio'
                                        name='radio-set-1'
                                        id='debit'
                                        value='debit'
                                    />
                                    <label htmlFor='debit'>Debit</label>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='amount' className='required'>
                                Amount
                            </label>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text'>
                                        &#x20B9;
                                    </span>
                                </div>
                                <input
                                    type='number'
                                    id='amount'
                                    className='form-control'
                                    placeholder='Amount in rupees'
                                    required='required'
                                    autoComplete='none'
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='timestamp' className='required'>
                                Date
                            </label>
                            <input
                                type='date'
                                id='timestamp'
                                className='form-control'
                                required='required'
                                autoComplete='none'
                                onFocus={(e) =>
                                    e.target.setAttribute(
                                        "max",
                                        `${new Date()
                                            .toISOString()
                                            .substring(0, 10)}`
                                    )
                                }
                            />
                        </div>
                        <input
                            className='btn btn-primary btn-block'
                            type='submit'
                            id='submitBtn'
                            value='Add'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
