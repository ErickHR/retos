
import { useState } from "react";
import { Link } from "react-router-dom";
import './../styles/NavBar.css'

let itemSelectedData= null

const NavBar = () => {

    const [ itemNavBar, setItemNavBar ] = useState([
        {
            route : '/',
            name : 'Inicio',
            icon : 'home-outline',
            className : `navbar__item`
        },
        {
            route : '/with-datatable',
            name : 'Con Datatable',
            icon : 'checkmark-done-outline',
            className : `navbar__item`
        },
        {
            route : '/without-datatable',
            name : 'Sin Datatable',
            icon : 'close-outline',
            className : `navbar__item `
        }
    ])


    const itemSelected = ( target ) => {
        // if( target.tagName != 'LI'  ) {
        //     let li = target.closest( 'li' ) 
        // }

        let etiquet = target.tagName != 'LI' ? target.closest( 'li' ) : target
        
        if( itemSelectedData ) {
            itemSelectedData.previousSibling?.classList.remove( 'previous-sibling' )
            itemSelectedData.classList.remove( 'active' )
        }
        
        itemSelectedData = etiquet
        itemSelectedData.classList.add( 'active' )
        itemSelectedData.previousSibling?.classList.add( 'previous-sibling' )
    }

    return (
        <nav className="navbar">
            <div className="navbar__wrapper">
                <ul className="navbar__list">
                    {
                        itemNavBar.map( ( item, index ) => {
                            return (
                                <li className={ `${ item.className }` } key={ `nav-bar-${index}` } onClick={ ( { target } ) => itemSelected( target ) } >
                                    <Link to={ item.route } className="navbar__link">
                                        <span className="navbar__span navbar__icon">
                                            <ion-icon name={item.icon}></ion-icon>
                                        </span>
                                        <span className="navbar__span">
                                        { item.name }
                                        </span>
                                    </Link>
                                </li>
                            )
                        } )
                    }
                    
                </ul>
            </div>
        </nav>
    )

}

export default NavBar