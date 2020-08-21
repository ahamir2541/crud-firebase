import React,{useState} from 'react';
import firebaseDb from '../firebase'

const ContactList = ({ contactObj, setCurrentId }) => {

    // delete data
    const onDeletHandler = key => {
        if(window.confirm('are you sure')){
            firebaseDb.child(`contacts/${key}`).remove()
        }
    }

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(contactObj).map(id => (
                        <tr key={id}>
                            <th scope="row"> {contactObj[id].fullName} </th>
                            <td> {contactObj[id].mobile}</td>
                            <td> {contactObj[id].email}</td>
                            <td className="d-flex">
                                <span onClick={() => setCurrentId(id) } ><i className="fas fa-pen mx-3"></i></span>
                                <span onClick={() => onDeletHandler(id) }><i className="fas fa-trash"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;