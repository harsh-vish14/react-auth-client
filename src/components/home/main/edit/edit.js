import { useContext, useEffect, useState } from 'react';
import { AiFillCamera ,IoIosArrowBack} from 'react-icons/all'
import { UserContext } from '../../../../context/contextUserInfo';
import { storage } from '../../../../firebase';
import makeid from '../../../../function/function';



const Edit = ({ editClicked, image ,gettingData}) => {
    const [profileImage, setProfileImage] = useState('');
    const [user, setuser] = useContext(UserContext).user;
    const [loading, setLoading] = useState(false);
    const [progress,setProgress] = useState(0)
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        phone: ''
    });
    useEffect(() => {
        if (loading === false) {
            gettingData();
        }
    }, [loading]);
    const handelChanged = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setInput((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
        
    }
    const backClicked = () => {
        editClicked(true);
    }
    const saveme =  () => {
        
        fetch('https://protected-brushlands-07478.herokuapp.com/API/v1/update',
            {
                method: 'POST',
                body: JSON.stringify({
                    uid: user.uid, data: input
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        
        if (loading === false) {
            gettingData();
        }
        editClicked(true);
    };
    const ImageToLink = async (image) => {
        setLoading(true);
        var metadata = {
            contentType: 'image/jpeg',
        }
        var imageName = makeid(10)
        await storage.ref(`ProfileImage/${imageName}${image.name}`).put(image.url, metadata)
            .on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    // setProgress(progress);
                    setProgress(progress)
                }, (err) => {
                }, () => {
                    storage.ref('ProfileImage').child(`${imageName}${image.name}`).getDownloadURL()
                        .then(fireBaseUrl => {
                            fetch('https://protected-brushlands-07478.herokuapp.com/API/v1/photo-upload',
                                {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        uid: user.uid,
                                        link: fireBaseUrl,
                                    }),
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                    }
                                })
                                .then((res) => {
                                    return res.json()
                                })
                                .then((link) => {
                                    setProfileImage(fireBaseUrl);
                                    setLoading(false);
                                    gettingData()
                                })  
                        })
            })
        
    };
    const imageInput = async (e) => {
            const imageFile = e.target.files[0];
        ImageToLink({
            name: imageFile.name,
            url: imageFile
        });
    };
    return (
        <>
            <div className='main_title'>
                <div className='title'>
                    Personal info
                </div>
                <div className='sub_title'>
                    Basic info, like your name and photo
                </div>
            </div>
            
            <div className='profile_details'>
                <div className='back' onClick={() => { backClicked() }}>
                    <IoIosArrowBack /> Back
            </div>
                <div className='change_info'>
                    <div className='title'>
                        Change Info
                        </div>
                    <div className='sub_title'>
                        Change will be reflected to every services
                        </div>
                    <div className='profile_body'>
                        <div className='info'>
                            <label className='upload_image' htmlFor='fileInput'>
                                {profileImage ? (
                                    <>
                                        <div className='image' style={{ background: `url(${profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                            <div className='image_logo'>
                                                <AiFillCamera />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='image' style={{ background: `url(${image})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                                            <div className='image_logo'>
                                                <AiFillCamera />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div style={{ opacity: '0.8' }}>
                                    Change Image
                                </div>
                                {loading?(<div className='progress'>{progress}</div>):(null)}
                            </label>
                            <input id='fileInput' type='file' accept='images/*' style={{ display: 'none' }} onChange={imageInput} />
                            <div className='edit-inputs'>
                                <div className='user-info'>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name='name' onChange={handelChanged} value={input.name} />
                                        <label for="floatingInput">Name</label>
                                    </div>
                                </div>
                                <div className='user-info'>
                                    <div class="form-floating mb-3">
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '120px' }} name='bio' onChange={handelChanged} value={input.bio} ></textarea>
                                        <label for="floatingTextarea2">Bio</label>
                                    </div>
                                </div>
                                <div className='user-info'>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name='phone' onChange={handelChanged} value={input.phone} />
                                        <label for="floatingInput">Phone</label>
                                    </div>
                                </div>
                                <div className='user-info'>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={handelChanged} value={input.email} />
                                        <label for="floatingInput">Email</label>
                                    </div>
                                </div>
                                <div className='user-info'>
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={handelChanged} value={input.password} />
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='save' onClick={saveme}>
                        Save
                </div>
                </div>
            </div>
        </>
    );
}

export default Edit;