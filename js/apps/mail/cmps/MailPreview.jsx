// import { MailList } from "./MailList.jsx"
// const {Link} = ReactRouterDOM

export function MailPreview({ mail }) {
    
    // console.log(mail.id);
    
    
    return (
            <tr>
                <td>⭐</td>
                <td>{mail.sentFrom}</td>
                <td>{mail.subject}</td>
                <td>{mail.arrivedDate.month}</td>
                <td>{mail.arrivedDate.dayNum}</td>
                {/* <td><button className="delete-mail" onClick={onSetDeleteMail(mail.id)}>Trash</button></td> */}
            </tr>
    )
}
