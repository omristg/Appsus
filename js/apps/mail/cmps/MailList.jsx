import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    if (!mails.length) return <h2>There are no mails to show</h2>
    // const {mails} = mails
    // if(!mails) return

    // onSetDeleteMail = (mailId)=>{console.log('Deleted', mailId)}

    return (
        // <h2>aaa</h2>
        <section className="mail-list">
            <table>
                <tbody>
                    {mails.map(mail => {
                        return <MailPreview mail={mail} key={mail.id} />
                    })}
                </tbody>
            </table>
        </section>
    )
}

