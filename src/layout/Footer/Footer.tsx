import './Footer.scss'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>{currentYear} / dev M. E.</p>
    </footer>
  )
}