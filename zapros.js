let users = []

window.onload = function () {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            return res.json()
        })
        .then((user) => {
            users.push(...user)
            loadFeed()
        });

}

function loadFeed(params) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            return res.json()
        })
        .then((posts) => {
            const fragment = new DocumentFragment()

            posts.forEach((post) => {
                let user = users.find((u) => {
                    return u.id === post.userId
                })
                if (user) {
                    post.userName = user.name
                }
                fragment.append(createFeeditem(post))
            })
            document.getElementById('feed').append(fragment)



            document.getElementById('feed').addEventListener('click', (e) => {
                let newDiv = document.getElementById('newDiv')
                newDiv.classList.add('newDiv2')
                document.getElementById('feed').innerHTML = ''
                if (e.target.tagName === 'SPAN') {
                    e = e.target.parentNode

                } else {
                    e = e.target
                }

                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${e.lastChild.getAttribute('divid')}`)
                    .then((res) => {
                        return res.json()
                    })
                    .then((com) => {
                        com.forEach((el) => {
                            let div = document.createElement('div')
                            div.classList.add('comDiv')
                            div.innerHTML = ` <span class="userName sp">${el.name}</span>
                      <span class="title sp1">${el.email}</span>
                      <span class="body">${el.body}</span> `
                            newDiv.append(div)

                        })
                        let inputDiv = document.createElement('div')
                        inputDiv.innerHTML=`<input type="text" class="inputStyle" placeholder="գրեք ձեր կոմենտարիան">
                        <input type="submit">`
                        inputDiv.classList.add('inputDiv')

                        newDiv.append(inputDiv)

                    })


            })
        })


}

function createFeeditem(post) {
    let innerHTML = ` <span class="userName sp">${post.userName}</span>
    <span class="title sp1">${post.title}</span>
    <span class="body">${post.body}</span> `

    let div = document.createElement('div')
    div.setAttribute('postId', post.id)
    div.classList.add('feedItem')
    div.innerHTML = innerHTML

    let d = document.createElement('div')
    d.setAttribute('divid', post.id)
    div.append(d)

    return div

}