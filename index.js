import { useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState("");
    
    const handleAction = async (action) => {
        const response = await fetch("/api/bot-control", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.NEXT_PUBLIC_API_KEY // clé API publique pour le front
            },
            body: JSON.stringify({ action })
        });
        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Contrôle du Bot Discord</h1>
            <button onClick={() => handleAction("start")} style={buttonStyle}>Démarrer le bot</button>
            <button onClick={() => handleAction("stop")} style={buttonStyle}>Arrêter le bot</button>
            {message && <p>{message}</p>}
        </div>
    );
}

// Styles de base pour les boutons
const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px'
};
