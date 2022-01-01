// import { MailList } from "./MailList.jsx"

const { NavLink, Route } = ReactRouterDOM

export function MailPreview({ mail, getSelectedMailMsg }) {

    function setSelectedMail() {
        getSelectedMailMsg(mail.id)
        return <React.Fragment></React.Fragment>
        // <div></div>
    }
    
    return (
        <tr>
            <td>⭐✩★;</td>
            <td>
                <NavLink activeclassname="clean-link" to={`/mail/message/:${mail.id}`}>
                    {mail.sentFrom}
                </NavLink>
                <Route component={setSelectedMail} path={`/mail/message/:${mail.id}`} />
            </td>
            <td>
                <NavLink activeclassname="clean-link" to={`/mail/message/:${mail.id}`}>
                    {mail.subject}
                </NavLink>
                <Route component={setSelectedMail} path={`/mail/message/:${mail.id}`} />
            </td>
            <td>
                <NavLink activeclassname="clean-link" to={`/mail/message/:${mail.id}`}>
                    {mail.arrivedDate.month}
                </NavLink>
                <Route component={setSelectedMail} path={`/mail/message/:${mail.id}`} />
            </td>
            <td>
                <NavLink activeclassname="clean-link" to={`/mail/message/:${mail.id}`}>
                    {mail.arrivedDate.dayNum}
                </NavLink>
                <Route component={setSelectedMail} path={`/mail/message/:${mail.id}`} />
            </td>
            {/* <td><button className="fa trash" onClick={() => onRemoveNote(note)}></button></td> */}
        </tr>
    )
}

