function getMeetingDetails(name, email, password){
  const domain = 'meet.jit.si';
  const options = {
      roomName: name,
      width: 1200,
      height: 550,
      parentNode: document.querySelector('#meet'),
      userInfo: {
        email: email,
    }
  };
  const api = new JitsiMeetExternalAPI(domain, options);
  api.addEventListener('videoConferenceJoined', afterJoining(password));
}


function afterJoining(password){
	api.executeCommand('password',password);
	return 
}