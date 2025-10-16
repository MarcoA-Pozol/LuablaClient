import React from 'react';
import { FaBookOpen, FaComments, FaGraduationCap } from 'react-icons/fa'; // Example Icons

// Define the structure for a module
type ModuleType = [string, string, 'Input' | 'Output', string, string];

// Define a type for the module list using the icons imported above
const modulesList: ModuleType[] = [
    ["Flashcards & Vocabulary", "Master new words and phrases quickly using dynamic flashcards and practice vocabulary.", "Input", "FaBookOpen", "🎴"],
    ["The Hub (Discussion Forum)", "Practice speaking and writing by sharing opinions, answering questions, and discussing topics with others.", "Output", "FaComments", "🗫"],
    ["Tests & Exams", "Assess your progress, challenge your knowledge, and track your readiness for formal exams.", "Output", "FaGraduationCap", "📝"]
];

// Define the prop type for the setter function
interface ModulesMenuProps {
    setDeployedModule: (moduleName: string) => void;
}

// Map the string icon names to the actual components for easy rendering
const iconMap: { [key: string]: React.ElementType } = {
    FaBookOpen,
    FaComments,
    FaGraduationCap
    // Add any other icons you might use here
};

export const ModulesMenu: React.FC<ModulesMenuProps> = ({ setDeployedModule }) => {
    
    // Inline styles for the swanky, compact design
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as 'column', 
            gap: '70px',
            padding: '20px',
            backgroundColor: 'white'
        },
        card: {
            display: 'flex',
            width: '30%',
            marginInline: 'auto',
            flexDirection: 'column' as 'column',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s ease-in-out',
            border: '2px solid #4B0082',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#4B0082',
            color: 'white',
            padding: '15px',
        },
        title: {
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: '600',
        },
        tag: (type: string) => ({
            backgroundColor: type === 'Output' ? '#ca4444ff' : '#0c0954ff', 
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
        }),
        content: {
            padding: '15px',
            color: '#333',
        },
        description: {
            fontSize: '0.9rem',
            marginBottom: '10px',
            color: '#555',
        },
        button: {
            backgroundColor: '#ca4444ff', 
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold' as 'bold',
            fontSize: '1rem',
            marginTop: '10px',
            transition: 'background-color 0.2s',
            alignSelf: 'flex-start' as 'flex-start',
        },
    };

    return (
        <div style={styles.container}>
            {modulesList.map(([title, description, type, iconName, emoji]) => {
                const IconComponent = iconMap[iconName];
                
                return (
                    <div 
                        key={title} 
                        style={styles.card as React.CSSProperties} // Use CSSProperties for the style
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)', e.currentTarget.style.boxShadow = '2px 2px 2px #ca4444ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)', e.currentTarget.style.boxShadow = '0px 0px 0px white')}
                    >
                        <div style={styles.header}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {IconComponent && (
                                    <IconComponent size={24} style={{ marginRight: '10px', color: '#ca4444ff' }} /> 
                                )}
                                <h3 style={styles.title}>{title}</h3>
                            </div>
                            <span style={styles.tag(type)}>{type}</span>
                        </div>
                        
                        <div style={styles.content}>
                            <p style={styles.description}>{description}</p>
                            
                            <button
                                style={styles.button as React.CSSProperties}
                                onClick={() => setDeployedModule(title)}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#381a60ff')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ca4444ff')}
                            >
                                Go to Module
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};