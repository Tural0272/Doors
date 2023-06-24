import logo from "../../images/logo2.png";
import "../../styles/Footer.css";
import LinkIcon from "@material-ui/icons/Link";

function Footer() {
  return (
    <footer className="footer">
      <div className="">
        <div className="copyright">
          <a
            href="https://faridshabanov02.web.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="" className="imageLogo" />
            &copy; {new Date().getFullYear()} Made by{" "}
            <p className="footer__link">
              F.S. <LinkIcon />
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
