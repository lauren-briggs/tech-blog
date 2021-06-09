async function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    const errorsEl = document.getElementById('errors');

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            const body = await response.json();
            errorsEl.innerHTML = '';
            let ul = document.createElement('ul');
            body.errors.forEach((e) => {
                let li = document.createElement('li');
                li.innerHTML = `${e.msg}`
                ul.appendChild(li);
            })
            errorsEl.appendChild(ul);
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', handleSignup);