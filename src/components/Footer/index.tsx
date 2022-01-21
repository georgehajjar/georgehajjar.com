export function Footer() {
  return (
    <footer
      className="w-full flex justify-center items-center bg-black2"
      style={{ height: '5rem' }}
    >
      <div
        className="h-full flex justify-between items-center"
        style={{ width: '70%' }}
      >
        <div className="text-grey" style={{ fontSize: '1.2rem' }}>
          {new Date().getFullYear()} &copy; Website by&nbsp;
          <strong style={{ fontSize: '1.2rem' }}>George Hajjar</strong>
        </div>
      </div>
    </footer>
  );
}
