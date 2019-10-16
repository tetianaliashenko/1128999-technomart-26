    var feedbackLink = document.querySelector(".feedback-button");
    var feedbackPopup = document.querySelector(".feedback");
    var feedbackClose = feedbackPopup.querySelector(".feedback-close");
    var feedbackForm = feedbackPopup.querySelector("form");
    var feedbackName = feedbackPopup.querySelector("[name=name]");
    var feedbackEmail = feedbackPopup.querySelector("[name=email]");
    var feedbackText = feedbackPopup.querySelector("[name=text]");
    var isStorageSupport = true;
    var storageName = "";
    var storageEmail = "";

    try {
        storageName = localStorage.getItem("name");
        storageEmail = localStorage.getItem("email");
    } catch (err) {
        isStorageSupport = false;
    }
    
    feedbackLink.addEventListener("click", function (evt) {
        feedbackPopup.classList.add("modal-show");
        if (storageName) {
            feedbackName.value = storageName;
        }

        if (storageEmail) {
            feedbackEmail.value = storageEmail;
        }

        if (!storageName) {
            feedbackName.focus();
        } else if (!storageEmail) {
            feedbackEmail.focus();
        } else {
            feedbackText.focus();
        }        
    }); 

    feedbackClose.addEventListener("click", function (evt) {
        evt.preventDefault();  
        feedbackPopup.classList.remove("modal-show"); 
        feedbackPopup.classList.remove("modal-error");
    }); 

    feedbackForm.addEventListener("submit", function (evt) {
        if (!feedbackName.value || !feedbackEmail.value) {
            evt.preventDefault();
            feedbackPopup.classList.add("modal-error");
        } else {
            if (isStorageSupport) {
                localStorage.setItem("name", feedbackName.value);
                localStorage.setItem("email", feedbackEmail.value);
            }
        }   
    });

    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            if (feedbackPopup.classList.contains("modal-show")) {
                evt.preventDefault();
                feedbackPopup.classList.remove("modal-show"); 
                feedbackPopup.classList.remove("modal-error");
            }     
        }   
    });