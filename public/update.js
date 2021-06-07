// Update post
async function handleUpdatePost(event) {
    event.preventDefault();
    console.log('function triggered')

    const title = document.getElementById('post-title').value.trim();
    const text = document.getElementById('post-text').value.trim();


    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(`Title value = ${title} | Text value = ${text}`)

    if (title && text) {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                text,
                id: postId,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/api/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('updatebtn').addEventListener('click', handleUpdatePost);
