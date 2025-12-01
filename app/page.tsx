// app/page.tsx

export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Mon API de Badge Dynamique est en Ligne !</h1>
      <p>L'API qui génère le badge se trouve à l'adresse :</p>
      <code>/api/badge?text=Exemple&color=#00BFFF</code>
      <p>Le 404 est résolu ! 🎉</p>
    </div>
  );
}