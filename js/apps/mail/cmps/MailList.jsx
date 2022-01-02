import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
// import { MailNav } from "./MailNav.jsx";
import { MailTrash } from "./MailTrash.jsx";


const { NavLink, Link } = ReactRouterDOM

export function MailList({ mails, selectedMail, getSelectedMailMsg }) {

    function onSetDelete() {
        selectedMail.isTrash = true ;
        mailService.getMailToTrash(selectedMail);
        console.log('Moved To Trash: ',selectedMail); 
    }

    function onSetMarkUnread() {
        const mail = selectedMail;
        (!mail.isRead) ? mail.isRead = true : mail.isRead = false;
        mailService.saveMail(mail);
        console.log('Is Read: ', mail.isRead);
    }

    function onSetMarkImportant() {
        const mail = selectedMail;
        (!mail.isImportant) ? mail.isImportant = true : mail.isImportant = false;
        mailService.saveMail(mail);
        console.log('Is Important: ', mail.isImportant);
    }

    function onSetStarred() {
        const mail = selectedMail;
        (!mail.isStarred) ? mail.isStarred = true : mail.isStarred = false;
        mailService.saveMail(mail);
        console.log('Is Starred: ', mail.isStarred);
    }

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
                    {/* <input action="action" onclick="window.history.go(-1); return false;" type="submit" value="Cancel"/> */}
                    {/* <NavLink to="/mail/inbox"> */}
                    <Link to="/mail/inbox">
                    <button className="back-to-inbox">🡰Back to inbox</button>
                    {/* </NavLink> */}
                    </Link>
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

}