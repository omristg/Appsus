import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, isOpenMail, getMailToOpen }) {


    if (!mails.length) return <h2>There are no mails to show</h2>
    // const {mails} = mails
    // if(!mails) return

    // onSetDeleteMail = (mailId)=>{console.log('Deleted', mailId)}

    if(!isOpenMail){
        return (
            // <h2>aaa</h2>
            <section className="mail-list">
                <table>
                    <tbody>
                        {mails.map(mail => {
                            return <MailPreview mail={mail} key={mail.id} getMailToOpen={getMailToOpen}/>
                        })}
                    </tbody>
                </table>
            </section>
        )
    } else {
        const mail = {...mails}
        console.log(mail);
        return (
            <div className="mail-reading">
                <section className="mail-reading-header-nav">
                    <button className="back-to-inbox">Back to inbox</button>
                    <button className="delete-mail">Delete</button>
                    <button className="unread-mark">Mark as unread</button>
                    <button className="imprtant-mark">Mark as important</button>
                    <button className="add-star">Add star</button>
                </section>


                <section className="main-mail-reading">
                <div className="mail-reading-header">{mail.subject}</div>
                <div className="mail-user-sent">{mail.sentFrom}</div>
                <div className="mail-arrieving-date">{mail.arrivedDate}</div>
                <div className="mail-content">{mail.mailContent}</div>
                </section>
            </div>
        )
    }
}
