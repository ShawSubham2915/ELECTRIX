
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const imageTobase64 = async (image) => {
    if (image.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 2 MB');
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    return data;
};

export default imageTobase64;
