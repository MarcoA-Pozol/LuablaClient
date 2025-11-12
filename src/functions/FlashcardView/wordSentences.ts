import { fetchWordSentences } from "../handleFetchWordSentences";

export const includeSentences = async (
    formRef:React.RefObject<HTMLFormElement | null>, 
    setSentencesList:React.Dispatch<React.SetStateAction<string[]>>, 
    setWordTranslation:React.Dispatch<React.SetStateAction<string>>,
    languageToLearn:string,
    userNativeLanguage:string
) => {
      let items;
      
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const word = formData.get("word") as string;
      
      if (!word) {
        // Alert that no word is entered
        return
      }

      const response = await fetchWordSentences(languageToLearn, userNativeLanguage, word);
      
      if (response?.data?.items) {
        items = response.data.items;

        if (typeof items === "string") {
          try {
            items = JSON.parse(items);
          } catch (e) {
            // Alert that no word is entered
            return;
          }
        }

      } else {
        // Alert that no sentences were fetched
        return;
      }

      setSentencesList(items.sentences);
      setWordTranslation(items.word_translation);
      console.log(items)
    }