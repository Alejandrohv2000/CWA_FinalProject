export default function ErrorMessage({ children }) {
  if (!children) return null;

  return (
    <div
      style={{
        background: '#ffe5e5',
        padding: '10px',
        borderRadius: '6px',
        color: '#b00000',
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  );
}
