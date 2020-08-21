import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import firebaseDb from '../firebase'

const Contacts = () => {
    const [contactObj, setContactObj] = useState({})
    const [currentId, setCurrentId] = useState('')

    // create and update
    const addOrEdit = obj => {
        if (currentId == '') {
            // send data to databse / add data
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        } else {
            // update form value / edit data
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err){
                        console.log(err)
                    }else{
                        setCurrentId('')
                    }
                }
            )
        }
    }

    // send data to a object / create a list from database
    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if (snapshot.val() != '') {
                setContactObj({
                    ...snapshot.val()
                })
            } else {
                setContactObj({})
            }
        })
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mt-3 ">
                    <ContactForm {...({ addOrEdit, currentId, contactObj })} />
                </div>
                <div className="col-lg-6 mt-3 ">
                    <ContactList {...({ contactObj, setCurrentId })} />
                </div>
            </div>
        </div>
    );
};

export default Contacts;