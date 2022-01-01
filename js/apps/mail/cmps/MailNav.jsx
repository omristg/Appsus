

const { NavLink, Link, Route } = ReactRouterDOM


export function MailNav(props) {
    function Inbox() {
        if (props.filterBy === 'isInbox') return <div></div>
        if(window.location.hash!== '#/mail' && window.location.hash!== '#/mail/inbox' ) return <div></div>
        props.onSetFilter('isInbox')
        return <div></div>
    }
    
    function Starred() {
        if (props.filterBy === 'isStarred') return <div></div>
        props.onSetFilter('isStarred')
        return <div></div>
    }
    function Important() {
        if (props.filterBy === 'isImportant') return <div></div>
        props.onSetFilter('isImportant')
        return <div></div>
    }
    function Sent() {
        if (props.filterBy === 'isSent') return <div></div>
        props.onSetFilter('isSent')
        return <div></div>
    }
    function Drafts() {
        if (props.filterBy === 'isDraft') return <div></div>
        props.onSetFilter('isDraft')
        return <div></div>
    }
    function Trash() {
        if (props.filterBy === 'isTrash') return <div></div>
        props.onSetFilter('isTrash')
        return <div></div>
    }

    return (
        <section className="mail-nav">
            <NavLink activeClassName="mail-inbox" to="/mail/inbox">Inbox</NavLink>
            <NavLink activeClassName="mail-starred" to="/mail/starred">Starred</NavLink>
            <NavLink activeClassName="mail-important" to="/mail/important">Important</NavLink>
            <NavLink activeClassName="mail-sent" to="/mail/sent">Sent</NavLink>
            <NavLink activeClassName="mail-drafts" to="/mail/drafts">Drafts</NavLink>
            <NavLink activeClassName="mail-trash" to="/mail/trash">Trash</NavLink>
            <Route component={Starred} path='/mail/starred' />
            <Route component={Inbox} path='/mail' />
            <Route component={Important} path="/mail/important" />
            <Route component={Sent} path="/mail/sent" />
            <Route component={Drafts} path="/mail/drafts" />
            <Route component={Trash} path="/mail/trash" />
        </section>
    )
}