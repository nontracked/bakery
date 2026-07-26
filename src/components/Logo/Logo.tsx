import './Logo.scss'
import Link from "next/link";

export const Logo = () => {
  return (
    <Link className="logo" href="/">
      <div>
        M.E. Bakery
      </div>
    </Link>
  )
}