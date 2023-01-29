import axios from "axios";
import { useEffect, useState } from "react";
import classes from './Inbox.module.css';

const Sent = () => {
    const userMailId = localStorage.getItem('email');
    const [sentMails, setSentMails] = useState([]);

    const fetchSentMails = async () => {
        const userMail = userMailId.split('.').join('');
        console.log(userMail);

        try {
            const res = await axios.get(
            `https://client-mail-box-default-rtdb.firebaseio.com/${userMail}.json`
            );
            console.log(res.data);
            const data = res.data;
            setSentMails(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSentMails();
        // eslint-disable-next-line
    }, []);
    return (
        <section className={classes.inbox}>
            <h1>Sent Mails</h1>
            <div>
                <ul>
                {Object.keys(sentMails).map((mail) => {
                    return (
                        <div key={mail.toString()}>
                            <li>
                                <span>From: {sentMails[mail].from}</span><br />
                                <span>Subject: {sentMails[mail].subject}</span><br />
                                <span>Body: {sentMails[mail].body}</span><br />
                            </li> <hr />
                        </div>
                    );
                })}
                {sentMails === null && <p>No mails found</p>}
                </ul>
            </div>
        </section>
    )
};

export default Sent;