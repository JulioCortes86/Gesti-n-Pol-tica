import React, { useState } from 'react';

function LeaderSetup({ onComplete }) {
    const [data, setData] = useState({ name: '', id: '', role: '', photo: '' });

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setData({ ...data, photo: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.name && data.id) onComplete(data);
    };

    return (
        <div className="app-container" style={{ justifyContent: 'center' }}>
            <div className="card">
                <h2>Configuración Inicial</h2>
                <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>
                    Bienvenido. Por favor completa tus datos para personalizar los reportes.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input
                            required
                            type="text"
                            value={data.name}
                            onChange={e => setData({ ...data, name: e.target.value })}
                            placeholder="Ej. Daniel Rico"
                        />
                    </div>
                    <div className="form-group">
                        <label>Número de Cédula</label>
                        <input
                            required
                            type="number"
                            value={data.id}
                            onChange={e => setData({ ...data, id: e.target.value })}
                            placeholder="12345678"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cargo / Rol</label>
                        <input
                            required
                            type="text"
                            value={data.role}
                            onChange={e => setData({ ...data, role: e.target.value })}
                            placeholder="Ej. Candidato Concejo"
                        />
                    </div>
                    <div className="form-group">
                        <label>Foto de Perfil</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            onChange={handlePhoto}
                            style={{ padding: '10px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                        Empezar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LeaderSetup;
