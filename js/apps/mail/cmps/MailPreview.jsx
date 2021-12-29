
// const {Link} = ReactRouterDOM

export function MailPreview({ mail }) {
    console.log(mail);

    return (
            <tr>
                <td>⭐</td>
                <td>{mail.sentFrom}</td>
                <td>{mail.subject}</td>
                <td>{mail.arrivedDate.month}</td>
                <td>{mail.arrivedDate.dayNum}</td>
                {/* <MailTdPreview mail={mail} key={mail.id} /> */}
            </tr>
    )
}

{/* <div className="enteredMail"></div> */ }
{/* <MailSearch /> */ }
{/* <MailNav /> */ }
