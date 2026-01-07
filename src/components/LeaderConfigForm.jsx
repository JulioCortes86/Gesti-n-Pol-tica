import React, { useState } from 'react';

function LeaderConfigForm({ leader, onSave }) {
    const [tempData, setTempData] = useState(leader);

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(tempData); alert('Cambios guardados'); }}>
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={tempData.name} onChange={e => setTempData({ ...tempData, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Cédula</label>
                <input type="number" value={tempData.id} onChange={e => setTempData({ ...tempData, id: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Cargo</label>
                <input type="text" value={tempData.role} onChange={e => setTempData({ ...tempData, role: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Cambiar Foto</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handlePhoto} />
                {tempData.photo && (
                    <div style={{ marginTop: '10px' }}>
                        <img
                            src={tempData.photo}
                            alt="Vista previa"
                            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-color)' }}
                        />
                    </div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
    );
}

export default LeaderConfigForm;
