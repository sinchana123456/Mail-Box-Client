import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef } from 'react';
import Button from '../UI/Button';
import classes from './ComposeMail.module.css';
import { useDispatch } from 'react-redux';
import { composeActions } from '../../store/compose-reducer';

const ComposeMail = () => {
    const emailRef = useRef('');
    const subjectRef = useRef('');
    const dispatch = useDispatch();
    let content;

    const onEditorStateChange = (event) => {
        content = event.getCurrentContent().getPlainText();
    }

    const submitHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredSubject = subjectRef.current.value;
        const userMail = localStorage.getItem('email');
        const userMailId = userMail.split('.').join('');

        const mailDataObj = {
            from: userMailId,
            to: enteredEmail,
            subject: enteredSubject,
            body: content,
        }
        try {
            const res = await axios.post(
                `https://client-mail-box-default-rtdb.firebaseio.com/${userMailId}.json`,
                mailDataObj
            );
            console.log(res);
            dispatch(composeActions.composeMail(userMailId));
            console.log('sent');
            alert('Sent successfully');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={classes.compose}>
            <h1>Compose Mail</h1>
            <form onSubmit={submitHandler}>
                <input 
                    name='email'
                    type='email'
                    placeholder='To'
                    required
                    ref={emailRef}
                />
                <input 
                    name='subject'
                    type='subject'
                    placeholder='Subject'
                    ref={subjectRef}
                />
                <Editor
                    // editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                />
                <Button>Send</Button>
            </form>
        </section>
    )
};

export default ComposeMail;