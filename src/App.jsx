import React, { useState, useEffect } from 'react';
import { UserPlus, BarChart3, Settings } from 'lucide-react';
import LeaderHeader from './components/LeaderHeader';
import LeaderSetup from './components/LeaderSetup';
import VoterForm from './components/VoterForm';
import ReportsSection from './components/ReportsSection';
import LeaderConfigForm from './components/LeaderConfigForm';

// Helper for local storage
const getStorageData = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [leader, setLeader] = useState(() => getStorageData('leader_info', {}));
  const [voters, setVoters] = useState(() => getStorageData('voters_list', []));
  const [goal, setGoal] = useState(() => getStorageData('registration_goal', 1000));
  const [isConfigured, setIsConfigured] = useState(() => !!getStorageData('leader_info', null));

  const [editingVoter, setEditingVoter] = useState(null);

  useEffect(() => {
    localStorage.setItem('leader_info', JSON.stringify(leader));
    localStorage.setItem('voters_list', JSON.stringify(voters));
    localStorage.setItem('registration_goal', JSON.stringify(goal));
  }, [leader, voters, goal]);

  const handleSaveVoter = (voterData) => {
    if (editingVoter) {
      setVoters(voters.map(v => v.id === editingVoter.id ? voterData : v));
      setEditingVoter(null);
      alert('¡Votante actualizado con éxito!');
    } else {
      setVoters([...voters, voterData]);
      alert('¡Registro guardado con éxito!');
    }
    setActiveTab('register'); // Ensure we stay/go to register tab
  };

  const handleEditVoter = (voter) => {
    setEditingVoter(voter);
    setActiveTab('register');
  };

  const handleDeleteVoter = (voterId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      setVoters(voters.filter(v => v.id !== voterId));
    }
  };

  const handleCancelEdit = () => {
    setEditingVoter(null);
  };

  if (!isConfigured) {
    return <LeaderSetup onComplete={(data) => { setLeader(data); setIsConfigured(true); }} />;
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <LeaderHeader leader={leader} />

        {activeTab === 'register' && (
          <VoterForm
            onSave={handleSaveVoter}
            existingVoters={voters}
            editingVoter={editingVoter}
            onCancel={handleCancelEdit}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsSection
            voters={voters}
            leader={leader}
            goal={goal}
            setGoal={setGoal}
            onEdit={handleEditVoter}
            onDelete={handleDeleteVoter}
          />
        )}

        {activeTab === 'config' && (
          <div className="card">
            <h3>Configuración del Líder</h3>
            <LeaderConfigForm leader={leader} onSave={setLeader} />
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <div className={`nav-item ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
          <UserPlus size={24} />
          <span>Registro</span>
        </div>
        <div className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
          <BarChart3 size={24} />
          <span>Reportes</span>
        </div>
        <div className={`nav-item ${activeTab === 'config' ? 'active' : ''}`} onClick={() => setActiveTab('config')}>
          <Settings size={24} />
          <span>Configuración</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
