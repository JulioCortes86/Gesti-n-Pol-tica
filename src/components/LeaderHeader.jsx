import React from 'react';

function LeaderHeader({ leader }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--primary-color)', marginBottom: '24px' }}>Gestión Política</h1>
            <div className="leader-header">
                {leader.photo && (
                    <img
                        src={leader.photo}
                        alt="Líder"
                        className="leader-avatar"
                        style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                )}
                <div className="leader-info">
                    <h4>{leader.name || 'Líder Político'}</h4>
                    <p>{leader.role || 'Candidato'}</p>
                    <p style={{ opacity: 0.8, fontSize: '0.8rem' }}>C.C. {leader.id}</p>
                </div>
            </div>
        </div>
    );
}

export default LeaderHeader;
