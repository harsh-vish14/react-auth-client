const Display = ({mainInfo,editClicked}) => {
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
                <div className='profile_header'>
                    <div className='some_title'>
                        <div className='title'>
                            Profile
                    </div>
                        <div className='subTitle'>
                            Some info may be visible to other people
                    </div>
                    </div>
                    <div className='edit' onClick={() => { editClicked(false) }}>
                        Edit
                    </div>
                </div>
                <div className='profile_body'>
                    <div className='detail' style={{ padding: '0px 30px' }}>
                        <div className='label'>
                            PHOTO
                        </div>
                        <div className='img'>
                            {mainInfo.photo ? (
                                <img src={`${mainInfo.photo}`} />
                            ) : (
                                <img src={`${process.env.PUBLIC_URL}/images/default_logo.svg`} />
                            )}
                        </div>
                    </div>
                    <div className='detail'>
                        <div className='label'>
                            NAME
                        </div>
                        <div className='img'>
                            {mainInfo.name}
                        </div>
                    </div>
                    <div className='detail'>
                        <div className='label'>
                            BIO
                        </div>
                        <div className='img' id='bio'>
                            <span class="d-inline-block text-truncate" style={{ maxWidth: '80%'}}>
                                {mainInfo.bio}
                            </span>
                        </div>
                    </div>
                    <div className='detail'>
                        <div className='label'>
                            PHONE
                        </div>
                        <div className='img'>
                            {mainInfo.phone}
                        </div>
                    </div>
                    <div className='detail'>
                        <div className='label'>
                            EMAIL
                        </div>
                        <div className='img'>
                            {mainInfo.email}
                        </div>
                    </div>
                    <div className='detail' style={{ border: 'none' }}>
                        <div className='label'>
                            PASSWORD
                        </div>
                        <div className='img'>
                            **********
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Display;