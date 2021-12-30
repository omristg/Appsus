// const { Route, Switch } = ReactRouterDOM
const { NavLink, Route } = ReactRouterDOM


function inbox() {
    return console.log('aaa');
}


export function MailNav() {
    return (
        < div className="navvv" >
            <NavLink activeClassName="mail-inbox" to="/mail/inbox">Inbox</NavLink>
            <NavLink activeClassName="mail-starred" to="/mail/starred">Starred</NavLink>
            <NavLink activeClassName="mail-important" to="/mail/important">Important</NavLink>
            <NavLink activeClassName="mail-sent" to="/mail/sent">Sent</NavLink>
            <NavLink activeClassName="mail-drafts" to="/mail/drafts">Drafts</NavLink>
            <NavLink activeClassName="mail-trash" to="/mail/trash">Trash</NavLink>
            <Route Component={inbox} path="/mail/inbox" />
            <Route Component={inbox} path="/mail/starred" />
            <Route Component={inbox} path="/mail/importent" />
            <Route Component={inbox} path="/mail/sent" />
            <Route Component={inbox} path="/mail/drafts" />
            <Route Component={inbox} path="/mail/trash" />
            </div >
    )
}
