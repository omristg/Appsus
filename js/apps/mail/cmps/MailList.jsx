// import {  } from "../../../services/storage.service.js"
// import { MailApp } from "../pages/MailApp.jsx"
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Route } = ReactRouterDOM

export function MailList({ mails, selectedMail, getSelectedMailMsg }) {

    if (!mails.length) return <h2>There are no mails to show</h2>

    if (!selectedMail) {
        return (
            <section className="mail-list">
                <table>
                    <tbody>
                        {mails.map(mail => {
                            return <MailPreview mail={mail} key={mail.id} getSelectedMailMsg={getSelectedMailMsg} />
                        })}
                    </tbody>
                </table>
            </section>
        )
    } else {
        const mail = selectedMail;
        return (
            <div className="mail-reading">
                <section className="mail-reading-header-nav">
                    <button className="back-to-inbox" onClick={onSetGoBack}>🡰Back to inbox</button>
                    <button className="delete-mail" onClick={onSetDelete}>🗑️Delete</button>
                    <button className="unread-mark" onClick={onSetMarkUnread}>Mark as unread</button>
                    <button className="imprtant-mark" onClick={onSetMarkImportant}>Mark as important</button>
                    <button className="add-star" onClick={onSetStarred}>Add star</button>
                </section>


                <section className="main-mail-reading">
                    <div className="mail-reading-header">
                        <p>{mail.subject}</p>
                    </div>
                    <div className="mail-user-sent">
                        <p>{mail.sentFrom}</p>
                    </div>
                    <div className="mail-arrieving-date">
                        <p>{mail.arrivedDate.day} {mail.arrivedDate.month} {mail.arrivedDate.dayNum}</p>
                    </div>
                    <div className="mail-content">
                        <p>{mail.mailContent}</p>
                    </div>
                </section>
            </div>
        )
    }

    function onSetGoBack() {
        console.log(props);
        // <Route component={MailApp} path="/mail"></Route>
        // window
        // console.log(window.history);
        // const mail = selectedMail;
        // console.log(mail);

    }

    function onSetDelete() {
        const mail = selectedMail;
        mailService.removeMail(mail.id);

    }

    function onSetMarkUnread() {
        const mail = selectedMail;
        mailService.saveMail(mail);

    }

    function onSetMarkImportant() {
        const mail = selectedMail;
        (!mail.isImportant) ? mail.isImportant = true : mail.isImportant = false;
        mailService.saveMail(mail);
        console.log('isStarred: ', mail.isStarred);

        // (!mail.isStarred) ? mail.isStarred = true : mail.isStarred = false
        // console.log(mail);
        // mailService.saveMail(mail)
    }

    function onSetStarred() {
        const mail = selectedMail;
        (!mail.isStarred) ? mail.isStarred = true : mail.isStarred = false;
        mailService.saveMail(mail);
        console.log('isStarred: ', mail.isStarred);

    }
}