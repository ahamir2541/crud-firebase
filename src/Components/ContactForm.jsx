import React, { useState, useEffect } from 'react';

const ContactForm = ({ addOrEdit, currentId, contactObj }) => {

    const initialFieldValue = {
        fullName: '',
        mobile: '',
        email: '',
        address: '',
    }

    const [values, setValues] = useState(initialFieldValue)

    // contact form filup
    useEffect(() => {
        if(currentId == ''){
            setValues({
                ...initialFieldValue
            })
        }else{
            setValues({
                ...contactObj[currentId]
            })
        }

    }, [currentId, contactObj])

    const onChangeHandler = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()

        addOrEdit(values)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="input-group mb-3 ">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >@</span>
                    </div>
                    <input value={values.fullName} onChange={onChangeHandler} name="fullName" type="text" className="form-control" placeholder="Full Name" ></input>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="input-group mb-3 ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" >@</span>
                            </div>
                            <input value={values.mobile} onChange={onChangeHandler} name="mobile" type="number" className="form-control" placeholder="Mobile" ></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group mb-3 ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" >@</span>
                            </div>
                            <input value={values.email} onChange={onChangeHandler} name="email" type="email" className="form-control" placeholder="Email" ></input>
                        </div>
                    </div>
                </div>
                <textarea value={values.address} onChange={onChangeHandler} name="address" className="form-control mb-2" placeholder="address" ></textarea>
                <button className="btn btn-primary btn-block"> { currentId == '' ? 'Save' : 'Update' } </button>
            </form>
        </div>
    );
};

export default ContactForm;