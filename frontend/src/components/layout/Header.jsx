import ThemeToggle from "../common/ThemeToggle";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <h1 className="site-title">Dekar Cyber Cafe & e-Services</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
