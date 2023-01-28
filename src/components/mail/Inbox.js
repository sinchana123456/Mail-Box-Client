import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../store/compose-reducer';
import classes from './Inbox.module.css';

const Inbox = (props) => {
    const mails = useSelector(state => state.compose.fetchMail);
    console.log(mails);
    const dispatch = useDispatch();
    const userMailId = localStorage.getItem('email');
    const userMail = userMailId.split('.').join('');
    console.log(userMail);

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const res = await axios.get(
                `https://client-mail-box-default-rtdb.firebaseio.com/${userMail}.json`
                );
                console.log(res);
                console.log('fetched');
                dispatch(composeActions.fetchMail(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMails()
    }, [dispatch, userMail])
    return (
        <section className={classes.inbox}>
            <h1>Received Mails</h1>
            <div>
                <ul>
                    {Object.keys(mails).map((mail) => {
                        return (
                            <li key={mail.id}>
                                <span>From: {mails[mail].from}</span><br />
                                <span>Subject: {mails[mail].subject}</span><br />
                                <span>Body: {mails[mail].body}</span>
                                <hr />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
};

export default Inbox;