import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { composeActions } from '../../store/compose-reducer';
import classes from './Inbox.module.css';
import SingleMail from './SingleMail';

const Inbox = () => {
    const [singleMail, setSingleMail] = useState(false);
    const mails = useSelector(state => state.compose.fetchMail);
    const dispatch = useDispatch();

    const userMailId = localStorage.getItem('email');
    const userMail = userMailId.split('.').join('');

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const res = await axios.get(
                `https://client-mail-box-default-rtdb.firebaseio.com/${userMail}.json`
                );
                console.log(res);
                dispatch(composeActions.fetchMail(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMails()
    }, [dispatch, userMail]);

    const singleMailHandler = (mail) => {
        setSingleMail(mail);
    }

    return (
        <section className={classes.inbox}>
            <h1>Received Mails</h1>
            <div>
                <ul>
                    {!singleMail && mails &&
                        Object.keys(mails).map((mail) => {
                            let read = false;
                            if(mails[mail].read !== false){
                                read = true;
                            }
                            return (
                                <div key={mail.toString()} onClick={() =>singleMailHandler(mail)}>
                                    <Link to='/single-mail-details'>
                                        <li
                                            style={{ listStyleType: read ? 'none' : 'disc',color: read ? 'black' : 'blue',}}>
                                            <span>From: {mails[mail].from}</span><br />
                                            <span>{mails[mail].subject}</span><br />
                                            <hr />
                                        </li> 
                                    </Link>  
                                </div>
                            )
                        })
                    }
                    {singleMail && <SingleMail mailDetails={{singleMail, mails}} />}
                    {mails === null && <p>No emails found</p>}
                </ul>
            </div>
        </section>
    )
};

export default Inbox;