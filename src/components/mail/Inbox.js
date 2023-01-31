import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../store/compose-reducer';
import classes from './Inbox.module.css';
import SingleMail from './SingleMail';

const Inbox = () => {
    const [singleMail, setSingleMail] = useState(false);
    const mails = useSelector(state => state.compose.fetchMail);
    const dispatch = useDispatch();

    const userMailId = localStorage.getItem('email');
    const userMail = userMailId.split('.').join('');

    const fetchMails = async () => {
        try {
            const res = await axios.get(
            `https://client-mail-box-default-rtdb.firebaseio.com/${userMail}Inbox.json`
            );
            console.log(res);
            dispatch(composeActions.fetchMail(res.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setInterval(() => {
            fetchMails();
            // console.log('called');
        }, 2000)
        // eslint-disable-next-line
    }, []);

    const singleMailHandler = (mail) => {
        setSingleMail(mail);
    }

    const deleteHandler = async(mail) => {
        console.log(mail);
        try {
            const res = await axios.delete(
            `https://client-mail-box-default-rtdb.firebaseio.com/${userMail}Inbox/${mail}.json`
            );
            console.log(res);
            fetchMails();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={classes.inbox}>
            <h1>Received Mails</h1>
            <div>
                <ul>
                    {!singleMail && mails!== null &&
                        Object.keys(mails).map((mail) => {
                            let read = false;
                            if(mails[mail].read !== false){
                                read = true;
                            }
                            return (
                                <div key={mail.toString()}>
                                    <div
                                        onClick={() =>singleMailHandler(mail)}>
                                        <li
                                            style={{ 
                                                listStyleType: read ? 'none' : 'disc', color: read ? 'black' : 'blue'
                                                }}>
                                            <span>From: {mails[mail].from}</span>
                                        </li> 
                                    </div>  
                                    <button
                                        onClick={() => deleteHandler(mail)}>
                                        Delete
                                    </button>
                                    <hr />
                                </div>
                            )
                        })
                    }
                    {singleMail && (
                        <SingleMail mailDetails={{singleMail, mails}} />
                        )}
                    {mails === null && <p>No mails found</p>}
                </ul>
            </div>
        </section>
    )
};

export default Inbox;