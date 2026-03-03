import ThemeToggle from "../common/ThemeToggle";

function Header() {
  return (
    <header>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Dekar Cyber Cafe & e-Services</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
