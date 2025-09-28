import './leftBar.css'
import { Link, UNSAFE_NavigationContext, useLocation } from 'react-router-dom';

export default function LeftBar(){
    const location = useLocation();

    const barPages = [
        {path: '/cabinet', icon: '/alabuga_icon_cabinet.png'},
        {path: '/shop', icon: '/alabuga_icon_shop.png'},
        {path: '/artefacts', icon:'/alabuga_icon_artefactPage.png'}
    ]

    return(
        <nav className="left-nav">
            {
                barPages.map((page) =>(
                    <Link
                        key = {page.path}
                        to = {page.path}
                        className={`nav-item ${location.pathname === page.path ? 'nav-item-active' : ''}`}
                    >
                        <img className='nav-icon' src={page.icon}/>
                    </Link>
                )
            )
            }
        </nav>
    );
}