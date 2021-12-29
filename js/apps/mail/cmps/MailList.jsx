import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    if (!mails.length) return  <h2>There are no mails to show</h2>
    // const {mails} = mails
    // if(!mails) return
    return (
        // <h2>aaa</h2>
        <section className="mail-list">
            {mails.map(mail => {return <MailPreview mail={mail} key={mail.id}/>})}
        </section>
    )
}
