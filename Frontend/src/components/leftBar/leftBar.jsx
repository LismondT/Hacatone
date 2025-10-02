import './leftBar.css'
import { Link, useLocation } from 'react-router-dom';

export default function LeftBar(){
    const location = useLocation();

    const barPages = [
        {path: '/cabinet', icon: '/alabuga_logo_variant_one.png', pageName: 'alabuga-logo'},
        {path: '/cabinet', icon: '/alabuga_icon_cabinet.png', pageName: 'cabinet'},
        {path: '/shop', icon: '/alabuga_icon_shop.png', pageName: 'shop'},
        {path: '/artefacts', icon: '/alabuga_icon_artefactPage.png', pageName: 'artefacts'},
        {path: '/missionsList', icon: '/alabuga_icon_missionsList.png', pageName: 'missionsList'},
        {path: '/onboarding', icon: '/alabuga_icon_onboarding.png', pageName: 'onboarding'}
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
                        <img className={`nav-icon ${page.pageName}`} src={page.icon}/>
                    </Link>
                )
            )
            }
        </nav>
    );
}