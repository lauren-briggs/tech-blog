// document.querySelector('#login-submit').addEventListener('click', async function (event) {
//     event.preventDefault();
//     const username = document.querySelector('#email-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();

//     if (username && password) {

//     }

//     const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         document.location.replace('/');
//         console.log('Log in successful')
//     } else {
//         alert('Log in failed');
//     }
// });


// const loginFormHandler = async (event) => {
//     event.preventDefault();

//     const username = document.querySelector('#username-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();

//     if (username && password) {
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             body: JSON.stringify({ email, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace('/');
//         } else {
//             alert('Failed to log in.');
//         }
//     }
// };


// document
//     .querySelector('.login-form')
//     .addEventListener('submit', loginFormHandler);

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

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
            alert(response.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);