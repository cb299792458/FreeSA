import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <main>
            <div style={{padding: "20px", margin: "0 auto", display: "flex"}} className="auth-container">
                <div className="auth-left" style={{marginRight:"20px"}}>{children}</div>
                <div className="auth-right">Welcome!</div>
            </div>
    </main>
  )
}