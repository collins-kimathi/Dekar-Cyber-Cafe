function ThemeToggle() {
  function handleToggle() {
    document.body.classList.toggle("dark");
  }

  return (
    <button type="button" className="header-toggle" onClick={handleToggle}>
      Theme
    </button>
  );
}

export default ThemeToggle;
