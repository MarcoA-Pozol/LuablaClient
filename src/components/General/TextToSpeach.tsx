import React, { useState, useEffect} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useLanguages } from "../../hooks/useLanguages";
import { FaMicrophone } from 'react-icons/fa';


interface TextToSpeechProps {
    text:string
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({text}) => {
    const { speak, voices } = useSpeechSynthesis();
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const { languageToLearn } = useLanguages();

    const languageVoiceMap: Record<string, string> = {
        IT: "Google italiano (it-IT)",
        PT: "Google português do Brasil (pt-BR)",
        RU: "Google русский (ru-RU)",
        EN: "Google US English",
        ES: "Google español (es-ES)",
        JP: "Google 日本語",
        ZH: "Google 普通话（中国大陆）", // Simplified Chinese
        KO: "Google 한국의",
        FR: "Google français (fr-FR)",
        DE: "Google Deutsch (de-DE)",
        HI: "Google हिन्दी (hi-IN)"
    };

    useEffect(() => {
        if (voices.length === 0) return;

        const targetVoiceName = languageVoiceMap[languageToLearn];
        const match = voices.find(v => v.name === targetVoiceName);

        if (match) {
            setSelectedVoice(match);
        } else {
            const fallback = voices.find(v => v.lang?.startsWith(languageToLearn.toLowerCase()));
            setSelectedVoice(fallback || voices[0]);
        }
    }, [voices, languageToLearn]);

    const handleSpeak = () => {
        if (!text.trim()) return;
        if (selectedVoice) {
            speak({ text, voice: selectedVoice })
        }
    }

    return (
        <>
            <button onClick={handleSpeak} style={{flex:1, backgroundColor:"transparent", border:"none", cursor:"pointer", fontSize:"1.2rem"}}>
                <h4><FaMicrophone style={{color: "rgb(120, 180, 240)"}}/></h4>
            </button>
        </>
    );
}