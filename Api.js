const url = 'https://inshop-api-kee2poa55a-uc.a.run.app';

// call GET /api/GetImageForLabel and return the object

export const getImageForLabel = async () => {
    const response = await fetch(`${url}/api/GetImageForLabel`);
    const data = await response.json();
    return data;
};

// call POST /api/SaveImagelabel and return the object
export const saveImagelabel = async (imageLabel) => {
    const response = await fetch(`${url}/api/SaveImagelabel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageLabel),
    });
    const data = await response.json();
    return data;
}