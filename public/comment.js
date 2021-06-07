// Create post
async function handleAddComment(event) {
    event.preventDefault();
    console.log('function triggered')

    const comment = document.getElementById('comment').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(`Comment = ${comment}`)

    if (comment && postId) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment,
                post_id: postId
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('comment-btn').addEventListener('click', handleAddComment);
