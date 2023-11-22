
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import multer from 'multer';
const firebaseConfig = {
    apiKey: "AIzaSyAcP-f3nqlV5im7DZcTheVvoNj4t3SNKC8",
    authDomain: "twstore-f4ae5.firebaseapp.com",
    projectId: "twstore-f4ae5",
    storageBucket: "twstore-f4ae5.appspot.com",
    messagingSenderId: "329976951900",
    appId: "1:329976951900:web:d68ae90d239fe24ca66299"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);



const uploadImage = (files: any, cate: any) => {

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${cate}/` + files.originalname);
    const uploadTask = uploadBytesResumable(storageRef, files.buffer);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            console.log("upload successful");
        }
    );
    const url = getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL
    });
    return url;
};
export default uploadImage;