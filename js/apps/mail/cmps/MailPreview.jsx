// import { MailList } from "./MailList.jsx"
// const {Link} = ReactRouterDOM

export function MailPreview({ mail, getMailToOpen }) {
    
    function setMailToOpen() {
        getMailToOpen(mail.id)
    }
    
    return (
            <tr>
                <td>⭐</td>
                <td onClick={setMailToOpen}>{mail.sentFrom}</td>
                <td onClick={setMailToOpen}>{mail.subject}</td>
                <td onClick={setMailToOpen}>{mail.arrivedDate.month}</td>
                <td onClick={setMailToOpen}>{mail.arrivedDate.dayNum}</td>
                {/* <td><button className="fa trash" onClick={() => onRemoveNote(note)}></button></td> */}
            </tr>
    )
}

