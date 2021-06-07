// Create post
async function handleCreatePost(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const text = document.getElementById('post-text').value.trim();

    console.log(`Title value = ${title} | Text value = ${text}`)

    if (title && text) {
        const response = await fetch('/api/post', {
            method: 'post',
            body: JSON.stringify({
                title,
                text
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


// Delete post
async function handleDeletePost(event) {
    event.preventDefault();
    console.log('function triggered')

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(postId)

    if (postId) {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE',
            body: JSON.stringify({
                post_id: postId
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


document.getElementById('deleteBtn').addEventListener('click', handleDeletePost);
document.getElementById('createpost-form').addEventListener('submit', handleCreatePost);

