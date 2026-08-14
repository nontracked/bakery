import packageInfo from '../../../package.json';
import './Footer.scss'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>{currentYear} / dev M. E. / v {packageInfo.version}</p>
    </footer>
  )
}