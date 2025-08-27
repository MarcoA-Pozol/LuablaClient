export const useBaseMediaUrl = (path:string) => {
    const baseMediaUrl = "http://localhost:8600/media/";
    const completePath = `${baseMediaUrl}${path}`;

    return completePath;
}

export const useDefaultDeckImagePath = (language:string="EN") => {
    let defaultDeckImagePath; 

    if (language === "EN") {
        defaultDeckImagePath = "cat_1.jpg";
    } else {
        defaultDeckImagePath = "cat_1.jpg"
    }

    const completePath = `http://localhost:8600/media/deck_images/${defaultDeckImagePath}`;

    return completePath;
}


