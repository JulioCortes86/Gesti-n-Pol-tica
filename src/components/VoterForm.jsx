import React, { useState, useEffect } from 'react';
import { Save, ExternalLink } from 'lucide-react';

function VoterForm({ onSave, existingVoters, editingVoter, onCancel }) {
    const initialState = { name: '', id: '', votingPoint: '', votingTable: '', birthDate: '', address: '', city: '', email: '', phone: '' };
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState('');

    // Populate form when editingVoter changes
    useEffect(() => {
        if (editingVoter) {
            setForm(editingVoter);
        } else {
            setForm(initialState);
        }
    }, [editingVoter]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for duplicate ID only if NOT editing the same voter
        if (!editingVoter && existingVoters.some(v => v.id === form.id)) {
            setError('Cédula ya registrada.');
            return;
        }
        // If editing, check if ID was changed to one that already exists (excluding self)
        if (editingVoter && form.id !== editingVoter.id && existingVoters.some(v => v.id === form.id)) {
            setError('Cédula ya registrada.');
            return;
        }

        onSave(form);
        if (!editingVoter) setForm(initialState); // Clear only if creating new
        setError('');
    };

    return (
        <div className="card">
            <h3>Registro de Votante</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre Completo</label>
                    <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label>Cédula</label>
                        <input required type="number" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
                    </div>
                    <div>
                        <label>Celular</label>
                        <input required type="number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                </div>

                {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '16px', fontWeight: '500' }}>{error}</p>}

                <div className="form-group">
                    <label>Punto de Votación</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input required type="text" value={form.votingPoint} onChange={e => setForm({ ...form, votingPoint: e.target.value })} style={{ flex: 1 }} />
                        <a href="https://wsp.registraduria.gov.co/censo/consultar/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: 'auto', padding: '0 16px' }}>
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>

                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label>Mesa de Votación</label>
                        <input required type="number" value={form.votingTable} onChange={e => setForm({ ...form, votingTable: e.target.value })} />
                    </div>
                    <div>
                        <label>Fecha Nacimiento</label>
                        <input required type="date" value={form.birthDate} onChange={e => setForm({ ...form, birthDate: e.target.value })} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Dirección Residencia</label>
                    <input required type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Municipio</label>
                    <input required type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        <Save size={18} /> {editingVoter ? 'Actualizar' : 'Guardar Registro'}
                    </button>

                    {editingVoter && (
                        <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ flex: 0.5 }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default VoterForm;
