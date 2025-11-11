import { fetchWordSentences } from "../handleFetchWordSentences";

export const includeSentences = async (
    formRef:React.RefObject<HTMLFormElement | null>, 
    setSentencesList:React.Dispatch<React.SetStateAction<string[]>>, 
    languageToLearn:string
) => {
      let items;
      
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const word = formData.get("word") as string;
      
      if (!word) {
        // Alert that no word is entered
        return
      }

      const response = await fetchWordSentences(languageToLearn, word);
      
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

      setSentencesList(items);
    }