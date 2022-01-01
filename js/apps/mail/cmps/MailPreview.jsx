// import { MailList } from "./MailList.jsx"

const { NavLink } = ReactRouterDOM

export function MailPreview({ mail, getSelectedMailMsg }) {

    function setSelectedMail() {
        getSelectedMailMsg(mail.id)
    }

    return (
        <tr>
            <td>⭐✩★;</td>
            <td onClick={setSelectedMail}>
                <NavLink activeclassname="clean-link" to={`/mail/${mail.id}`}>
                    {mail.sentFrom}
                </NavLink>
            </td>
            <td onClick={setSelectedMail}>
                <NavLink activeclassname="clean-link" to={`/mail/${mail.id}`}>
                {mail.subject}
                </NavLink>
            </td>
            <td onClick={setSelectedMail}>
                <NavLink activeclassname="clean-link" to={`/mail/${mail.id}`}>
                {mail.arrivedDate.month}
                </NavLink>
                </td>
            <td onClick={setSelectedMail}>
                <NavLink activeclassname="clean-link" to={`/mail/${mail.id}`}>
                {mail.arrivedDate.dayNum}
                </NavLink>
                </td>
            {/* <td><button className="fa trash" onClick={() => onRemoveNote(note)}></button></td> */}
        </tr>
    )
}

