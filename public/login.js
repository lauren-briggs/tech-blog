async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    const errorsEl = document.getElementById('errors');

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            const body = await response.json();
            console.log(body)
            errorsEl.innerHTML = '';
            let ul = document.createElement('ul');
            let li = document.createElement('li');
            li.innerHTML = `${body.message}`
            ul.appendChild(li);
            errorsEl.appendChild(ul);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);