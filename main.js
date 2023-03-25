// fetch('data.json')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         document.querySelector('.user-image').src = data.comments[0].user.image.webp;
//         document.querySelector('.username').textContent = data.comments[0].user.username;
//         document.querySelector('.date-posted').textContent = data.comments[0].createdAt;
//         document.querySelector('.user-comment').textContent = data.comments[0].content;
//         document.querySelector('.vote-number').textContent = data.comments[0].score;
        
//     })


fetch('data.json')
.then(res => res.json())
.then(data => {
    console.log(data);
    const commentsContainer = document.querySelector('.comments-container');
    for (let i = 0; i < data.comments.length; i++) {
        const comment = data.comments[i];
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <div class="user-info">
                <div class="user-info-container">
                    <img class="user-image" src="${comment.user.image.webp}">
                    <span class="username">${comment.user.username}</span>
                </div>
                <span class="date-posted">${comment.createdAt}</span>
            </div>
            <p class="user-comment">${comment.content}</p>
            <div class="vote-and-reply">
                <div class="vote-container">
                    <span class="upvote">+</span>
                    <span class="vote-number">${comment.score}</span>
                    <span class="downvote">-</span>
                </div>
                <div class="reply-container">
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                    <span class="reply-cta">Reply</span>
                </div>
            </div>
        `;
        commentsContainer.appendChild(commentDiv);

        const repliesContainer = document.createElement('div');
        repliesContainer.classList.add('replies');
        commentDiv.appendChild(repliesContainer); // add replies container to commentDiv
        if (comment.replies.length > 0) {
            for (let j = 0; j < comment.replies.length; j++) {
                const reply = comment.replies[j];
                const replyDiv = document.createElement('div');
                replyDiv.classList.add('reply');
                replyDiv.innerHTML = `
                <div class="user-info">
                    <div class="user-info-container">
                        <img class="user-image" src="${reply.user.image.webp}">
                        <span class="username">${reply.user.username}</span>
                    </div>
                    <span class="date-posted">${reply.createdAt}</span>
                </div>
                <p class="user-reply">${reply.replyingTo} ${reply.content}</p>
                <div class="vote-and-reply">
                    <div class="vote-container">
                        <span class="upvote">+</span>
                        <span class="vote-number">${reply.score}</span>
                        <span class="downvote">-</span>
                    </div>
                    <div class="reply-container">
                        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                        <span class="reply-cta">Reply</span>
                    </div>
                </div>
                `;
                repliesContainer.appendChild(replyDiv); // add replyDiv to replies container
            }
        }
        commentsContainer.appendChild(commentDiv);
    }
    const addComment = document.createElement('div');
    addComment.classList.add('add-comment');
    addComment.innerHTML = `
        <input type="text" placeholder="Add a comment...">
        <div class="img-button">
            <img class="user-image" src="${data.currentUser.image.webp}">
            <button>SEND</button>
        </div>
    `;
    commentsContainer.appendChild(addComment);
});