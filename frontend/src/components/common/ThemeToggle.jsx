function ThemeToggle() {
  function handleToggle() {
    document.body.classList.toggle("dark");
  }

  return <button onClick={handleToggle} style={{ width: "auto" }}>Theme</button>;
}

export default ThemeToggle;
