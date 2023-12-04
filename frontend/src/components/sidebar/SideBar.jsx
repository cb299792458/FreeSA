import Link from "next/link";
import './SideBar.scss';


export default function SideBar(){

    return(
        <div id="sidebar">
            <nav className="menu-options">
            <Link href="/"><li>Home</li></Link>
                <li>New Videos</li>
                <li>Saved Videos</li>
                <li>Random Video</li>
                <li>Easy Videos</li>
                <li>Medium Videos</li>
                <li>Hard Videos</li>
            </nav>
        </div>
    )
}