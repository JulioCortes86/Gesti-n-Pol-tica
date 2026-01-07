import React from 'react';
import { Download, Edit2, Trash2, Phone } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { exportToExcel, exportToPDF } from '../utils/exports';

function ReportsSection({ voters, leader, goal, setGoal, onEdit, onDelete }) {
    const registeredCount = voters.length;
    const [tempGoal, setTempGoal] = React.useState(goal);

    const handleUpdateGoal = () => {
        setGoal(Number(tempGoal));
        alert('¡Meta actualizada!');
    };

    const handleCall = (voter) => {
        if (window.confirm(`¿Deseas llamar a ${voter.name}?`)) {
            window.location.href = `tel:${voter.phone}`;
        }
    };

    const getMessage = () => {
        if (registeredCount >= goal * 1.5) return "¡Has superado la meta! ¡Excelente trabajo!";
        if (registeredCount >= goal) return "¡Lo lograste! ¡Felicidades!";
        if (registeredCount >= goal * 0.5) return "¡Ya casi lo logras!";
        return "¡Esfuérzate más!";
    }

    return (
        <div>
            <div className="card">
                <h3>Metas y Progreso</h3>
                <div className="form-group" style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label>Meta de Personas</label>
                        <input type="number" value={tempGoal} onChange={e => setTempGoal(e.target.value)} />
                    </div>
                    <button onClick={handleUpdateGoal} className="btn btn-primary" style={{ height: '52px', width: 'auto' }}>
                        Actualizar
                    </button>
                </div>

                <div style={{ height: '240px', margin: '20px 0', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Registrados', value: registeredCount, fill: '#1a4fbd' },
                                    { name: 'Faltantes', value: Math.max(0, goal - registeredCount), fill: '#e2e8f0' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                            >
                                <Cell key="cell-0" fill="#1a4fbd" />
                                <Cell key="cell-1" fill="#e2e8f0" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>
                            {Math.round((registeredCount / goal) * 100) || 0}%
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Completado</p>
                    </div>
                </div>

                <div className={`status-badge ${registeredCount >= goal ? 'celebration' : ''}`}>
                    <p style={{ margin: 0, fontWeight: 700 }}>{registeredCount} / {goal} personas</p>
                    <p style={{ fontSize: '1.2rem', margin: '5px 0 0 0' }}>{getMessage()}</p>
                </div>
            </div>

            <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <button onClick={() => exportToExcel(voters, leader)} className="btn btn-outline notranslate" translate="no">
                    <Download size={18} /> Excel
                </button>
                <button onClick={() => exportToPDF(voters, leader)} className="btn btn-outline">
                    <Download size={18} /> PDF
                </button>
            </div>

            <div className="card">
                <h3>Lista de Registros ({voters.length})</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
                    {voters.slice().reverse().map((v, i) => (
                        <div key={v.id} style={{
                            padding: '16px',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: i % 2 === 0 ? '#f9fafb' : 'white',
                            borderRadius: '8px',
                            marginBottom: '8px'
                        }}>
                            <div>
                                <p style={{ fontWeight: '700', color: 'var(--text-main)' }}>{voters.length - i}. {v.name}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>C.C. {v.id} | {v.phone}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => handleCall(v)}
                                    className="btn-icon"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--success)' }}
                                    title="Llamar"
                                >
                                    <Phone size={20} />
                                </button>
                                <button
                                    onClick={() => onEdit(v)}
                                    className="btn-icon"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}
                                    title="Editar"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => onDelete(v.id)}
                                    className="btn-icon"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}
                                    title="Eliminar"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {voters.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No hay registros aún.</p>}
                </div>
            </div>
        </div>
    );
}

export default ReportsSection;
