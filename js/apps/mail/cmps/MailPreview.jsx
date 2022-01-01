// import { MailList } from "./MailList.jsx"

const { NavLink, Route } = ReactRouterDOM
const FULL_STAR = '★';
const EMPTY_STAR = '✩';
export function MailPreview({ mail, getSelectedMailMsg }) {

    function setSelectedMail() {
        getSelectedMailMsg(mail.id)
        return <React.Fragment></React.Fragment>
        // <div></div>
    }
    var star = (mail.isStarred) ? FULL_STAR : EMPTY_STAR;

    function setStarred(){
        (!mail.isStarred) ? mail.isStarred =  true : mail.isStarred = false ;
    }

    return (
        <tr>
            <td>
                <button onClick={setStarred}>{`${star}`}</button>
            </td>
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

