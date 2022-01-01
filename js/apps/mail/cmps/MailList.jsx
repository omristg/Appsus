import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM

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
                    <button className="back-to-inbox">🡰Back to inbox</button>
                    <button className="delete-mail">🗑️Delete</button>
                    <button className="unread-mark">Mark as unread</button>
                    <button className="imprtant-mark">Mark as important</button>
                    <button className="add-star">Add star</button>
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
