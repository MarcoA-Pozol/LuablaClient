import { useEffect } from "react";
import "../../styles/imageModal.css";
import { useTranslation } from "react-i18next";

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

export const ImageModal = ({ imageUrl, altText, onClose }: ImageModalProps) => {
  const { t } = useTranslation();

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal-content">
        <button 
          className="image-modal-close"
          onClick={onClose}
          aria-label={t("Close")}
        >
          ×
        </button>
        
        <div className="image-modal-image-container">
          <img 
            src={imageUrl} 
            alt={altText}
            className="image-modal-image"
          />
        </div>
        
        <div className="image-modal-footer">
          <p className="image-modal-alt">{altText}</p>
          <button 
            className="image-modal-download"
            onClick={() => window.open(imageUrl, '_blank')}
          >
            {t("Open in new tab")}
          </button>
        </div>
      </div>
    </div>
  );
};