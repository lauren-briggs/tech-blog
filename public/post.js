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

document.getElementById('createpost-form').addEventListener('submit', handleCreatePost);