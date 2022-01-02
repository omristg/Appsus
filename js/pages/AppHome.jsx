const { NavLink } = ReactRouterDOM


export function AppHome() {
    return (

        <section className="app-home">
            <div className="home-nav-container item-center">
                <NavLink activeClassName="my-active" to="/about">About</NavLink>
                <NavLink activeClassName="my-active" to="/book">Books</NavLink>
                <NavLink activeClassName="my-active" to="/note">Keep</NavLink>
                <NavLink activeClassName="my-active" to="/mail">Mail</NavLink>
            </div>
         
        </section>


    )
}