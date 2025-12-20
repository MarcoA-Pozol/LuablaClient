import { useTranslation } from "react-i18next";

export const AddPostCommentForm = () => {
    const { t } = useTranslation();

    return (
        <div className="add-comment">
            <textarea
            placeholder={t("Write your comment here...")}
            className="comment-textarea"
            ></textarea>
            <button className="comment-button">
            {t("Post Comment")}
            </button>
        </div>
    );
}