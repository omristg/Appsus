const { NavLink } = ReactRouterDOM


export function AppHeader() {

    return (
        <header className="app-header main-layout">
            <h1>Appsus</h1>
            
            <nav className="main-nav">
                <NavLink activeClassName="my-active" exact to="/">Home</NavLink>
                <NavLink activeClassName="my-active" to="/about">About</NavLink>
                <NavLink activeClassName="my-active" to="/book">Books</NavLink>
                <NavLink activeClassName="my-active" to="/note">Keep</NavLink>
                <NavLink activeClassName="my-active"  to="/mail">Mail</NavLink>
            </nav>
        </header>
    )
}