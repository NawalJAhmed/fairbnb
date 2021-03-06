import './Footer.css'

function Footer() {
    return (
        <div id="footer-container">
                <p id="name">Nawal Ahmed</p>
                <div id="links">
                    <div id="github">
                        <a className="gl-links" href='https://github.com/NawalJAhmed'>
                            <img className="links-logo" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="Github logo"/>
                        </a>
                    </div>
                    <div id="linkedin">
                        <a className="gl-links" href='https://www.linkedin.com/in/nawaljahmed/'>
                            <img className="links-logo" src="https://www.edigitalagency.com.au/wp-content/uploads/new-linkedin-logo-white-black-png.png" alt="LinkedIn logo"/>
                        </a>
                    </div>
                </div>
        </div>
    );
}

export default Footer;
