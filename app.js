const app = {
    init: () => {
        app.readAllMessage();
        app.postButton();
    },
    server: '',
    readAllMessage: () => {
        fetch(app.server, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            }
          })
          .then(res => res.json())
          .then(json => {
            for(let i of json.results) {
              app.readMessage(i);
            }
          })
    },
    readMessage: (txt) => {
        let body = document.querySelector('#main');
        let talkBox = document.createElement('li');
        talkBox.classList.add('yourBox');
        body.appendChild(talkBox);
        talkBox.textContent = txt;
    },
    makeMineTalkBox: () => {
        let body = document.querySelector('#main');
        let talkBox = document.createElement('li');
        let text = document.querySelector('input');
        talkBox.classList.add('myBox');
        body.appendChild(talkBox);
        talkBox.textContent = text.value;
        app.post('post', text.value);
        text.value = '';
        app.readAllMessage();
    },
    postButton: () => {
        let button = document.querySelector('button');
        button.addEventListener('click', app.makeMineTalkBox);
    },
    post: (path, body) => {
        fetch(`http://127.0.0.1:5000/${path}`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    }
}


app.init();